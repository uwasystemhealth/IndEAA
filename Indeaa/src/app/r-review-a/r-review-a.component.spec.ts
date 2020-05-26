import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RReviewAComponent } from './r-review-a.component';

describe('RReviewAComponent', () => {
  let component: RReviewAComponent;
  let fixture: ComponentFixture<RReviewAComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RReviewAComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RReviewAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
