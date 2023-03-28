import { OpsComponent } from './components/ops/ops.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: OpsComponent, children: [
      { path: 'employee', loadChildren: () => import('../employee/employee.module').then(m => m.EmployeeModule)},
      { path: 'customer', loadChildren: () => import('../customer/customer.module').then(m => m.CustomerModule)}
    ]
  },
  { path : '**', redirectTo : 'employee', pathMatch : 'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OperationsRoutingModule { }
