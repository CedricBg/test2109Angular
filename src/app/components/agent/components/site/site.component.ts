import { Site } from './../../../../models/customer/site.models';
import { AgentService } from 'src/app/services/agent.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Subscription, switchMap, tap,} from 'rxjs';
import { EmployeeService } from 'src/app/services/employee.service';
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
    imports: [CdkDropListGroup, CdkDropList, NgFor, CdkDrag, MatIconModule, MatButtonModule, MatIconModule  ]
})
export class SiteComponent implements OnInit{
subscription: Subscription[] = [];
data: any;
nom: string = "";


//Par customer
//Données venant de la db
listAssignedCustomer: Customers[] = [];
listAllCustomers: Customers[] = [];
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

  constructor(private activatedRoute: ActivatedRoute,private _SnackBar : SnackBarService, private _serviceEmployee: EmployeeService, private _serviceCustomer: CustomerService, private _agentService : AgentService){}
  ngOnInit(): void {
    this.addSite.sites = [];
    this.delSite.sites = [];
    this.listAllsitesAgentmodif = [];

     this.subscription.push(
      this.activatedRoute.data.pipe(
        switchMap ((data: any) => {
          this.data = data;
          this.nom = this.data.agent.name;
          this.listAllCustomers = this.data.listallCustomers;
          return this._agentService.GetSites(data.agent.id);
      }),
      tap((data: Site[]) => {
        this.listSiteAssignAgent = data;
        this.findListSiteNotAssingeToGuard()
      }),
      ).subscribe()
      )
    }

  findListCustomersAssingeToGuard(){
    this.listAssignedCustomer = this.listAllCustomers.filter(object => this.data.agent.id === object.idEmployee);
  }

  findListCustomersNotAssingeToGuard(){
    this.listAllCustomers.forEach(client => {


    }
    );

  }

  findListSiteNotAssingeToGuard()
  {
    let allSites : Site[] = [];
    this.listAllCustomers.forEach(client => {
      allSites = allSites.concat(...client.site);
    });

    this.listAllsites = allSites;
    this.listAllsitesAgentmodif = allSites.filter(object => !this.listSiteAssignAgent.some(elt => elt.siteId === object.siteId));

  }

  saveSites(){
    this.findListSiteNotAssingeToGuard()
    this.addSite.idEmployee = this.data.agent.id;
    this.addSite.sites = this.listSiteAssignAgent;
    this.subscription.push(this._agentService.AddSitesToGuard(this.addSite).subscribe({
      next : (data : Site[]) => {
        console.log(data);
        console.log(this.listSiteAssignAgent);
        if(this.arraysAreEqual(data, this.listSiteAssignAgent))
        {
          this.listSiteAssignAgent = data;
          this._SnackBar.openSnackBar({text1: "Ok",text2:  "Les sites ont été ajouté avec succès"});
        }
        else{
          this._SnackBar.openSnackBar({text1: "Erreur",text2:  "Les sites n'ont pas été ajouté avec succès"});
        }
      }
    }))
  }

  arraysAreEqual(a: Site[], b: Site[]) {
    return Array.isArray(a) &&
      Array.isArray(b) &&
      a.length === b.length &&
      a.every((val, index) => val.siteId === b[index].siteId);
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
