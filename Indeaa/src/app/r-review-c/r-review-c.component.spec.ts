import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RReviewCComponent } from './r-review-c.component';

describe('RReviewCComponent', () => {
  let component: RReviewCComponent;
  let fixture: ComponentFixture<RReviewCComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RReviewCComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RReviewCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
