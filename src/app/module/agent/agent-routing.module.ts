import { AgentStatiqueComponent } from './components/agent-statique/agent-statique.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TextEditorComponent } from './components/text-editor/text-editor.component';
import { AgentComponent } from './agent.component';

const routes: Routes = [
  { path : 'statique' , component: AgentStatiqueComponent},
  { path : 'editor', component: TextEditorComponent},
  { path : '', component: AgentComponent},
  { path : '**', redirectTo : 'employee', pathMatch : 'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgentRoutingModule { }
