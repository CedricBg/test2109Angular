import { Routes } from "@angular/router";
import { OPSGuard } from "src/app/auth.guard";


export default [
  {
    path: '',loadComponent: ()=> import('./components/ops/ops.component').then(module => module.OpsComponent) ,children: [
      { path: 'employee' , loadChildren: ()=> import('./../employee/employee.routes'),
      canActivate: [OPSGuard]
    },
      { path: 'agent',   loadChildren: ()=> import('./../agent/agent.route'),
      canActivate: [OPSGuard]},
      { path: 'customer',   loadChildren: ()=> import('./../customer/customer.routes'),
      canActivate: [OPSGuard]},
      { path: 'ronde',   loadChildren: ()=> import('./../ronde/ronde.routes'),
      canActivate: [OPSGuard]},
    ]
  } ,
  { path : '**', redirectTo : 'employee', pathMatch : 'full'}
] as Routes;
