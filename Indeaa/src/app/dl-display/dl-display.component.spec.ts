import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DlDisplayComponent } from './dl-display.component';

describe('DlDisplayComponent', () => {
  let component: DlDisplayComponent;
  let fixture: ComponentFixture<DlDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DlDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DlDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
