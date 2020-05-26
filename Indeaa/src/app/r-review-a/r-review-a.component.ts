import { Component, OnInit } from '@angular/core';
import { EocService } from '../eoc.service';
import { Competency } from '../competency';

@Component({
  selector: 'app-r-review-a',
  templateUrl: './r-review-a.component.html',
  styleUrls: ['./r-review-a.component.css']
})
export class RReviewAComponent implements OnInit {
  competencies: Competency[];

  constructor(
    private eocService: EocService
  ) { }

  ngOnInit(): void {
    this.competencies = this.eocService.competencies;
  }

}
