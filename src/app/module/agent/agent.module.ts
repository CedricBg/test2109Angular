import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgentRoutingModule } from './agent-routing.module';
import { AgentStatiqueComponent } from './components/agent-statique/agent-statique.component';
import { TextEditorComponent } from './components/text-editor/text-editor.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AgentComponent } from './agent.component';


@NgModule({
  declarations: [
    AgentStatiqueComponent,
    TextEditorComponent,
    AgentComponent

  ],
  imports: [
    CommonModule,
    AgentRoutingModule,
    SharedModule
  ]
})
export class AgentModule { }
