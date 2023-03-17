import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerRoutingModule } from './customer-routing.module';
import { AddCustomerComponent } from './components/add-customer/add-customer.component';
import { UpdateCustomerComponent } from './components/update-customer/update-customer.component';
import { ListCustomerComponent } from './components/list-customer/list-customer.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    AddCustomerComponent,
    UpdateCustomerComponent,
    ListCustomerComponent,

  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    SharedModule,
  ]
})
export class CustomerModule { }
