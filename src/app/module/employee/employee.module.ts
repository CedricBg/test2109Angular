import { NgModule } from '@angular/core';
import { EmployeeRoutingModule } from './employee-routing.module';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { SharedModule } from '../../shared/shared.module';
import { ListemployeeComponent } from './components/listemployee/listemployee.component';
import { EmployeeComponent } from './employee.component';
import { MatLegacyPaginatorIntl as MatPaginatorIntl } from '@angular/material/legacy-paginator';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UpdateEmployeeComponent } from './components/update-employee/update-employee.component';
import { AdminComponent } from './components/admin/admin.component';

@NgModule({
  declarations: [
    AddEmployeeComponent,
    ListemployeeComponent,
    EmployeeComponent,
    UserProfileComponent,
    UpdateEmployeeComponent,
    AdminComponent,
  ],
  imports: [
    EmployeeRoutingModule,
    SharedModule,
  ],

})

export class EmployeeModule { }
