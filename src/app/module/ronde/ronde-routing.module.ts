import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RondeComponent } from './ronde.component';
import { AdminComponent } from './components/admin/admin.component';

const routes: Routes = [
  { path : '' , component: RondeComponent, children :[
    { path : 'admin' , component : AdminComponent },
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RondeRoutingModule { }
