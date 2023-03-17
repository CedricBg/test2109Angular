import { AddCustomerComponent } from './../add-customer/add-customer.component';
import { UpdateCustomerComponent } from './../update-customer/update-customer.component';
import { Customer } from './../../../../models/customer/customers.models';
import { CustomerAll } from './../../../../models/customer/customerAll.models';
import { CustomerService } from './../../../../services/customer.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-list-customer',
  templateUrl: './list-customer.component.html',
  styleUrls: ['./list-customer.component.scss']
})
export class ListCustomerComponent implements OnInit {
  nameCustomer: string = ""
  listCustomers: CustomerAll[] = []
  customerName: string
  SelectedClient: Customer
  select : boolean = false

  constructor(private _CustService: CustomerService, public dialog : MatDialog) { }

  ngOnInit(): void {
    this.GetAll()
  }

  GetAll()
  {
    this._CustService.GetAll().subscribe({
      next : (data: CustomerAll[]) =>{
        this.listCustomers = data
      }
    })
  }
  GetOne(id:number)
  {
    this.select = true
    this._CustService.GetOne(id).subscribe({
      next: (data: Customer)=>{
        this.SelectedClient = data
      }
    })
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
  OpenformUpdate(id: number)
  {
    const diallogConfig = new MatDialogConfig;
    diallogConfig.data = id
    diallogConfig.disableClose = false;
    diallogConfig.restoreFocus = true;

    const dialogRef = this.dialog.open(UpdateCustomerComponent,diallogConfig);
  }
  OpenformAddUser()
  {
    const diallogConfig = new MatDialogConfig;
    diallogConfig.disableClose = true;
    diallogConfig.autoFocus = true;
    const dialogRef = this.dialog.open(AddCustomerComponent,diallogConfig);
  }

}
