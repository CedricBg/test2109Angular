import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentStatiqueComponent } from './agent-statique.component';

describe('AgentStatiqueComponent', () => {
  let component: AgentStatiqueComponent;
  let fixture: ComponentFixture<AgentStatiqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgentStatiqueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgentStatiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
