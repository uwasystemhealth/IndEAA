import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-r-review',
  templateUrl: './r-review.component.html',
  styleUrls: ['./r-review.component.css']
})
export class RReviewComponent implements OnInit {

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
  }

}
