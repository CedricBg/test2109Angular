import { UpdateCustomerComponent } from './components/update-customer/update-customer.component';
import { AddCustomerComponent } from './components/add-customer/add-customer.component';
import { ListCustomerComponent } from './components/list-customer/list-customer.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './customer.component';

const routes: Routes = [
  { path: '', component: CustomerComponent, children :[
    { path: 'listcustomer',component: ListCustomerComponent},
    { path: 'addCustomer', component: AddCustomerComponent},
    { path: 'updateCustomer', component: UpdateCustomerComponent}]
  },
  { path : '', redirectTo : 'employee', pathMatch : 'full'},
  { path : '**', redirectTo : 'employee', pathMatch : 'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
