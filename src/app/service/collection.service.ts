import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { CollectionList } from "../interfaces/collectionlist.model";
import { Collection } from "../interfaces/collection.model";
import { CollectionRequest } from "../interfaces/collection-request.model";

@Injectable({
  providedIn: 'root'
})
export class CollectionService {

  constructor(private http: HttpClient) { }

  fetchAllCollectionsByUsername(username: string) {
    return this.http.get<CollectionList>(environment.API_PATH + '/collection/user=' + username);
  }

  fetchCollectionByItemId(itemId: number) {
    return this.http.get<Collection>(environment.API_PATH + '/collection/byItemId=' + itemId);
  }

  // saveCollection(newCollection: CollectionRequest) {
  //   return this.http.post<Collection>(environment.API_PATH + '/collection/new', newCollection);
  // }

  saveCollection(formData: FormData) {
    return this.http.post<Collection>(environment.API_PATH + '/collection/new', formData);
  }

  // updateCollection(collection: Collection) {
  //   return this.http.post<Collection>(environment.API_PATH + '/collection/update', collection);
  // }

  updateCollection(formData: FormData) {
    return this.http.post<Collection>(environment.API_PATH + '/collection/update', formData);
  }

  removeCollection(id: number) {
    return this.http.delete(environment.API_PATH + '/collection/remove/' + id);
  }

  fetchLargestCollections(num: Number) {
    return this.http.get<CollectionList>(environment.API_PATH + '/collection/top/' + num);
  }

}
