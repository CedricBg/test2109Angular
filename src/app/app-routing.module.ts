import { NavComponent } from './components/nav/nav.component';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

const routes: Routes = [


  { path: 'auth' ,   loadChildren: ()=> import('./module/auth/auth.routes').then(m=>m.routes)},
  { path: 'OPS',     loadChildren: ()=> import('./module/operations/operations.routes').then(m=> m.routes)},
  { path: 'agent',   loadChildren: ()=> import('./module/agent/agent.route').then(m=> m.routes)},
  { path: 'ronde',   loadChildren: ()=> import('./module/ronde/ronde.routes').then(m=> m.routes)},
  { path: '', redirectTo : 'auth', pathMatch : 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
