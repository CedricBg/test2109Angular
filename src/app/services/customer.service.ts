
import { Site } from './../models/customer/site.models';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customers } from '../models/customer/customers.models';
import { ContactPerson } from '../models/customer/ContactPerson.models';



@Injectable({
  providedIn: 'root'
})
export class CustomerService {


  private isUpdatedSubject: Subject<Site> = new Subject<Site>()
  private isAddCustSubject: Subject<Customers[]> = new Subject<Customers[]>()
  private isUpdateCustSubject: Subject<Customers[]> = new Subject<Customers[]>()
  private isCreatesiteSubject: Subject<Customers[]> = new Subject<Customers[]>()
  private customerSubject = new Subject<Customers>()
  private isUpdatesiteSubject = new Subject<Customers>()
  private isAddCustomerSubject = new Subject<number>()
  customer: Customers
  constructor(private _httpClient : HttpClient, private _route : Router) {  }

  private JsonHeader()
  {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return httpOptions
  }

  emitSubject()
  {
    this.customerSubject.next(this.customer)
  }

  Delete(id: number)
  {
    return this._httpClient.put<string>(environment.baseAdres +'customer/delete/'+id, JSON.stringify(id), this.JsonHeader())
  }

  getUpdateData()
  {
    return this.isUpdatedSubject.asObservable();
  }

  getAddCustomer()
  {
    return this.isAddCustSubject.asObservable();
  }

  GetUpdateCustomer()
  {
    return this.isUpdateCustSubject.asObservable()
  }

  GetaCustomerForUpdateSite()
  {
    return this.isUpdatesiteSubject.asObservable();
  }

  GetACustomer()
  {
    return this.customerSubject.asObservable();
  }

  GetCustomersList()
  {
    return this.isCreatesiteSubject.asObservable()
  }

  GetOneforsiteCustomer(id: number)
  {
    return this._httpClient.get<Customers>(environment.baseAdres+'customer/'+id).subscribe({
      next:  (data: Customers) =>{
        this.isUpdatesiteSubject.next(data)
      }
    })
  }

  getAllCustomers()
  {
    return this._httpClient.get<Customers[]>(environment.baseAdres +'customer/')
  }

  getAllCustomersOnCreateSite()
  {
    return this._httpClient.get<Customers[]>(environment.baseAdres +'customer/').subscribe({
      next: (data: Customers[])=>{
        console.log(data)
        this.isCreatesiteSubject.next(data)
      }
    })
  }

  GetOne(id: number): Observable<Site>
  {
    return this._httpClient.get<Site>(environment.baseAdres+'customer/site/'+id)
  }

  GetIdCustAdd()
  {
    return this.isAddCustomerSubject.asObservable()
  }

  GetOneCustomer(id: number)
  {
    return this._httpClient.get<Customers>(environment.baseAdres+'customer/'+id).subscribe({
      next: (data: Customers) =>{
        this.customerSubject.next(data)
      }
    })
  }

  UpdateUser(client: Site)
  {
    this._httpClient.put<Site>(environment.baseAdres +'customer/site', client).subscribe({
      next: (data: Site) =>{
        this.isUpdatedSubject.next(data)
      }
    })
  }

  UpdateCustomer(customer: Customers)
  {
    this._httpClient.put<Customers[]>(environment.baseAdres +'customer/', JSON.stringify(customer), this.JsonHeader()).subscribe({
      next : (data: Customers[]) =>{
        this.isUpdateCustSubject.next(data)
      }
    })
  }

  CreateCompany(customer: Customers){
    return this._httpClient.post<number>(environment.baseAdres +'customer/addCustomer/', customer, this.JsonHeader()).subscribe({
      next: (data: number)=>{
        this.isAddCustomerSubject.next(data)
        this.getAllCustomers().subscribe({
          next : (data: Customers[])=>
          {
            this.isAddCustSubject.next(data)
          }
        })
      }
    })
  }

  CreateSite(site: Site)
  {
    return this._httpClient.post<number>(environment.baseAdres + 'customer/addSite/', JSON.stringify(site),this.JsonHeader())
  }

  DeleteSite(id: number)
  {
    return this._httpClient.delete(environment.baseAdres+'customer/deleteSite/'+id)
  }

  DeleteContact(id: number)
  {
    return this._httpClient.delete(environment.baseAdres+'customer/deleteContact/'+id)
  }

  AddContactCreateSite(contact: ContactPerson)
  {
    return this._httpClient.post<Customers[]>(environment.baseAdres + 'customer/addContact/',contact).subscribe({
      next :(data: Customers[])=>{
        this.isAddCustSubject.next(data);
      }
    })
  }
}
