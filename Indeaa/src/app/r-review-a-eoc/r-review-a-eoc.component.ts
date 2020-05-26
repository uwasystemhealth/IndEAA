import { Component, OnInit, Input } from '@angular/core';
import { Competency } from '../competency';
import { ActivatedRoute } from '@angular/router';
import { EocService } from '../eoc.service';

@Component({
  selector: 'app-r-review-a-eoc',
  templateUrl: './r-review-a-eoc.component.html',
  styleUrls: ['./r-review-a-eoc.component.css']
})
export class RReviewAEocComponent implements OnInit {
  public competency: Competency;
   
  constructor(
    private route: ActivatedRoute,
    private eocService: EocService
  ) { }

  ngOnInit(): void {
    this.competency = this.eocService.competency(1);
  }

}
