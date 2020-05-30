import { Component, OnInit, Input } from '@angular/core';
import { Eoc } from '../eoc';

@Component({
  selector: 'app-eoc-assessment-tile',
  templateUrl: './eoc-assessment-tile.component.html',
  styleUrls: ['./eoc-assessment-tile.component.css']
})
export class EocAssessmentTileComponent implements OnInit {
  @Input()
  eoc: Eoc;

  constructor() { }

  ngOnInit(): void {
  }

}
