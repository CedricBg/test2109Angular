import { Site } from './../models/customer/site.models';
import { Observable, Subject } from 'rxjs';
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
  private isUpdatedSubject: Subject<Site> = new Subject<Site>()

  GetAll()
  {
    return this._httpClient.get<Customers[]>(environment.baseAdres +'customer/')

  }
  getUpdateData()
  {
    return this.isUpdatedSubject.asObservable();
  }


  GetOne(id: number): Observable<Site>
  {
    return this._httpClient.get<Site>(environment.baseAdres+'customer/site/'+id)
  }
  UpdateUser(client: Site)
  {
    return this._httpClient.put<Site>(environment.baseAdres +'customer/site', client).subscribe({
      next: (data: Site) =>{
        this.isUpdatedSubject.next(data)
      }
    })
  }
}
