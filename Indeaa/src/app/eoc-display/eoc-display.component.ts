import { Component, OnInit, Input } from '@angular/core';
import { Eoc } from '../eoc';

@Component({
  selector: 'app-eoc-display',
  templateUrl: './eoc-display.component.html',
  styleUrls: ['./eoc-display.component.css']
})
export class EocDisplayComponent implements OnInit {

  @Input()
  eoc: Eoc;
  
  constructor() { }

  ngOnInit(): void {
  }

}
