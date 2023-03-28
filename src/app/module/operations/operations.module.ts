import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OperationsRoutingModule } from './operations-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { OpsComponent } from './components/ops/ops.component';
import { EmployeeModule } from '../employee/employee.module';
import { CustomerModule } from '../customer/customer.module';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    OpsComponent
  ],
  imports: [
    CommonModule,
    OperationsRoutingModule,
    SharedModule,
    EmployeeModule,
    CustomerModule,
    RouterModule.forChild([
      {
        path: '',
        component: OpsComponent,
        children: [
          {
            path: 'employee',
            loadChildren: () => import('../employee/employee.module').then(m => m.EmployeeModule)
          },
          {
            path: 'customer',
            loadChildren: () => import('../customer/customer.module').then(m => m.CustomerModule)
          }
        ]
      }
    ])
  ]
})
export class OperationsModule { }
