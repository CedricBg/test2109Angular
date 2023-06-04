import { Routes } from "@angular/router";
import { listAllCustomerResolver } from "src/app/resolvers/Customer-resolver.resolver";


export default [
  { path : '' , loadComponent : ()=> import('./ronde.component').then(module=>module.RondeComponent) , children :[
    { path : 'admin' ,title:'Administration rondes', loadComponent :()=> import ('./components/admin/admin.component').then(module=>module.AdminComponent),
   resolve :{ AllCustomers : listAllCustomerResolver} },
  ]}
] as Routes;
