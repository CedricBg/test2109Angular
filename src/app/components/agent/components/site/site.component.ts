import { AgentService } from 'src/app/services/agent.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Subscription,} from 'rxjs';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { EmployeeService } from 'src/app/services/employee.service';
import { Site } from 'src/app/models/customer/site.models';
import { Customers } from 'src/app/models/customer/customers.models';
import { CustomerService } from 'src/app/services/customer.service';
import { CdkDragDrop,CdkDrag,CdkDropList,CdkDropListGroup,moveItemInArray,transferArrayItem, } from '@angular/cdk/drag-drop';
import { AddSites } from 'src/app/models/agents/AddSites.models';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgFor } from '@angular/common';



@Component({
    selector: 'app-site',
    templateUrl: './site.component.html',
    styleUrls: ['./site.component.scss'],
    standalone: true,
    imports: [CdkDropListGroup, CdkDropList, NgFor, CdkDrag, MatIconModule, MatButtonModule,  ]
})
export class SiteComponent implements OnInit{
subscription: Subscription[] = [];
data: any;
nom: string = "";
safeImageUrl: SafeUrl;

//Par customer
//Données venant de la db
listAssignedCustomer: Customers[] = [];
//liste sur lasquelle on va travailler on pourrras comparé les changements entre les 2 listes
modifiAssignedCustomer: Customers[] = [];
//Données venant de la db
allCustomersNotAssignedToGuard: Customers [] = [];
//liste sur lasquelle on va travailler on pourrras comparé les changements entre les 2 listes
allCustomersNotAssignedToGuardModif : Customers [] = [];
//on va transformé nos clients en liste de sites
listSiteAdd: Site[] = [];
listSiteDel: Site[] = [];
//On renvoi a la db une liste de site avec l'id de l'emplyee
addSite: AddSites = new AddSites();
delSite: AddSites = new AddSites();

//Par sites
listAllsites: Site[] = [];
listAllsitesAgentmodif: Site[] = [];
listAllSiteAgent: Site[] = [];
listSiteAssignAgent: Site[] = [];

  constructor(private activatedRoute: ActivatedRoute,private _SnackBar : SnackBarService, private _serviceEmployee: EmployeeService, private _serviceCustomer: CustomerService, private _agentService : AgentService, private _DomSanitizer: DomSanitizer){}
  ngOnInit(): void {
    this.addSite.sites = [];
    this.delSite.sites = [];
    this.listAllsitesAgentmodif = [];
    this.subscription.push(this.activatedRoute.data.subscribe({
      next : (data: any)=>{
          //donnees envoyé avec un resolver
          this.data = data;
          this.Assignation(this.data.listAssignCustomers, this.data.listallCustomers)
          this.subscription.push(this._agentService.GetSites(data.agent.id).subscribe({
            next : (data : Site[] ) =>{
              this.listAllSiteAgent = data;
              this.listAllsites = [];
              this.data.listallCustomers.forEach(element => {
                this.listAllsites = this.listAllsites.concat(element.site)
              });
              this.AssignationSite();
            }
          }));
        }
    }))
  }

  Assignation(listAssignCustomers: Customers[], listallCustomers: Customers[])
  {
    //this.listAssignedCustomer et this.data.listallCustomers sont identique au départ, une va servir pour les changements
    //et l'autre à la comparaison avec les données fixes
    this.listAssignedCustomer = listallCustomers.filter(object => listAssignCustomers.some(elt => elt.customerId === object.customerId));
    this.modifiAssignedCustomer  = listallCustomers.filter(object => this.listAssignedCustomer.some(elt => elt.customerId === object.customerId));
    this.allCustomersNotAssignedToGuard = listallCustomers.filter(object => !this.listAssignedCustomer.some(elt =>elt.customerId === object.customerId));
    this.allCustomersNotAssignedToGuardModif = listallCustomers.filter(object => !this.listAssignedCustomer.some(elt =>elt.customerId === object.customerId));
  }

  SaveCustomers()
  {
    //ici on filtre pour avoir tout les clients que l'on a enlevé de la liste
    const DellistCustomer = this.listAssignedCustomer.filter(object => !this.modifiAssignedCustomer.some(elt=>elt.customerId === object.customerId));
    //ici on filtre pour avoir tout les clients ajouté  a la liste
    const AddlistCustomer = this.allCustomersNotAssignedToGuard.filter(object => !this.allCustomersNotAssignedToGuardModif.some(elt=>elt.customerId === object.customerId));
    //ici on transforme en liste de delSite pour envoi suppression de site
    if(DellistCustomer.length > 0)
    {
      DellistCustomer.forEach(element => {
        this.listSiteDel = this.listSiteDel.concat(element.site);
      });

      const liste = this.listAllSiteAgent.filter(object => this.listSiteDel.some(elt =>elt.siteId === object.siteId));

      this.delSite.sites = liste
      this.delSite.idEmployee = this.data.agent.id;
      //on éfface les données sélectionné et on met à jour liste de site
      this.subscription.push(this._agentService.RemoveSitesToGuard(this.delSite).subscribe({
        next: (dat : Site[]) => {
          this.listAllSiteAgent = dat;
          this.AssignationSite();
          this.subscription.push(this._agentService.GetAssignedCustomers(this.data.agent.id).subscribe({
            next : (data: Customers[]) => {
              const assignCustomer = data;
              this.subscription.push(this._serviceCustomer.getAllCustomers().subscribe({
                  next: ( datas: Customers[]) => {
                    this.Assignation(assignCustomer,datas)}
              }))}}));
        }
      }))
    }
    if(AddlistCustomer.length > 0)
    {
      AddlistCustomer.forEach(element => {
        this.listSiteAdd = this.listSiteAdd.concat(element.site);
      });

      this.addSite.sites = this.listSiteAdd;
      this.addSite.idEmployee = this.data.agent.id;

      this.subscription.push(this._agentService.AddSitesToGuard(this.addSite).subscribe({
        next: (data : Site []) => {
          this.listAllSiteAgent = data;
          this.AssignationSite();
          //ici les changements on été portés dans la db
          //Maintenant on récupère les donnèes mise à jour

          this.subscription.push(this._agentService.GetAssignedCustomers(this.data.agent.id).subscribe({
          next : (data: Customers[]) => {
            const assignCustomer = data;
            this.subscription.push(this._serviceCustomer.getAllCustomers().subscribe({
                next: ( datas: Customers[]) => {
                  this.Assignation(assignCustomer,datas);

                }

            }))}}));
        }
      }))
    }
    this._SnackBar.openSnackBar()
    //ici on vide les variables pour éviter les doublons
    this.listSiteAdd = [];
    this.listSiteDel = [];
    this.addSite.sites = [];
    this.delSite.sites = [];

  }

  AssignationSite()
  {

    this.listSiteAssignAgent = Array.from(this.listAllSiteAgent);
    this.listAllsitesAgentmodif = this.listAllsites.filter(object => !this.listSiteAssignAgent.some(elt =>elt.siteId === object.siteId))
    this.subscription.push(this._agentService.GetAssignedCustomers(this.data.agent.id).subscribe({
      next : (data: Customers[]) => {
        const assignCustomer = data;
        this.subscription.push(this._serviceCustomer.getAllCustomers().subscribe({
            next: ( datas: Customers[]) => {
              this.Assignation(assignCustomer,datas)}
        }))}}));
  }

  SaveSites()
  {
    const differencemoins = this.listAllSiteAgent.filter(object => !this.listSiteAssignAgent.some(elt=>elt.siteId === object.siteId ))
    const differenceplus = this.listSiteAssignAgent.filter(object => !this.listAllSiteAgent.some(elt=>elt.siteId === object.siteId ))

    if(differenceplus.length > 0)
    {
      this.addSite.sites = differenceplus;
      this.addSite.idEmployee = this.data.agent.id;
      this.subscription.push(this._agentService.AddSitesToGuard(this.addSite).subscribe({
        next: (data : Site[]) =>  {
          this.listAllSiteAgent = data;
        this.AssignationSite()
        }
      }));
    }

    if(differencemoins.length > 0)
    {
      this.delSite.sites = differencemoins;
      this.delSite.idEmployee = this.data.agent.id;
      this.subscription.push(this._agentService.RemoveSitesToGuard(this.delSite).subscribe({
      next: (data : Site[]) => {
        this.listAllSiteAgent = data;
        this.AssignationSite();
      }
    }));
  }
    this.delSite.sites = [];
    this.addSite.sites = [];
    this._SnackBar.openSnackBar();
  }

  drop(event: CdkDragDrop<any[]>)
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

  dropSite(event: CdkDragDrop<Site[]>)
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

  ngOnDestroy(){
    this.subscription.forEach(element => {
      element.unsubscribe();
    });
  }
}
