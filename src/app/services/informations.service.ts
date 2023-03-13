import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Role } from '../models/Role.models';

@Injectable({
  providedIn: 'root'
})
export class InformationsService {

  constructor(private _HttpClient : HttpClient) { }

  GetRoles() : Observable<Role[]>
  {
    return this._HttpClient.get<Role[]>(environment.baseAdres+ 'information/AllRole')
  }
}
