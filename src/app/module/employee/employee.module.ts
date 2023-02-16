import { NgModule } from '@angular/core';
import { EmployeeRoutingModule } from './employee-routing.module';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { SharedModule } from '../../shared/shared.module';
import { ListemployeeComponent } from './components/listemployee/listemployee.component';
import { EmployeeComponent } from './employee.component';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { UserProfileComponent } from './components/user-profile/user-profile.component';

@NgModule({
  declarations: [
    AddEmployeeComponent,
    ListemployeeComponent,
    EmployeeComponent,
    UserProfileComponent,
  ],
  imports: [
    EmployeeRoutingModule,
    SharedModule,
  ],

})

export class EmployeeModule { }
