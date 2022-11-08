import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";
import { Item } from "../../interfaces/item.model";
import { Router } from "@angular/router";
import { ItemUpdateRequest } from "../../interfaces/item-update-request";
import { ItemService } from "../../service/item.service";

@Component({
  selector: 'app-item-editor',
  templateUrl: './item-editor.component.html',
  styleUrls: ['./item-editor.component.css']
})
export class ItemEditorComponent implements OnInit {

  item: Item;
  tags: string[] = [];
  itemUpdateRequest: ItemUpdateRequest = {} as ItemUpdateRequest;

  constructor(public location: Location, private itemService: ItemService, private router: Router) {
    this.item = history.state;
    this.item.tags.forEach(tag => this.tags.push(tag.tag));
    this.itemUpdateRequest.name = this.item.name;
    this.itemUpdateRequest.itemId = this.item.itemId;
    this.setOptionalFields();
  }

  ngOnInit(): void {
  }

  setOptionalFields() {
    this.itemUpdateRequest.customString1 = this.item.customString1;
    this.itemUpdateRequest.customString2 = this.item.customString2;
    this.itemUpdateRequest.customString3 = this.item.customString3;
    this.itemUpdateRequest.customBoolean1 = this.item.customBoolean1;
    this.itemUpdateRequest.customBoolean2 = this.item.customBoolean2;
    this.itemUpdateRequest.customBoolean3 = this.item.customBoolean3;
    this.itemUpdateRequest.customInteger1 = this.item.customInteger1;
    this.itemUpdateRequest.customInteger2 = this.item.customInteger2;
    this.itemUpdateRequest.customInteger3 = this.item.customInteger3;
    this.itemUpdateRequest.customMultilineText1 = this.item.customMultilineText1;
    this.itemUpdateRequest.customMultilineText2 = this.item.customMultilineText2;
    this.itemUpdateRequest.customMultilineText3 = this.item.customMultilineText3;
    this.itemUpdateRequest.customDate1 = this.item.customDate1;
    this.itemUpdateRequest.customDate2 = this.item.customDate2;
    this.itemUpdateRequest.customDate3 = this.item.customDate3;
  }

  updateTags(tags: string[]) {
    this.itemUpdateRequest.tags = tags;
  }

  updateItem() {
    this.itemService.updateItem(this.itemUpdateRequest).subscribe(item => {
      this.router.navigateByUrl('item/view/' + item.itemId, { state: item });
    }, error => {
      console.log(error);
    });
  }

}
