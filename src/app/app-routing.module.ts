import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [


  { path: 'auth' ,   loadChildren: ()=> import('./module/auth/auth.routes')},
  { path: 'OPS',     loadChildren: ()=> import('./module/operations/operations.routes')},
  { path: 'agent',   loadChildren: ()=> import('./module/agent/agent.route')},
  { path: 'ronde',   loadChildren: ()=> import('./module/ronde/ronde.routes')},
  { path: '', redirectTo : 'auth', pathMatch : 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
