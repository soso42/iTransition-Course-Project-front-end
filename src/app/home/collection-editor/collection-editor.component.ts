import { Component, OnInit } from '@angular/core';
import { Router} from "@angular/router";
import { Location } from "@angular/common";
import { CollectionService } from "../../service/collection.service";
import { Collection } from "../../interfaces/collection.model";
import * as Showdown from 'showdown';

@Component({
  selector: 'app-collection-editor',
  templateUrl: './collection-editor.component.html',
  styleUrls: ['./collection-editor.component.css']
})
export class CollectionEditorComponent implements OnInit {

  collection: Collection;
  formData = new FormData();

  constructor(public location: Location, private collectionService: CollectionService, private router: Router) {
    this.collection = history.state;
    this.collection.image = undefined;
  }

  ngOnInit(): void {
  }

  updateCollection() {
    this.setProperties();
    this.collectionService.updateCollection(this.formData).subscribe(res => {
      this.router.navigateByUrl('collection/view/' + res.collectionId, { state: res });
    }, error => {
      console.log(error);
    });
  }

  onFileSelected(event: any) {
    this.formData.append("file", <File>event.target.files[0]);
  }

  setProperties() {
    this.formData.append('properties', new Blob([JSON.stringify(this.collection)], {type: "application/json"}));
  }

}
