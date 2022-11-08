import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SearchResult} from "../interfaces/search-result.model";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) { }

  search(term: string) {
    return this.http.get<SearchResult>(environment.API_PATH + '/search/term=' + term);
  }

}
