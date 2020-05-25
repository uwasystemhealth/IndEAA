import { Component, OnInit } from '@angular/core';
import { ReviewService } from '../review.service';
import { Review } from '../review';

@Component({
  selector: 'app-r-landing',
  templateUrl: './r-landing.component.html',
  styleUrls: ['./r-landing.component.css']
})
export class RLandingComponent implements OnInit {
  public reviews: Review[];
  public JSON: any;
  constructor(
    public reviewService: ReviewService
  ) { }

  ngOnInit(): void {
    this.JSON = JSON;
    this.reviews = this.reviewService.reviews;
  }

}
