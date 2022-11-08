import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { ItemList } from "../interfaces/itemlist.model";
import { ItemRequest } from "../interfaces/item-request.model";
import { CommentList } from "../interfaces/commentlist.model";
import { CommentRequest } from "../interfaces/comment-request.model";
import { TagList } from "../interfaces/tag-list.model";
import { LikesResponse } from "../interfaces/LikesResponse";
import { Item } from "../interfaces/item.model";
import { ItemUpdateRequest } from "../interfaces/item-update-request";

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private http: HttpClient) { }

  fetchItemsByCollectionId(id: number) {
    return this.http.get<ItemList>(environment.API_PATH + '/item/collection-id=' + id);
  }

  fetchLatestItems(num: Number) {
    return this.http.get<ItemList>(environment.API_PATH + '/item/latest/' + num);
  }

  saveItem(itemRequest: ItemRequest) {
    return this.http.post<Item>(environment.API_PATH + '/item/new', itemRequest);
  }

  updateItem(request: ItemUpdateRequest) {
    return this.http.put<Item>(environment.API_PATH + '/item/update', request);
  }

  deleteItem(itemId: number) {
    return this.http.delete(environment.API_PATH + '/item/delete/id=' + itemId);
  }

  fetchCommentsByItemId(id: number) {
    return this.http.get<CommentList>(environment.API_PATH + '/comment/all/item-id=' + id);
  }

  saveComment(comment: CommentRequest) {
    return this.http.post(environment.API_PATH + '/comment/new', comment);
  }

  fetchLikes(itemId: number) {
    return this.http.get<LikesResponse>(environment.API_PATH + '/item/likes/item-id=' + itemId);
  }

  likeItem(itemId: number, username: string) {
    return this.http.put(environment.API_PATH + `/item/addlike/item-id=${itemId}&username=${username}`, {});
  }

  unlikeItem(itemId: number, username: string) {
    return this.http.put(environment.API_PATH + `/item/removelike/item-id=${itemId}&username=${username}`, {});
  }
}
