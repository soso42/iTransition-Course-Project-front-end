import { Component, OnInit } from '@angular/core';
import { Item } from "../interfaces/item.model";
import { ItemService } from "../service/item.service";
import { Router } from "@angular/router";
import { Collection } from "../interfaces/collection.model";
import { CollectionService } from "../service/collection.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  NUM_OF_LATEST_ITEMS = 10;
  NUM_OF_LARGEST_COLLECTIONS = 5;

  latestItems!: Item[];
  largestCollections!: Collection[];

  constructor(private itemService: ItemService, private collectionService: CollectionService, private router: Router) {
    this.fetchLatestItems();
    this.fetchLargestCollections();
  }

  ngOnInit(): void {
  }

  fetchLatestItems() {
    this.itemService.fetchLatestItems(this.NUM_OF_LATEST_ITEMS).subscribe(res => {
      this.latestItems = res.items;
    });
  }

  fetchLargestCollections() {
    this.collectionService.fetchLargestCollections(this.NUM_OF_LARGEST_COLLECTIONS).subscribe(res => {
      this.largestCollections = res.collections;
    });
  }

  onClickViewItem(item: Item) {
    this.router.navigateByUrl('item/view/' + item.itemId, { state: item });
  }

  onClickViewCollection(collection: Collection) {
    this.router.navigateByUrl('collection/view/' + collection.collectionId, { state: collection });
  }
}
