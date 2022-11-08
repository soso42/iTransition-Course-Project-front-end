import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from "@angular/router";
import { SearchService } from "../service/search.service";
import { Item } from "../interfaces/item.model";
import { Collection } from "../interfaces/collection.model";

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {

  items!: Item[];
  collections!: Collection[];

  constructor(private router: Router, private route: ActivatedRoute, private searchService: SearchService) {
    let searchTerm = this.route.snapshot.params['term'];
    this.fetchSearchResult(searchTerm);
  }

  ngOnInit(): void {
  }

  fetchSearchResult(term: string) {
    this.searchService.search(term).subscribe(res => {
      this.items = res.items;
      this.collections = res.collections;
    }, error => {
      console.log(error);
    });
  }

  onClickViewItem(item: Item) {
    this.router.navigateByUrl('item/view/' + item.itemId, { state: item });
  }

  onClickViewCollection(collection: Collection) {
    this.router.navigateByUrl('collection/view/' + collection.collectionId, { state: collection });
  }
}
