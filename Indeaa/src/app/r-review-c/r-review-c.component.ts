import { Component, OnInit } from '@angular/core';
import { EocService } from '../eoc.service';
import { Competency } from '../competency';

@Component({
  selector: 'app-r-review-c',
  templateUrl: './r-review-c.component.html',
  styleUrls: ['./r-review-c.component.css']
})
export class RReviewCComponent implements OnInit {
  competencies: Competency[];
   
  constructor(private eocService: EocService) { }

  ngOnInit(): void {
    this.competencies = this.eocService.competencies;
  }

}
