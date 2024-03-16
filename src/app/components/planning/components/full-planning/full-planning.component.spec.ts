import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullPlanningComponent } from './full-planning.component';

describe('FullPlanningComponent', () => {
  let component: FullPlanningComponent;
  let fixture: ComponentFixture<FullPlanningComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FullPlanningComponent]
    });
    fixture = TestBed.createComponent(FullPlanningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
