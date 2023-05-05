import { Component, OnInit } from '@angular/core';
import { Customers } from 'src/app/models/customer/customers.models';
import { AgentService } from 'src/app/services/agent.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-info-agent',
  templateUrl: './info-agent.component.html',
  styleUrls: ['./info-agent.component.scss']
})
export class InfoAgentComponent implements OnInit {

  constructor(private _agentService: AgentService) {}
  idEmployee!: number
  customersList: Customers[] = []
  ngOnInit(): void {
    this.idEmployee = Number.parseInt(sessionStorage.getItem("id"))
    this._agentService.GetCustomers(this.idEmployee).subscribe({
      next : (data: Customers[])=>{
        this.customersList = data
      }
    })
  }



}
