import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {TagList} from "../interfaces/tag-list.model";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class TagService {

  constructor(private http: HttpClient) { }

  fetchAllTags() {
    return this.http.get<TagList>(environment.API_PATH + '/tags/all');
  }

  fetchMostPopularTags(num: number) {
    return this.http.get<TagList>(environment.API_PATH + '/tags/popular/' + num);
  }

}
