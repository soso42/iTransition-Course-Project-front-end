import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Collection } from "../../interfaces/collection.model";
import { Location } from "@angular/common";
import { Router } from "@angular/router";
import { ItemRequest } from "../../interfaces/item-request.model";
import { ItemService } from "../../service/item.service";
import { AuthService } from "../../service/auth.service";

@Component({
  selector: 'app-item-creator',
  templateUrl: './item-creator.component.html',
  styleUrls: ['./item-creator.component.css']
})
export class ItemCreatorComponent implements OnInit {

  collection: Collection;
  itemRequest: ItemRequest = {} as ItemRequest;


  constructor(public location: Location, private itemService: ItemService, private auth: AuthService, private router: Router) {
    this.collection = history.state;
    this.itemRequest.collectionId = this.collection.collectionId;
    this.itemRequest.owner = this.auth.getLoggedInUsername();
  }

  ngOnInit(): void {
  }

  saveItem() {
    this.itemService.saveItem(this.itemRequest).subscribe(item => {
      this.router.navigateByUrl('item/view/' + item.itemId, { state: item });
    }, error => {
      console.log(error);
    });
  }

  updateTags(tags: string[]) {
    this.itemRequest.tags = tags;
  }

}
