import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifRondeComponent } from './modif-ronde.component';

describe('ModifRondeComponent', () => {
  let component: ModifRondeComponent;
  let fixture: ComponentFixture<ModifRondeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ModifRondeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifRondeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
