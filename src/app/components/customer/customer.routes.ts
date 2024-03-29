import { Routes } from "@angular/router";


export default [
  { path: '', loadComponent:()=>import('./customer.component').then(module =>module.CustomerComponent), children :[
    { path: 'listcustomer', title : 'Administration clients',loadComponent:()=>import('./components/list-customer/list-customer.component').then(module=>module.ListCustomerComponent),children:[
      { path: 'addCustomer', loadComponent:()=>import('./components/add-customer/add-customer.component').then(module=>module.AddCustomerComponent)},
      { path: 'UpdateCustomer', loadComponent:()=>import('./components/update-customer/update-customer.component').then(module=>module.UpdateCustomerComponent)},
      { path: 'addSite', loadComponent:()=>import('./components/add-site/add-site.component').then(module=>module.AddSiteComponent)},
      { path: 'site', loadComponent:()=>import('./components/view-site/view-site.component').then(module=>module.ViewSiteComponent)}
    ]},
    { path: 'updateCustomer', loadComponent:()=>import('./components/update-customer/update-customer.component').then(module=>module.UpdateCustomerComponent)}]
  },
  { path: 'customer', loadComponent:()=>import('./components/admin-customer/admin-customer.component').then(module=>module.AdminCustomerComponent)},
  { path : '', redirectTo : 'employee', pathMatch : 'full'},
  { path : '**', redirectTo : 'employee', pathMatch : 'full'}
]as Routes
