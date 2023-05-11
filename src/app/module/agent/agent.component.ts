import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { StartEndTimeWork } from 'src/app/models/Planning/StartEndTimeWork.models';
import { Working } from 'src/app/models/Planning/working.models';
import { Pdf } from 'src/app/models/customer/Pdf.models';
import { formCreateRapport } from 'src/app/models/customer/Rapport/FormCreateRapport.models';
import { Customers } from 'src/app/models/customer/customers.models';
import { AgentService } from 'src/app/services/agent.service';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-agent',
  templateUrl: './agent.component.html',
  styleUrls: ['./agent.component.scss']
})
export class AgentComponent implements OnInit {

  formAtWork: StartEndTimeWork = new StartEndTimeWork()
  listCustomers: Customers [] = []
  idEmployee: number
  customer: string
  isWorking!: Boolean
  dataIsWorking: Working = new Working()
  form: formCreateRapport = new formCreateRapport()
  private subscriptions: Subscription[] = [];
  firstName: string = sessionStorage.getItem('firstName').toLowerCase()
  surName : string = sessionStorage.getItem('surName').toLowerCase()
  agent : string = this.firstName+'_'+this.surName
  timeStamp: any = Date.now();
  title: string = this.agent+"_"+this.timeStamp
  pdf: Pdf = {
    idPdf: 0,
    title: this.title,
    content: "",
    customer: null,
    idEmployee: 0
  }
  constructor(private _agentService: AgentService, private _employee: EmployeeService) {}

  ngOnInit(): void {

    this.idEmployee = Number.parseInt(sessionStorage.getItem("id"))
    this.formAtWork.EmployeeId =  this.idEmployee
    //On récupere la liste des clients ou l'agent est affecté
    this.subscriptions.push(this._agentService.GetCustomers( this.idEmployee).subscribe({
      next : (data: Customers[]) =>{
        this.listCustomers = data
        //on verifie que l'agent est en service ou pas
        this.subscriptions.push(this._agentService.IsWorking(this.idEmployee).subscribe(
          {
            next : (data: Working)=>{
              this.isWorking = data.isWorking
              //Oui l'agent travail on récupère alors le nom du client pour le rapport text-editor via un @Input
              //Important si l'agent a quitté le site et reviens plus tard on recharge le rapport
              if(this.isWorking){
                this.customer = this.CurrentCustomer(data.customerId)
                this.dataIsWorking = data
                this.dataIsWorking.nameCustomer = this.CurrentCustomer(data.customerId)
              }
            }
          }))
      }
    }))
  }


  //On enovi les données pour le début de service l'appel a StartWork va nour regirigé vers la page ou on affiche le rapport
  StartWork()
  {
    this.form.idEmployee = this.idEmployee
    this.form.customer = this.pdf.customer
    this.form.firstName = this.firstName
    this.form.lastName = this.surName
    this.form.title = this.title
    const customer = this.listCustomers.find(c=>c.nameCustomer === this.customer)
    this.customer = customer.nameCustomer
    this.formAtWork.EmployeeId = this.idEmployee
    this.formAtWork.CustomerId = customer.customerId
    this.subscriptions.push(this._agentService.StartWork(this.formAtWork).subscribe({
      next: (data: Working)=>{
      this.isWorking = data.isWorking
      this.dataIsWorking = data
      this.dataIsWorking.nameCustomer = this.CurrentCustomer(data.customerId)
      this.pdf.customer = this.dataIsWorking.nameCustomer
      this.pdf.idEmployee = this.idEmployee
      this.Save()
      }
    }))
  }

  CurrentCustomer(id: number)
  {
    const customer =  this.listCustomers.find(c=>c.customerId === id)
    return customer.nameCustomer
  }

//fin de service rapport terminé plus modifiable
//pour affichage nom du client mis a null
  EndWork(){
    this.subscriptions.push(this._agentService.EndWork(this.idEmployee).subscribe({
      next : (data: Boolean)=>{
        if(data === true)
        {
          this.subscriptions.push(this._employee.CheckForRapport(this.idEmployee).subscribe({
            next : (data: Pdf)=>{
              this._employee.SendRapport(data)
          }
          }))
          this.isWorking = false
          this.customer = null
        }
      }
    }))
  }

  SendRapport(pdf: Pdf)
  {
    this.subscriptions.push(this._employee.SendRapport(pdf))
  }

  //on se désabobnne de tout à la fermeture
  ngOnDestroy()
  {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe()
    })
  }
//On crée le rapport quand on prend son service
  Save()
  {
    this.timeStamp = Date.now()
    this.title= this.agent+"_"+this.timeStamp
    this.pdf.title = this.title
    this._employee.SaveRapport(this.pdf)
  }
}

