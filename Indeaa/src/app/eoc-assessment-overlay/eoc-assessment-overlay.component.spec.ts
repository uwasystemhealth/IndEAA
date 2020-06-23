import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EocAssessmentOverlayComponent } from './eoc-assessment-overlay.component';

describe('EocAssessmentOverlayComponent', () => {
  let component: EocAssessmentOverlayComponent;
  let fixture: ComponentFixture<EocAssessmentOverlayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EocAssessmentOverlayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EocAssessmentOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
