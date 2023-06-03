import { NgModule } from '@angular/core';
import { EmployeeRoutingModule } from './employee-routing.module';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { SharedModule } from '../../shared/shared.module';
import { ListemployeeComponent } from './components/listemployee/listemployee.component';
import { EmployeeComponent } from './employee.component';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UpdateEmployeeComponent } from './components/update-employee/update-employee.component';
import { AdminComponent } from './components/admin/admin.component';

@NgModule({
    imports: [
        EmployeeRoutingModule,
        SharedModule,
        AddEmployeeComponent,
        ListemployeeComponent,
        EmployeeComponent,
        UserProfileComponent,
        UpdateEmployeeComponent,
        AdminComponent
    ]
})

export class EmployeeModule { }
