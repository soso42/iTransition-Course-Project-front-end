import { Component, OnInit } from '@angular/core';
import { CloudData, CloudOptions } from 'angular-tag-cloud-module';
import { Router } from "@angular/router";
import { TagService } from "../../service/tag.service";
import { Observable, of } from "rxjs";


@Component({
  selector: 'app-tag-cloud',
  templateUrl: './tag-cloud.component.html',
  styleUrls: ['./tag-cloud.component.css']
})
export class TagCloudComponent implements OnInit {

  NUM_OF_TAGS = 20;

  options: CloudOptions = {
    width: 1,
    height: 400,
    overflow: false,
    zoomOnHover: {
      scale: 1.2,
      transitionTime: 0.3,
      delay: 0.3
    },
    realignOnResize: true
  };

  data: CloudData[] = [];
  fetchedData: CloudData[] = [];

  constructor(private router: Router, private tagService: TagService) {
    this.fetchTags(this.NUM_OF_TAGS);
  }

  ngOnInit(): void {
  }

  fetchTags(num: number) {
    this.tagService.fetchMostPopularTags(num).subscribe(res => {
      res.tags.forEach(tag => {
        this.fetchedData.push({text: tag, weight: this.randomInt(1, 10)});
      });
      this.updateData();
    });
  }

  updateData() {
    const changedData$: Observable<CloudData[]> = of([
      ...this.fetchedData
    ]);
    changedData$.subscribe(res => this.data = res);
  }

  randomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  log(eventType: string, e?: any) {
    console.log(eventType, e);
  }

  search(event: CloudData) {
    this.router.navigateByUrl('/search/' + event.text);
  }

}
