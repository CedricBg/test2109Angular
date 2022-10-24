import { NavComponent } from './components/nav/nav.component';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  { path : 'employee' , loadChildren :()=> import('./module/employee/employee.module').then(m => m.EmployeeModule) },
  { path : 'auth' , loadChildren: ()=> import('./module/auth/auth.module').then(m=>m.AuthModule)},
  { path : 'index' , component : AppComponent , children : [
    { path : 'navigation' , component : NavComponent}
  ]},
  { path : '', redirectTo : 'employee', pathMatch : 'full'},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
