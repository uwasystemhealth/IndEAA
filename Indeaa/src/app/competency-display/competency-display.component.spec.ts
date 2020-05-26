import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetencyDisplayComponent } from './competency-display.component';


describe('ComponentDisplayComponent', () => {
  let component: CompetencyDisplayComponent;
  let fixture: ComponentFixture<CompetencyDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompetencyDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompetencyDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
