import { NavComponent } from './components/nav/nav.component';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

const routes: Routes = [

  { path: 'employee' , loadChildren: ()=> import('./module/employee/employee.module').then(m => m.EmployeeModule) },
  { path: 'auth' ,     loadChildren: ()=> import('./module/auth/auth.module').then(m=>m.AuthModule)},
  { path: 'customer',   loadChildren: ()=> import('./module/customer/customer.module').then(m=> m.CustomerModule)},
  { path: 'OPS',   loadChildren: ()=> import('./module/operations/operations.module').then(m=> m.OperationsModule)},
  { path: 'agent',   loadChildren: ()=> import('./module/agent/agent.module').then(m=> m.AgentModule)},
  { path: '', redirectTo : 'auth', pathMatch : 'full'},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
