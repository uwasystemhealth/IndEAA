import { Component, OnInit } from '@angular/core';
import { DLService } from '../dl.service';
import { DL } from '../dl';

@Component({
  selector: 'app-dl-display',
  templateUrl: './dl-display.component.html',
  styleUrls: ['./dl-display.component.css']
})
export class DlDisplayComponent implements OnInit {
  public dls: DL[];

  constructor(
    private dlService: DLService
    ) { }

  ngOnInit(): void {
    this.dls = this.dlService.dls;
  }

}
