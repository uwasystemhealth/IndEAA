import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { ReviewService } from '../review.service';
import { Review } from '../review';

@Component({
  selector: 'app-r-review',
  templateUrl: './r-review.component.html',
  styleUrls: ['./r-review.component.css']
})
export class RReviewComponent implements OnInit {
  public id: number;
  public review: Review;

  constructor(
    private route: ActivatedRoute,
    public reviewService: ReviewService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.review = this.reviewService.reviews[this.id];
    });
  }

}