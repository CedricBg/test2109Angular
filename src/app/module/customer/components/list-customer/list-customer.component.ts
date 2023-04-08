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
  customerName: string
  SelectedClient: Customers
  selectedSiteName: string
  siteSelected: Site
  select : boolean = false
  subscriptionUpdate: Subscription
  subscriptionUpdateCustomer: Subscription
  pagedData!: any[]
  private customers$ = new Observable<Customers[]>()
  length: number
  pageSize = 10;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(private _CustService: CustomerService, public dialog : MatDialog,private _Router: Router,private cdRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this._CustService.getAllCustomers().pipe(first()).subscribe({
      next : (data: Customers[])=>{
        this.listCustomers = data
        console.log(this.listCustomers.sort(e=>e.id))
        this.getPageData()
      }
    })
    this.subscriptionUpdate = this._CustService.getUpdateData().subscribe(newData => {
      this.siteSelected = newData

    })
    this.subscriptionUpdateCustomer = this._CustService.getAddCustomer().subscribe(newData =>{
      console.log(newData)
      this.listCustomers = newData
      this.listCustomers.sort(e=>e.id)
      this.getPageData()
    })

  }
  ngAfterViewInit() {
    this.paginator.page.subscribe(() => this.getPageData());
  }

  getPageData() {
    this.length =  this.listCustomers.length
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    const endIndex = startIndex + this.paginator.pageSize;
    this.pagedData = this.listCustomers.slice(startIndex, endIndex);
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
      this.pagedData = this.listCustomers.filter(res=>{
        return res.nameCustomer.toLocaleLowerCase().match(this.nameCustomer.toLocaleLowerCase())
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
        const body = data;
        console.log(body)
      }
    })
  }
  UpdateCustomer()
  {

  }
}
