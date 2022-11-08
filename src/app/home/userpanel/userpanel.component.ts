import { Component, OnInit } from '@angular/core';
import { CollectionService } from "../../service/collection.service";
import { Collection } from "../../interfaces/collection.model";
import { Router } from "@angular/router";
import { AuthService } from "../../service/auth.service";

@Component({
  selector: 'app-userpanel',
  templateUrl: './userpanel.component.html',
  styleUrls: ['./userpanel.component.css']
})
export class UserpanelComponent implements OnInit {

  collections: Collection[] = [];

  constructor(private collectionService: CollectionService, private router: Router, private auth: AuthService) { }

  ngOnInit(): void {
    this.collectionService.fetchAllCollectionsByUsername(this.auth.getLoggedInUsername()).subscribe(result => {
      result.collections.forEach(col => {
        if (col.image) {
          col.image = 'data:image/jpeg;base64,' + col.image;
        }
        this.collections.push(col);
      });
    });
  }

  onClickNewCollection() {
    this.router.navigateByUrl('collection/creator');
  }

  onClickShowCollection(collection: Collection) {
    this.router.navigateByUrl('collection/view/' + collection.collectionId, { state: collection });
  }

  onClickEditCollection(collection: Collection) {
    this.router.navigateByUrl('collection/editor/' + collection.collectionId, { state: collection });
  }

  onClickRemoveCollection(id: number) {
    this.collectionService.removeCollection(id).subscribe();
    this.collections = this.collections.filter(collection => collection.collectionId != id);
  }

}
