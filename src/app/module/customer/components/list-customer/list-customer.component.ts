import { UpdateSiteComponent } from './../update-site/update-site.component';
import { Customers } from 'src/app/models/customer/customers.models';
import { AddCustomerComponent } from './../add-customer/add-customer.component';
import { UpdateCustomerComponent } from './../update-customer/update-customer.component';
import { CustomerService } from './../../../../services/customer.service';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Site } from 'src/app/models/customer/site.models';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { merge, of, forkJoin } from 'rxjs';import { first, startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-list-customer',
  templateUrl: './list-customer.component.html',
  styleUrls: ['./list-customer.component.scss']
})
export class ListCustomerComponent implements OnInit {
  nameCustomer: string = ""
  listCustomers!: Customers[]
  SelectedClient: Customers
  selectedSiteName: string
  siteSelected: Site
  select : boolean = false
  subscriptionUpdate: Subscription
  subscriptionUpdateCustomer: Subscription
  subscriptionAddCustomer: Subscription
  subscriptionAddSite: Subscription

  pagedData!: any[]
  length: number
  customer: Customers
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(private _CustService: CustomerService, public dialog : MatDialog,private _Router: Router,private cdRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this._CustService.getAllCustomers().pipe(first()).subscribe({
      next : (data: Customers[])=>{
        this.listCustomers = data
        this.getPageData()
      }
    })

    //Retour Update Site
    this.subscriptionUpdate = this._CustService.getUpdateData().subscribe(newData => {
      this.siteSelected = newData
      this._CustService.getAllCustomers().subscribe(data=>{
        this.listCustomers = data
        this.getPageData()
        }
      )
    })

    //Abonnement à la nouvelle liste de customers sur la add csutomer apres création d'un customer
    this.subscriptionAddCustomer = this._CustService.getAddCustomer().subscribe({
      next : (data: Customers[])=>{
        this.listCustomers = data
        this.getPageData()
      }
    })

    //Retour update Customer
    this.subscriptionUpdateCustomer = this._CustService.GetUpdateCustomer().subscribe(newData =>{
      this.listCustomers = newData
      this.getPageData()
    })

    //Abonnement à la nouvelle liste customers pour mise a jour de la vue apres création d'un site dans AddCustumer.ts
    this.subscriptionAddSite = this._CustService.GetCustomersList().subscribe({
      next : (data: Customers[])=>{
        this.listCustomers = data
        this.getPageData()
      }
    })
  }

  ngOnDestroy(){
    this.subscriptionUpdate.unsubscribe()
    this.subscriptionAddCustomer.unsubscribe()
    this.subscriptionUpdateCustomer.unsubscribe()
    this.subscriptionAddSite.unsubscribe()
  }
  ngAfterViewInit() {
    this.paginator.page.subscribe(() => this.getPageData());
  }
  //gestion du pager
   getPageData() {
    this.length =  this.listCustomers.length
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    const endIndex = startIndex + this.paginator.pageSize;
    this.pagedData =  this.listCustomers.slice(startIndex, endIndex);
  }

  GetSit(id: number): number
  {
    console.log(id)
    try
    {
      const client = this.listCustomers.find(c=>c.customerId == id)
      const site =  client.site.find(c=>c.name == this.selectedSiteName)
      return site.siteId
    }
    catch
    {
      return 0
    }

  }

  GetOne(id: number)
  {
    if(this.selectedSiteName != undefined)
    {
      const idsite: number =  this.GetSit(id)
      if(idsite != 0)
      {
      //pour la gestion de la vue et savoir quoi afficher à mettre a null pour chaque nouveau composant a afficher
      this.select = true
      this._CustService.GetOne(idsite).subscribe({
        next: (data: Site)=>{
          this.siteSelected =  data
        }
      })
    }
    }
  }

  UpdateOne(id: number)
  {
    //selectedSiteName est mis a jour par sélection dans le html
    if(this.selectedSiteName != undefined)
    {
      const idsite: number =  this.GetSit(id)
      if(idsite != 0)
      {
        this.select = true
        this._CustService.GetOne(idsite).subscribe({
        next: (data: Site)=>
        {
          this.siteSelected =  data
          if(this.siteSelected)
          {
            const diallogConfig =  new MatDialogConfig;
            diallogConfig.data =  this.siteSelected
            diallogConfig.disableClose = true;
            diallogConfig.restoreFocus = true;
            const dialogRef = this.dialog.open(UpdateSiteComponent,diallogConfig);
          }
        }
      })
      }
      else{
        return 0
      }
    }
    return 0
  }

  ngModelChange()
  {
    if(this.nameCustomer == "")
    {
      this.ngOnInit()
    }
    else{
      this.pagedData = this.listCustomers.filter(res=>{
        return res.nameCustomer.toLocaleLowerCase().match(this.nameCustomer.toLocaleLowerCase())
      })
    }
  }

  AddSite(id: number)
  {
    //Affichage permet de précisé que l'on va remplacé les donnèes affichées
    this.select = false
    this.siteSelected = null
    //pour l'observable vers addSitepour lui passer le client pour le nouveau site
    this._CustService.GetOneforsiteCustomer(id)
    this._Router.navigate(['OPS/customer/listcustomer/addSite'])
  }

  DeleteSite(id: number)
  {
    const site = this.GetSit(id)
    if(site != 0){
      this._CustService.DeleteSite(site).subscribe({
        next: (data: string)=>{
          console.log(data)
        }
      })
    }
  }

  FormAddUser()
  {
    this.select = false
    this.siteSelected = null
    this._Router.navigateByUrl('OPS/customer/listcustomer/addCustomer')
  }

  Delete(id: number)
  {
    this._CustService.Delete(id).subscribe({
      next : (data: string)=>{
        const body = data
        this._CustService.getAllCustomers().subscribe(data=>{
          this.listCustomers = data
          this.getPageData()
          }
        )
      }
    })

  }
  UpdateCustomer(id: number)
  {
    this.select = false
    this.siteSelected = null
        this._CustService.GetOneCustomer(id)
        this._Router.navigate(['OPS/customer/listcustomer/UpdateCustomer'])

      }

}
function ngOnDestroy() {
  throw new Error('Function not implemented.');
}

