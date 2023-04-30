import { Component, OnInit } from '@angular/core';
import { StartEndTimeWork } from 'src/app/models/Planning/StartEndTimeWork.models';
import { Customers } from 'src/app/models/customer/customers.models';
import { AgentService } from 'src/app/services/agent.service';

@Component({
  selector: 'app-agent',
  templateUrl: './agent.component.html',
  styleUrls: ['./agent.component.scss']
})
export class AgentComponent implements OnInit {

  formAtWork: StartEndTimeWork = new StartEndTimeWork()
  listCustomers: Customers [] = []
  idEmployee: number
  customer!: string
  isWorking!: Boolean
  constructor(private _agentService: AgentService) {}

  ngOnInit(): void {
    this.idEmployee = Number.parseInt(sessionStorage.getItem("id"))
    this.formAtWork.EmployeeId =  this.idEmployee

    this._agentService.IsWorking(this.idEmployee).subscribe(
    {
      next : (data: Boolean)=>{
        this.isWorking = data
      }
    })

    this._agentService.GetCustomers( this.idEmployee).subscribe({
      next : (data: Customers[]) =>{
        this.listCustomers = data
      }
    })
  }

  StartWork()
  {
    const customer = this.listCustomers.find(c=>c.nameCustomer === this.customer)
    this.formAtWork.EmployeeId = this.idEmployee
    this.formAtWork.CustomerId = customer.customerId
    this._agentService.StartWork(this.formAtWork).subscribe({
      next: (data: Boolean)=>{
        this.isWorking = data
      }
    })
  }
  EndWork(){
    console.log(this.idEmployee)
    this._agentService.EndWork(this.idEmployee).subscribe({
      next : (data: Boolean)=>{
        if(data === true)
        {
          this.isWorking = false
        }

      }
    })
  }
}

