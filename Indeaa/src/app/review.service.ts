import { Injectable } from '@angular/core';
import { Review } from './review';
import { ReviewState } from './review-state.enum';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private _reviews: Review[];

  get reviews(){
    return this._reviews;
  }
  public constructor() {
    this._reviews = [
      new Review(1, "MECH5521", new Date(2020, 5, 10), ReviewState.Incomplete),
      new Review(2, "MECH5522", new Date(2021, 9, 5), ReviewState.Planned),
      new Review(3, "MECH5523", new Date(2019, 7, 5), ReviewState.Complete)  
    ];
  }
}
