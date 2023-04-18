import { UpdateCustomerComponent } from './components/update-customer/update-customer.component';
import { AddCustomerComponent } from './components/add-customer/add-customer.component';
import { ListCustomerComponent } from './components/list-customer/list-customer.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './customer.component';
import { AddSiteComponent } from './components/add-site/add-site.component';
import { AdminCustomerComponent } from './components/admin-customer/admin-customer.component';

const routes: Routes = [
  { path: '', component: CustomerComponent, children :[
    { path: 'listcustomer',component: ListCustomerComponent,children:[
      { path: 'addCustomer', component: AddCustomerComponent },
      { path: 'UpdateCustomer', component: UpdateCustomerComponent},
      { path: 'addSite', component: AddSiteComponent}
    ]},
    { path: 'updateCustomer', component: UpdateCustomerComponent}]
  },
  { path: 'customer', component: AdminCustomerComponent},
  { path : '', redirectTo : 'employee', pathMatch : 'full'},
  { path : '**', redirectTo : 'employee', pathMatch : 'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
