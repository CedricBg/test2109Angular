import { Site } from './../models/customer/site.models';
import { Observable, Subject } from 'rxjs';
import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Customers } from '../models/customer/customers.models';
import { ContactPerson } from '../models/customer/ContactPerson.models';



@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private _httpClient : HttpClient, private _route : Router) { }
  private isUpdatedSubject: Subject<Site> = new Subject<Site>()


  Delete(id: number)
  {
    console.log(id)
    return this._httpClient.put<string>(environment.baseAdres +'customer/delete/'+id, JSON.stringify(id), this.JsonHeader())
  }

  getUpdateData()
  {
    return this.isUpdatedSubject.asObservable();
  }

  GetAll()
  {
    return  this._httpClient.get<Customers[]>(environment.baseAdres +'customer/')
  }

  GetOne(id: number): Observable<Site>
  {
    return this._httpClient.get<Site>(environment.baseAdres+'customer/site/'+id)
  }

  UpdateUser(client: Site)
  {
    this._httpClient.put<Site>(environment.baseAdres +'customer/site', client).subscribe({
      next: (data: Site) =>{
        this.isUpdatedSubject.next(data)
      }
    })
  }

  CreateCompany(customer: string){
    return this._httpClient.post<number>(environment.baseAdres +'customer/addCustomer/', JSON.stringify(customer), this.JsonHeader())
  }

  private JsonHeader()
  {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return httpOptions
  }

  CreateSite(site: Site)
  {
    return this._httpClient.post<number>(environment.baseAdres + 'customer/addSite/', JSON.stringify(site),this.JsonHeader())
  }

  AddContactCreateSite(contact: ContactPerson)
  {
    console.log(contact)
    return this._httpClient.post<number>(environment.baseAdres + 'customer/addContact/',contact).subscribe({
      next :(data: number)=>{
        console.log(data)
      }
    })
  }
}
