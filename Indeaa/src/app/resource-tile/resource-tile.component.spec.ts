import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceTileComponent } from './resource-tile.component';

describe('ResourceTileComponent', () => {
  let component: ResourceTileComponent;
  let fixture: ComponentFixture<ResourceTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResourceTileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
