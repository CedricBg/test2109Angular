import { AgentService } from 'src/app/services/agent.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Subscription, empty } from 'rxjs';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { EmployeeService } from 'src/app/services/employee.service';
import { Site } from 'src/app/models/customer/site.models';
import { Customers } from 'src/app/models/customer/customers.models';
import { CustomerService } from 'src/app/services/customer.service';
import { CdkDragDrop,CdkDrag,CdkDropList,CdkDropListGroup,moveItemInArray,transferArrayItem, } from '@angular/cdk/drag-drop';
import { AddSites } from 'src/app/models/agents/AddSites.models';

@Component({
  selector: 'app-site',
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.scss']
})
export class SiteComponent implements OnInit{
subscription: Subscription[] = []
listCustomers: Customers[] = []
modifiedListCustomer: Customers[]= []
listSiteAgent: Site[] = []
listCustomerstoAgent: Customers[] = []
agent: any;
nom: string = ""
safeImageUrl: SafeUrl
addSites : AddSites = new AddSites()
AddList: Site[] = []

  constructor(private activatedRoute: ActivatedRoute, private _serviceEmployee: EmployeeService, private _serviceCustomer: CustomerService, private _agentService : AgentService, private _DomSanitizer: DomSanitizer){}
  ngOnInit(): void {

    this.subscription.push(this.activatedRoute.data.subscribe({
      next :  (data : any) =>{
        this.agent = data
        this.subscription.push(this._serviceCustomer.getAllCustomers().subscribe({
          next : (data: Customers[]) =>{
            this.listCustomers = data
          }}));
        this.subscription.push(this._serviceEmployee.DownLoadFoto(this.agent.agent.id).subscribe({
          next : (data : Blob)=>{
            if(!(data == null))
            {
              const imageUrl: string = URL.createObjectURL(data);
              this.safeImageUrl = this._DomSanitizer.bypassSecurityTrustUrl(imageUrl);
            }
            else{
              this.safeImageUrl = null
            }
          }
        }));
        this.subscription.push(this._agentService.GetSites(data.agent.id).subscribe({
          next : (data : Site[] ) =>{
            this.listSiteAgent = data
          }})
        );
        this.subscription.push(this._agentService.GetAssignedCustomers(data.agent.id).subscribe({
          next : (data : Customers[]) =>{
            //Liste de customer assigné a l'agent par rapport au site déjà attribué !!! les customers recu ne contiennent que les sites attribué a l'agent
            this.listCustomerstoAgent = data
            //ici on ne récupère que les clients qui ne sont pas encore attribué à l'agent évite les doublons dans le drag and drop
            this.modifiedListCustomer = this.listCustomers.filter(objet=> !this.listCustomerstoAgent.some(elt => elt.customerId === objet.customerId))
          }
        }))
        }
      })
    );
  }

  drop(event: CdkDragDrop<Customers[]>)
  {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  SaveCustomers()
  {
    //On remet la liste a jour à chaque fois qu'on appel la fonction
    this.AddList = []
    this.addSites.sites = undefined
    //on assign à la liste les clients sélectionné
    const list = this.listCustomers.filter(elt => this.listCustomerstoAgent.includes(elt))

    if(!(list.length === 0 ))
    {
      list.forEach(element => {
        //On créé la la liste des site à ajouté par customer
        this.AddList = this.AddList.concat(element.site);
      });
      console.log(this.agent.agent.id)
      this.addSites.idEmployee = this.agent.agent.id
      this.addSites.sites = this.AddList
      //ici on sait que l'agent n'pas le Customer qui est ajouter on créé une liste avec les sites du customer que l'on envoi a l'api
      this.subscription.push(this._agentService.AddSitesToGuard(this.addSites).subscribe({
        next: (data : Site[]) =>{
          this.listSiteAgent = data
          //ici on remet toutes les données a jour pour éviter les doublons dans la db apres ajout
          this.subscription.push(this._agentService.GetAssignedCustomers(this.agent.agent.id).subscribe({
            next : (data : Customers[]) =>{
              //Liste de customer assigné a l'agent par rapport au site déjà attribué !!! les customers recu ne contiennent que les sites attribué a l'agent
              this.listCustomerstoAgent = data
              //ici on ne récupère que les clients qui ne sont pas encore attribué à l'agent évite les doublons dans le drag and drop
              this.modifiedListCustomer = this.listCustomers.filter(objet=> !this.listCustomerstoAgent.some(elt => elt.customerId === objet.customerId))
            }
          }))
        }
      }));
    }
    //const list2 = this.listCustomers.filter(elt => !this.modifiedListCustomer.includes(elt))

  }

  ngOnDestroy(){
    this.subscription.forEach(element => {
      element.unsubscribe();
    });
  }
}
