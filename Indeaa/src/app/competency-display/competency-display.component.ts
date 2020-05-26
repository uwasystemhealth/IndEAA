import { Component, OnInit, Input } from '@angular/core';
import { Competency } from '../competency';

@Component({
  selector: 'app-competency-display',
  templateUrl: './competency-display.component.html',
  styleUrls: ['./competency-display.component.css']
})
export class CompetencyDisplayComponent implements OnInit {

  @Input()
  competency: Competency;
   
  constructor() { }

  ngOnInit(): void {
    //this.competency = this.eocService.competency(1);
  }

}
