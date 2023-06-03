import { Routes } from "@angular/router";


export const routes: Routes = [
  { path : '' , loadComponent : ()=> import('./ronde.component').then(module=>module.RondeComponent) , children :[
    { path : 'admin' , loadComponent :()=> import ('./components/admin/admin.component').then(module=>module.AdminComponent) },
  ]}
];
