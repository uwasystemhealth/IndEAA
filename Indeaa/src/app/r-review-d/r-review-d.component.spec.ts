import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RReviewDComponent } from './r-review-d.component';

describe('RReviewDComponent', () => {
  let component: RReviewDComponent;
  let fixture: ComponentFixture<RReviewDComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RReviewDComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RReviewDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
