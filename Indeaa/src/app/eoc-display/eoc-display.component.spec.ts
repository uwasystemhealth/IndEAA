import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EocDisplayComponent } from './eoc-display.component';

describe('EocDisplayComponent', () => {
  let component: EocDisplayComponent;
  let fixture: ComponentFixture<EocDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EocDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EocDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
