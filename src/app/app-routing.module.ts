import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [


  { path: 'auth' ,   loadChildren: ()=> import('./components/auth/auth.routes')},
  { path: 'OPS',     loadChildren: ()=> import('./components/operations/operations.routes')},
  { path: 'agent',   loadChildren: ()=> import('./components/agent/agent.route')},
  { path: 'ronde',   loadChildren: ()=> import('./components/ronde/ronde.routes')},
  { path: '', redirectTo : 'auth', pathMatch : 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
