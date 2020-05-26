import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RReviewBComponent } from './r-review-b.component';

describe('RReviewBComponent', () => {
  let component: RReviewBComponent;
  let fixture: ComponentFixture<RReviewBComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RReviewBComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RReviewBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
