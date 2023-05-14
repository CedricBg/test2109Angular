import { GenerateHtml } from 'src/app/Utilities/GenerateHtml';
import { Component, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { StartEndTimeWork } from 'src/app/models/Planning/StartEndTimeWork.models';
import { Working } from 'src/app/models/Planning/working.models';
import { Pdf } from 'src/app/models/customer/Pdf.models';
import { formCreateRapport } from 'src/app/models/customer/Rapport/FormCreateRapport.models';
import { Customers } from 'src/app/models/customer/customers.models';
import { AgentService } from 'src/app/services/agent.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { Site } from 'src/app/models/customer/site.models';

@Component({
  selector: 'app-agent',
  templateUrl: './agent.component.html',
  styleUrls: ['./agent.component.scss']
})
export class AgentComponent implements OnInit {

  formAtWork: StartEndTimeWork = new StartEndTimeWork()
  listSite: Site [] = []
  listCustomer: Customers [] = []
  idEmployee: number
  site: string
  isWorking!: Boolean
  laDate: any = new Date().toLocaleDateString()
  dataIsWorking: Working = new Working()
  private subscriptions: Subscription[] = [];
  firstName: string = sessionStorage.getItem('firstName').toLowerCase()
  surName : string = sessionStorage.getItem('surName').toLowerCase()
  agent : string = this.firstName+'_'+this.surName
  private subjectSendRapport: Subscription = new Subscription()
  title: string
  html!: GenerateHtml
  pdf: Pdf = {
    idPdf: 0,
    title: '',
    content: '',
    siteId: 0,
    idEmployee: 0,
  }
  constructor(private _agentService: AgentService, private _employee: EmployeeService) {}

  ngOnInit(): void {

    this.idEmployee = Number.parseInt(sessionStorage.getItem("id"))
    //On récupere la liste des clients ou l'agent est affecté
    this.subscriptions.push(this._agentService.GetSites( this.idEmployee).subscribe({
      next : (data: Site[]) =>{
        this.listSite = data
        //on verifie que l'agent est en service ou pas
        this.subscriptions.push(this._agentService.IsWorking(this.idEmployee).subscribe({
            next : (data: Working)=>{
            this.isWorking = data.isWorking
            }
          }))
      }
    }))
  }

  //On envoi les données pour le début de service l'appel a StartWork va nous redirigé vers la page ou on affiche le rapport
  StartWork()
  {
    this.html = new GenerateHtml()
    const site = this.listSite.find(c=>c.name === this.site)
    this.site = site.name
    this.formAtWork.employeeId = this.idEmployee
    this.formAtWork.siteId = site.siteId

    this.pdf.content = this.html.Create(this.firstName,this.surName,this.site, this.laDate)
    this.pdf.siteId = site.siteId
    this.pdf.idEmployee = this.idEmployee
    const timeStamp =  Date.now()
    this.title = this.agent+"_"+timeStamp
    this.pdf.title = this.title
    this.subscriptions.push(this._agentService.StartWork(this.formAtWork).subscribe({
      next: (data: Working)=>{
      this.isWorking = data.isWorking
      this.Save(this.pdf)
      }
    }))
  }

  Save(pdf: Pdf)
  {
    this._employee.SaveRapport(pdf)
  }

  CurrentCustomer(id: number)
  {
    const site =  this.listSite.find(c=>c.siteId === id)
    return site.name
  }

  //fin de service rapport terminé plus modifiable
  //pour affichage nom du client mis a null
  EndWork(){
    const close = confirm("Vouler vous vraiment quitter ? Le rapport sera terminé en cas d'erreur vous devrez commencer un nouveau rapport")
    if(close === true)
    {
    this.subjectSendRapport = this._agentService.EndWork(this.idEmployee).subscribe({
      next : (data: Boolean)=>{
        if(data === true)
        {
          this.isWorking = false
          this.site = null
          //Observable du save dans destroy de text-editor
          this.subscriptions.push(this._employee.GetSavedData().subscribe({
            next: (data: Pdf)=>{
              this.pdf = data
            }
          }))
          //on met un délai pour s'assuré que les donnèes du destroy de text-editor soit bien dans la db avant la sauvegarde sur pdf
          //
          setTimeout(() => {this._employee.SendRapport(this.pdf)},1000)
        }
      }
    })
  }
  }

  //on se désabobnne de tout à la fermeture
  ngOnDestroy()
  {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe()
    })
  }
}

