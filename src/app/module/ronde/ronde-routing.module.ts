import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RondeComponent } from './ronde.component';

const routes: Routes = [
  { path : '' , component: RondeComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RondeRoutingModule { }
