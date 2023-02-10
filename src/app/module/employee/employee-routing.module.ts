
import { EmployeeComponent } from './employee.component';
import { ListemployeeComponent } from './components/listemployee/listemployee.component';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path : 'employee' , component : EmployeeComponent, children :[
    { path : 'addEmployee' , component : AddEmployeeComponent },
    { path : 'AllEmployees' , component : ListemployeeComponent},

  ]
},
{ path : '', redirectTo : 'employee', pathMatch : 'full'},
{ path : '**', redirectTo : 'employee', pathMatch : 'full'}


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
