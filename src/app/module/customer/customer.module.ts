import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerRoutingModule } from './customer-routing.module';
import { AddCustomerComponent } from './components/add-customer/add-customer.component';
import { UpdateCustomerComponent } from './components/update-customer/update-customer.component';
import { ListCustomerComponent } from './components/list-customer/list-customer.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { UpdateSiteComponent } from './components/update-site/update-site.component';
import { AddSiteComponent } from './components/add-site/add-site.component';
import { AddPersonComponent } from './components/add-person/add-person.component';
import { AdminCustomerComponent } from './components/admin-customer/admin-customer.component';



@NgModule({
  declarations: [
    AddCustomerComponent,
    UpdateCustomerComponent,
    ListCustomerComponent,
    UpdateSiteComponent,
    AddSiteComponent,
    AddPersonComponent,
    AdminCustomerComponent,

  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    SharedModule,
  ]
})
export class CustomerModule { }
