import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RondeRoutingModule } from './ronde-routing.module';
import { RondeComponent } from './ronde.component';
import { AdminComponent } from './components/admin/admin.component';



@NgModule({
    imports: [
        CommonModule,
        RondeRoutingModule,
        RondeComponent,
        AdminComponent
    ]
})
export class RondeModule { }
