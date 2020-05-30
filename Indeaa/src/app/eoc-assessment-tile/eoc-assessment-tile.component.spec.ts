import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EocAssessmentTileComponent } from './eoc-assessment-tile.component';

describe('EocAssessmentTileComponent', () => {
  let component: EocAssessmentTileComponent;
  let fixture: ComponentFixture<EocAssessmentTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EocAssessmentTileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EocAssessmentTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
