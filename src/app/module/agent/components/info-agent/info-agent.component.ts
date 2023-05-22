import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Pdf } from 'src/app/models/customer/Pdf.models';
import { AgentService } from 'src/app/services/agent.service';
import { saveAs } from 'file-saver';
import { Site } from 'src/app/models/customer/site.models';

@Component({
  selector: 'app-info-agent',
  templateUrl: './info-agent.component.html',
  styleUrls: ['./info-agent.component.scss']
})
export class InfoAgentComponent implements OnInit {

  listRapport: Pdf[] = []
  constructor(private _agentService: AgentService) {}
  idEmployee!: number
  siteList: Site[] = []

  private subscriptions: Subscription[] = [];

  ngOnInit(): void {
    this.idEmployee = Number.parseInt(sessionStorage.getItem("id"))
    this.subscriptions.push(this._agentService.GetSites(this.idEmployee).subscribe({
      next : (data: Site[])=>{
        this.siteList = data

      }
    }))
    setTimeout(() => {this.subscriptions.push(this._agentService.GetRapport(this.idEmployee).subscribe({
      next: (data: Pdf[]) =>{
        this.listRapport = data
      }
    }))},1000);

  }

  //on va télécharger un rapport avec son id
  loadRapport(id: number)
  {
    this._agentService.loadRapport(id).subscribe({
      next: (data: Blob)=>{
        const filename = 'Rapport.pdf';
        saveAs(data, filename);
      }
    })
  }

  ngOnDestroy()
  {
    this.subscriptions.forEach(element => {
      element.unsubscribe
    });
  }
}
