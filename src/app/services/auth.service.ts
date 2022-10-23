import { environment } from './../../environments/environment';
import { AddLogin } from './../models/AddLogin.models';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _httpClient : HttpClient) { }

  AddLogin(form : AddLogin)
  {
    this._httpClient.post<string>(environment.baseAdres+ 'Employee/AddLogin', form).subscribe()
  }
}
