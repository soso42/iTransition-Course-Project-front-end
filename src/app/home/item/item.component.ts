import { Component, OnInit } from '@angular/core';
import { Item } from "../../interfaces/item.model";
import { ItemService } from "../../service/item.service";
import { Comment } from "../../interfaces/comment.model";
import { AuthService } from "../../service/auth.service";
import { catchError, filter, of, Subscription, switchMap, timer } from "rxjs";
import { User } from "../../interfaces/user.model";
import { CollectionService } from "../../service/collection.service";
import { Collection } from "../../interfaces/collection.model";
import { Router } from "@angular/router";


@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  item: Item;
  collection!: Collection;
  comments: Comment[] = [];
  newComment: string = '';
  numOfLikes: number = 0;
  isLiked: boolean = false;
  isEditable = false;
  userCanComment = false;
  likerList: User[] = [];
  tagList: string[];

  seconds: number = 3000;
  subscription!: Subscription;

  constructor(private itemService: ItemService, private collectionService: CollectionService, public auth: AuthService, private router: Router) {
    this.item = history.state;
    this.tagList = this.item.tags.map(tag => tag.tag);
    this.fetchCollectionDetails();
    this.fetchLikes();
    this.isEditable = this.auth.userHasWriteAccess(this.item.owner.username);
    this.userCanComment = this.auth.isUserLoggedIn();
  }

  ngOnInit() {
    this.subscription = timer(0, this.seconds)
      .pipe(
        switchMap(() => {
          return this.itemService.fetchCommentsByItemId(this.item.itemId)
            .pipe(catchError(err => {
              console.error(err);
              return of(undefined);
            }));
        }),
        filter(data => data !== undefined)
      ).subscribe(res => {
        this.comments = res!.comments;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  fetchCollectionDetails() {
    this.collectionService.fetchCollectionByItemId(this.item.itemId).subscribe(res => {
      this.collection = res;
    });
  }

  fetchLikes() {
    this.itemService.fetchLikes(this.item.itemId).subscribe(res => {
      this.numOfLikes = res.likes.length;
      res.likes.forEach(user => this.likerList.push(user));
      this.isLiked = this.isCurrentUserLikerOfItem();
    });
  }

  isCurrentUserLikerOfItem() {
    let username = this.auth.getLoggedInUsername();
    return this.likerList.filter(user => user.username === username).length > 0;
  }

  onClickEditItem(item: Item) {
    this.router.navigateByUrl('item/editor/' + item.itemId, { state: item });
  }

  onClickSaveComment() {
    let comment = { itemId: this.item.itemId, authorUsername: this.auth.getLoggedInUsername(), text: this.newComment };
    this.itemService.saveComment(comment).subscribe(res => {
      this.newComment = '';
    });
  }

  likeItem() {
    this.itemService.likeItem(this.item.itemId, this.auth.getLoggedInUsername()).subscribe(res => {
      this.isLiked = true;
      this.numOfLikes++;
    });
  }

  unlikeItem() {
    this.itemService.unlikeItem(this.item.itemId, this.auth.getLoggedInUsername()).subscribe(res => {
      this.isLiked = false;
      this.numOfLikes--;
    });
  }


}
