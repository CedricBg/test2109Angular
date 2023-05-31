import { AgentStatiqueComponent } from './components/agent-statique/agent-statique.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes,  } from '@angular/router';
import { TextEditorComponent } from './components/text-editor/text-editor.component';
import { AgentComponent } from './agent.component';
import { InfoAgentComponent } from './components/info-agent/info-agent.component';
import { AdminComponent } from './components/admin/admin.component';
import { SiteComponent } from './components/site/site.component';
import { EmployeeResolver, listAllCustomerResolver, listassignedCustomerResolver } from 'src/app/resolvers/employee-resolver-one.resolver';





const routes: Routes = [
  { path: 'admin', component: AdminComponent, children : [
    { path: 'site/:id', component : SiteComponent, resolve: {
      agent: EmployeeResolver,
      listAssignCustomers : listassignedCustomerResolver,
      listallCustomers : listAllCustomerResolver},},
  ]},
{ path : 'statique' , component: AgentStatiqueComponent},
  { path : 'editor', component: TextEditorComponent},
  { path: 'InfoAgent', component : InfoAgentComponent},
  { path : '', component: AgentComponent},
  { path : '**', redirectTo : 'employee', pathMatch : 'full'}
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgentRoutingModule { }
