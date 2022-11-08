import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Location } from "@angular/common";
import { Collection } from "../../interfaces/collection.model";
import { Item } from "../../interfaces/item.model";
import { ItemService } from "../../service/item.service";
import { AuthService } from "../../service/auth.service";
import { MatTable, MatTableDataSource } from "@angular/material/table";
import { MatSort } from "@angular/material/sort";


@Component({
  selector: 'app-collection-view',
  templateUrl: './collection-view.component.html',
  styleUrls: ['./collection-view.component.css']
})
export class CollectionViewComponent implements OnInit {

  collection: Collection;
  isEditable = false;

  displayedColumns: string[] = ['name'];
  items: MatTableDataSource<Item> = new MatTableDataSource<Item>();

  @ViewChild(MatTable) table!: MatTable<any>;
  @ViewChild(MatSort) matSort!: MatSort;

  constructor(public location: Location, private router: Router, private itemService: ItemService, private auth: AuthService) {
    this.collection = history.state;
    this.decodeImage();
    this.fetchItems();
    this.isEditable = this.auth.userHasWriteAccess(this.collection.author.username);
  }

  ngOnInit(): void {
  }

  fetchItems() {
    this.itemService.fetchItemsByCollectionId(this.collection.collectionId).subscribe(res => {
      this.items = new MatTableDataSource(res.items);
      this.setTableColumns();
      this.table?.renderRows();
      this.items.sort = this.matSort;
    }, error => { console.log(error) });
  }

  setTableColumns() {
    if (this.collection.customString1) this.displayedColumns.push('customString1');
    if (this.collection.customString2) this.displayedColumns.push('customString2');
    if (this.collection.customString3) this.displayedColumns.push('customString3');
    if (this.collection.customDate1) this.displayedColumns.push('customDate1');
    if (this.collection.customDate2) this.displayedColumns.push('customDate2');
    if (this.collection.customDate3) this.displayedColumns.push('customDate3');
    this.displayedColumns.push('action');
  }

  filter($event: any) {
    this.items.filter = $event.target.value;
  }

  decodeImage() {
    if (!this.collection.image?.startsWith('data:image/jpeg;base64,')) {
      this.collection.image = 'data:image/jpeg;base64,' + this.collection.image;
    }
  }

  onClickNewItem() {
    this.router.navigateByUrl('item/create', { state: this.collection });
  }

  onClickViewItem(item: Item) {
    this.router.navigateByUrl('item/view/' + item.itemId, { state: item });
  }

  onClickEditItem(item: Item) {
    this.router.navigateByUrl('item/editor/' + item.itemId, { state: item });
  }

  onClickRemoveItem(item: Item) {
    this.itemService.deleteItem(item.itemId).subscribe();
    const index = this.items.data.indexOf(item);
    this.items.data.splice(index, 1);
    this.items._updateChangeSubscription();
  }

}
