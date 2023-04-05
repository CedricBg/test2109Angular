import { Customers } from 'src/app/models/customer/customers.models';
import { AddCustomerComponent } from './../add-customer/add-customer.component';
import { UpdateCustomerComponent } from './../update-customer/update-customer.component';
import { CustomerService } from './../../../../services/customer.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Site } from 'src/app/models/customer/site.models';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-customer',
  templateUrl: './list-customer.component.html',
  styleUrls: ['./list-customer.component.scss']
})
export class ListCustomerComponent implements OnInit {
  nameCustomer: string = ""
  listCustomers: Customers[]
  customerName: string
  SelectedClient: Customers
  selectedSiteName: string
  siteSelected: Site
  select : boolean = false
  subscriptionUpdate: Subscription
  subscriptionUpdateCustomer: Subscription

  constructor(private _CustService: CustomerService, public dialog : MatDialog,private _Router: Router) { }

  ngOnInit(): void {

    this._CustService.GetAll().subscribe({
      next: (data: any )=>{
        this.listCustomers = data
      }
    })

    this.subscriptionUpdate = this._CustService.getUpdateData().subscribe(newData => {
      this.siteSelected = newData
      this._CustService.GetAll().subscribe({
        next: (data: any )=>{
          this.listCustomers = data
        }
      })
    })
  }
  GetSit(id: number): number
  {
    const client = this.listCustomers.find(c=>c.id == id)
    const site =  client.site.find(c=>c.name == this.selectedSiteName)
    return site.siteId
  }

  GetOne(id: number)
  {
    if(this.selectedSiteName)
    {
      const idsite =  this.GetSit(id)
      this.select = true
      this._CustService.GetOne(idsite).subscribe({
        next: (data: Site)=>{
          this.siteSelected =  data
        }
      })
    }
  }

  UpdateOne(id: number)
  {
    if(this.selectedSiteName)
    {
      const idsite =  this.GetSit(id)
      this.select = true
      this._CustService.GetOne(idsite).subscribe({
        next: (data: Site)=>{
          this.siteSelected =  data

          if(this.selectedSiteName)
            {
              const diallogConfig =  new MatDialogConfig;
              diallogConfig.data =  this.siteSelected
              diallogConfig.disableClose = true;
              diallogConfig.restoreFocus = true;
              const dialogRef = this.dialog.open(UpdateCustomerComponent,diallogConfig);
            }
        }
      })
    }
  }

  ngModelChange()
  {
    if(this.nameCustomer == "")
    {
      this.ngOnInit()
    }
    else{
      this.listCustomers = this.listCustomers.filter(res=>{
        return res.nameCustomer.toLocaleLowerCase().match(this.nameCustomer.toLocaleLowerCase())
      })
    }
  }

  OpenformAddUser()
  {
    this.select = false
    this.siteSelected = null
    this._Router.navigateByUrl('OPS/customer/listcustomer/addCustomer')
    //const diallogConfig = new MatDialogConfig;
    //diallogConfig.disableClose = true;
    //diallogConfig.autoFocus = true;
    //diallogConfig.height = '70vh';
    //diallogConfig.minWidth = '80vw';
    //const dialogRef = this.dialog.open(AddCustomerComponent,diallogConfig);
  }

  Delete(id: number)
  {
    this._CustService.Delete(id).subscribe({
      next : (data: string)=>{

      }
    })
  }
}
