import { Site } from './../models/customer/site.models';
import { Observable } from 'rxjs';
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

  GetAll(): Observable<Customers[]>
  {
    return this._httpClient.get<Customers[]>(environment.baseAdres +'customer/')
  }

  GetOne(id: number): Observable<Site>
  {
    return this._httpClient.get<Site>(environment.baseAdres+'customer/'+id)
  }
  UpdateUser(client: Customers)
  {
    return this._httpClient.put<Customers>(environment.baseAdres +'customer/', client)
  }
}
