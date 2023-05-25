import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RondeRoutingModule } from './ronde-routing.module';
import { RondeComponent } from './ronde.component';


@NgModule({
  declarations: [
    RondeComponent
  ],
  imports: [
    CommonModule,
    RondeRoutingModule
  ]
})
export class RondeModule { }
