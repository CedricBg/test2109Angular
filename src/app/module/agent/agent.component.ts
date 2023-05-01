import { Component, OnInit } from '@angular/core';
import { StartEndTimeWork } from 'src/app/models/Planning/StartEndTimeWork.models';
import { Working } from 'src/app/models/Planning/working.models';
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
  //pour le Input
  customer: string
  workingCustomer: Working = new Working()
  isWorking!: Boolean
  constructor(private _agentService: AgentService) {}

  ngOnInit(): void {
    this.idEmployee = Number.parseInt(sessionStorage.getItem("id"))
    this.formAtWork.EmployeeId =  this.idEmployee
    //On récupere la liste des clients ou l'agent est affecté
    this._agentService.GetCustomers( this.idEmployee).subscribe({
      next : (data: Customers[]) =>{
        this.listCustomers = data
        //on verifie que l'agent est en service ou pas
        this._agentService.IsWorking(this.idEmployee).subscribe(
          {
            next : (data: Working)=>{
              this.isWorking = data.isWorking
              //Oui l'agent travail on récupère alors le nom du client pour le rapport text-editor via un @Input
              //Important si l'agent a quitté le site et reviens plus tard on recharge le rapport
              const cust =  this.listCustomers.find(c=>c.customerId === data.customerId)
              this.customer = cust.nameCustomer
            }
          })
      }
    })
  }

  StartWork()
  {
    const customer = this.listCustomers.find(c=>c.nameCustomer === this.customer)
    this.customer = customer.nameCustomer
    this.formAtWork.EmployeeId = this.idEmployee
    this.formAtWork.CustomerId = customer.customerId
    this._agentService.StartWork(this.formAtWork).subscribe({
      next: (data: Working)=>{
      this.workingCustomer = data
      this.isWorking = data.isWorking
      }
    })
  }

   CurrentCustomer(id: number)
  {
    const customer =  this.listCustomers.find(c=>c.customerId === id)
    return customer.nameCustomer
  }

  EndWork(){
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

