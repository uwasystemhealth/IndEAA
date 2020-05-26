import { Component, OnInit } from '@angular/core';
import { ResourceService } from '../resource.service';
import { Resource } from '../resource';

@Component({
  selector: 'app-r-review-b',
  templateUrl: './r-review-b.component.html',
  styleUrls: ['./r-review-b.component.css']
})
export class RReviewBComponent implements OnInit {
  resources: Resource[];
  
  constructor(private resourceService: ResourceService) { }

  ngOnInit(): void {
    this.resources = this.resourceService.resources;
    console.log(this.resources);
  }

}
