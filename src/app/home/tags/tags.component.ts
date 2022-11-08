import { Component, ElementRef, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { COMMA, ENTER, TAB } from "@angular/cdk/keycodes";
import { FormControl } from "@angular/forms";
import { map, Observable, startWith } from "rxjs";
import { MatChipInputEvent } from "@angular/material/chips";
import { MatAutocompleteSelectedEvent } from "@angular/material/autocomplete";
import { TagService } from "../../service/tag.service";

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {

  visible: boolean = true;
  selectable: boolean = true;
  removable: boolean = true;
  addOnBlur: boolean = false;
  separatorKeysCodes = [ENTER, COMMA, TAB];
  tagCtrl = new FormControl();
  filteredTags: Observable<any[]> = new Observable<any[]>();
  allTags: string[] = [];

  @ViewChild('tagInput')
  tagInput!: ElementRef;

  @Input() selectedTags: string[] = [];

  @Output() tagsUpdatedEvent = new EventEmitter<string[]>();

  constructor(private tagService: TagService) {
    this.updateTags();
    this.fetchAllTags();
  }

  ngOnInit(): void {
  }

  fetchAllTags() {
    this.tagService.fetchAllTags().subscribe(res => {
      res.tags.forEach(tag => this.allTags.push(tag));
      this.updateTags();
    });
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our tag
    if ((value || '').trim()) {
      this.selectedTags.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.tagCtrl.setValue(null);
  }

  remove(tag: any): void {
    const index = this.selectedTags.indexOf(tag);
    if (index >= 0) {
      this.selectedTags.splice(index, 1);
    }
  }

  filter(name: string) {
    return this.allTags.filter(tag =>
      tag.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.selectedTags.push(event.option.viewValue);
    this.tagInput.nativeElement.value = '';
    this.tagCtrl.setValue(null);
  }

  updateTags() {
    this.filteredTags = this.tagCtrl.valueChanges.pipe(
      startWith(null),
      map((tag: string | null) => tag ? this.filter(tag) : this.allTags.slice()));
    this.tagsUpdatedEvent.emit(this.selectedTags);
  }

}
