import { Routes } from "@angular/router";

 export default [
  { path : '', loadComponent :()=> import('./auth.component').then(module =>module.AuthComponent) , children :
  [ { path : 'AddLogin' ,loadComponent : ()=> import('./components/addlogin/addlogin.component').then(module => module.AddloginComponent)},
    { path : 'register' , loadComponent : ()=> import('./components/register/register.component').then(module =>module.RegisterComponent)} ]
}
] as Routes
