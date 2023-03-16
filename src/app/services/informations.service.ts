import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Role } from '../models/Role.models';
import { Language } from '../models/language.models';

@Injectable({
  providedIn: 'root'
})
export class InformationsService {

  constructor(private _HttpClient : HttpClient) { }

  GetRoles() : Observable<Role[]>
  {
    return this._HttpClient.get<Role[]>(environment.baseAdres+ 'information/Role')
  }

  GetLanguages(): Observable<Language[]>
  {
    return this._HttpClient.get<Language[]>(environment.baseAdres+'information/Language')
  }
}
