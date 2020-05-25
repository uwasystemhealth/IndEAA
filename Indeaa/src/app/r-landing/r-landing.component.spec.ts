import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RLandingComponent } from './r-landing.component';

describe('RLandingComponent', () => {
  let component: RLandingComponent;
  let fixture: ComponentFixture<RLandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RLandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
