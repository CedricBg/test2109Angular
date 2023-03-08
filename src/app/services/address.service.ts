import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Countrys } from '../models/countrys.models';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private _http : HttpClient) { }

GetAllCountrys(): Observable<Countrys[]>
  {
    return this._http.get<Countrys[]>(environment.baseAdres+ 'address/allCountrys')
  }
}


