import { Observable } from 'rxjs';
import { CustomerAll } from './../models/customer/customerAll.models';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Customers } from '../models/customer/customers.models';



@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private _httpClient : HttpClient, private _route : Router) { }

  GetAll(): Observable<CustomerAll[]>
  {
    return this._httpClient.get<CustomerAll[]>(environment.baseAdres +'customer/')
  }

  GetOne(id: number): Observable<Customers>
  {
    return this._httpClient.get<Customers>(environment.baseAdres+'customer/'+id)
  }
  UpdateUser(client: Customers)
  {
    return this._httpClient.put<Customers>(environment.baseAdres +'customer/', client)
  }
}
