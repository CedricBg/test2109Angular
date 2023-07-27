import { Routes } from '@angular/router';
import { listAllCustomerResolver, listassignedCustomerResolver } from 'src/app/resolvers/Customer-resolver.resolver';
import { EmployeeResolver } from 'src/app/resolvers/employee-resolver-one.resolver';

export default [
  { path: 'admin',title : 'Gestion agents', loadComponent: () => import('./components/admin/admin.component').then(module => module.AdminComponent) , children : [
    { path: 'site/:id', loadComponent : () => import('./components/site/site.component').then(module => module.SiteComponent) , resolve: {
      agent: EmployeeResolver,
      listAssignCustomers : listassignedCustomerResolver,
      listallCustomers : listAllCustomerResolver},},
  ]},
  { path : 'statique' , loadComponent: () => import('./components/agent-statique/agent-statique.component').then(module => module.AgentStatiqueComponent)},
  { path : 'editor', loadComponent: () => import('./components/text-editor/text-editor.component').then(module => module.TextEditorComponent)},
  { path: 'InfoAgent', loadComponent : () => import('./components//info-agent/info-agent.component').then(module =>module.InfoAgentComponent)},
  { path : '', loadComponent:() => import('./agent.component').then(module =>module.AgentComponent)},
  { path : '**', redirectTo : './employee', pathMatch : 'full'}
] as Routes
