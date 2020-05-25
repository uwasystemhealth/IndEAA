import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RReviewComponent } from './r-review.component';

describe('RReviewComponent', () => {
  let component: RReviewComponent;
  let fixture: ComponentFixture<RReviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RReviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
