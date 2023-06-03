import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RondeComponent } from './ronde.component';

describe('RondeComponent', () => {
  let component: RondeComponent;
  let fixture: ComponentFixture<RondeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [RondeComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(RondeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
