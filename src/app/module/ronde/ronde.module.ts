import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RondeRoutingModule } from './ronde-routing.module';
import { RondeComponent } from './ronde.component';
import { AdminComponent } from './components/admin/admin.component';



@NgModule({
  declarations: [
    RondeComponent,
    AdminComponent
  ],
  imports: [
    CommonModule,
    RondeRoutingModule
  ]
})
export class RondeModule { }
