import { Routes } from "@angular/router";


export default [
  {
    path: '',loadComponent: ()=> import('./components/ops/ops.component').then(module => module.OpsComponent) ,children: [
      { path: 'employee' , loadChildren: ()=> import('./../employee/employee.routes')},
      { path: 'agent',   loadChildren: ()=> import('./../agent/agent.route')},
      { path: 'customer',   loadChildren: ()=> import('./../customer/customer.routes')},
      { path: 'ronde',   loadChildren: ()=> import('./../ronde/ronde.routes')},
    ]
  } ,
  { path : '**', redirectTo : 'employee', pathMatch : 'full'}
] as Routes;
