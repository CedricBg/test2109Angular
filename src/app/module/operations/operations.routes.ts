import { Routes } from "@angular/router";


export const routes: Routes = [
  {
    path: '',loadComponent: ()=> import('./components/ops/ops.component').then(module => module.OpsComponent) ,children: [
      { path: 'employee' , loadChildren: ()=> import('./../employee/employee.routes').then(m => m.routes) },
      { path: 'agent',   loadChildren: ()=> import('./../agent/agent.route').then(m=> m.routes)},
      { path: 'customer',   loadChildren: ()=> import('./../customer/customer.routes').then(m=> m.routes)},
      { path: 'ronde',   loadChildren: ()=> import('./../ronde/ronde.routes').then(m=> m.routes)},

    ]
}
];
