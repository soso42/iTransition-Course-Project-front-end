import { Component, OnInit } from '@angular/core';
import { Router} from "@angular/router";
import { Location } from "@angular/common";
import { CollectionService } from "../../service/collection.service";
import { CollectionRequest } from "../../interfaces/collection-request.model";
import { AuthService } from "../../service/auth.service";


@Component({
  selector: 'app-collection-creator',
  templateUrl: './collection-creator.component.html',
  styleUrls: ['./collection-creator.component.css']
})
export class CollectionCreatorComponent implements OnInit {

  collection: CollectionRequest = {} as CollectionRequest;
  formData = new FormData();

  constructor(private router: Router,
              public location: Location,
              private collectionService: CollectionService,
              private authService: AuthService) {

    this.collection.username = authService.getLoggedInUsername()
  }

  ngOnInit(): void {
  }

  onFileSelected(event: any) {
    this.formData.append("file", <File>event.target.files[0]);
  }

  onClickDeleteImage() {
    this.collection.image = undefined;
  }

  saveCollection() {
    this.formData.append('properties', new Blob([JSON.stringify(this.collection)], {type: "application/json"}));
    this.collectionService.saveCollection(this.formData).subscribe(res => {
      this.router.navigateByUrl('collection/view/' + res.collectionId, { state: res });
    }, error => {
      console.log(error);
    });
  }

}
