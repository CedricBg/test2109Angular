import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRondeComponent } from './add-ronde.component';

describe('AddRondeComponent', () => {
  let component: AddRondeComponent;
  let fixture: ComponentFixture<AddRondeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ AddRondeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddRondeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
