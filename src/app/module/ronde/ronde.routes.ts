import { Routes } from "@angular/router";


export default [
  { path : '' , loadComponent : ()=> import('./ronde.component').then(module=>module.RondeComponent) , children :[
    { path : 'admin' , loadComponent :()=> import ('./components/admin/admin.component').then(module=>module.AdminComponent) },
  ]}
] as Routes;
