import { ListemployeeComponent } from './components/listemployee/listemployee.component';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  { path : 'addEmployee' , component : AddEmployeeComponent },
  { path : '', redirectTo : 'addEmployee', pathMatch : 'full'},
  { path : 'AllEmployees' , component : ListemployeeComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
