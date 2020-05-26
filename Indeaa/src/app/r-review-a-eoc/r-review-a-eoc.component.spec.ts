import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RReviewAEocComponent } from './r-review-a-eoc.component';

describe('RReviewAEocComponent', () => {
  let component: RReviewAEocComponent;
  let fixture: ComponentFixture<RReviewAEocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RReviewAEocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RReviewAEocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
