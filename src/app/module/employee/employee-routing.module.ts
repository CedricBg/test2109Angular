import { ListemployeeComponent } from './components/listemployee/listemployee.component';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  { path : 'addEmployee' , component : AddEmployeeComponent },
  { path : 'AllEmployees' , component : ListemployeeComponent},
  { path : '', redirectTo : 'AllEmployees', pathMatch : 'full'},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
