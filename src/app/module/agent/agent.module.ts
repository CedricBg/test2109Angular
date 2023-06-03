import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgentRoutingModule } from './agent-routing.module';
import { AgentStatiqueComponent } from './components/agent-statique/agent-statique.component';
import { TextEditorComponent } from './components/text-editor/text-editor.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AgentComponent } from './agent.component';
import { InfoAgentComponent } from './components/info-agent/info-agent.component';
import { AdminComponent } from './components/admin/admin.component';
import { SiteComponent } from './components/site/site.component';




@NgModule({
    imports: [
        CommonModule,
        AgentRoutingModule,
        SharedModule,
        AgentStatiqueComponent,
        TextEditorComponent,
        AgentComponent,
        InfoAgentComponent,
        AdminComponent,
        SiteComponent
    ]
})
export class AgentModule { }
