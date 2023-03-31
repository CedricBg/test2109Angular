import { Customers } from 'src/app/models/customer/customers.models';
import { AddCustomerComponent } from './../add-customer/add-customer.component';
import { UpdateCustomerComponent } from './../update-customer/update-customer.component';
import { CustomerService } from './../../../../services/customer.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Site } from 'src/app/models/customer/site.models';

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

  constructor(private _CustService: CustomerService, public dialog : MatDialog) { }

  ngOnInit(): void {
    this.GetAll()
  }

  GetAll()
  {
    this._CustService.GetAll().subscribe({
      next : (data: Customers[]) =>{
        this.listCustomers = data
      }
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
          console.log(this.siteSelected)
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
    const diallogConfig = new MatDialogConfig;
    diallogConfig.disableClose = true;
    diallogConfig.autoFocus = true;
    const dialogRef = this.dialog.open(AddCustomerComponent,diallogConfig);
  }

}
