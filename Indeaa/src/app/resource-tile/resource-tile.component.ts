import { Component, OnInit, Input } from '@angular/core';
import { Resource } from '../resource';

@Component({
  selector: 'app-resource-tile',
  templateUrl: './resource-tile.component.html',
  styleUrls: ['./resource-tile.component.css']
})
export class ResourceTileComponent implements OnInit {
  @Input()
  resource: Resource;

  constructor() { }

  ngOnInit(): void {
  }

}
