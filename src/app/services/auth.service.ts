
import { User } from './../models/user.models';
import { Login } from './../models/login.models';
import { environment } from './../../environments/environment';
import { AddLogin } from './../models/AddLogin.models';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig, } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _httpClient : HttpClient, private _router : Router, public dialog : MatDialog) { }

  private _isConnected : boolean
  get isConnected() : boolean
  {
    return sessionStorage.getItem('token') != null ? true : false
  }

  connectedSubject : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.isConnected)

  emitSubject()
  {
    this.connectedSubject.next(this.isConnected)
  }

  returnData! : User
  AddLogin(form : AddLogin)
  {

    this._httpClient.post<string>(environment.baseAdres+ 'Auth/AddLogin', form).subscribe()
  }


  Login(userin : Login)
  {
    return this._httpClient.post<User>(environment.baseAdres+ 'Auth/login', userin).subscribe({
      next : (data : User)=> {
        this.returnData = data
        if(this.returnData != null)
        {
          sessionStorage.setItem('token' , this.returnData.token)
          sessionStorage.setItem('firstName' , this.returnData.firstName)
          sessionStorage.setItem('surName', this.returnData.surName)
          sessionStorage.setItem('id', this.returnData.id.toString())
          sessionStorage.setItem('dimin', this.returnData.dimin)
          this.emitSubject()
          this.redirectTo()
        }
      }
    })
  }

  redirectTo()
  {
    const user = sessionStorage.getItem('dimin')
    if(user == "SB")
    {
      this._router.navigate(["agent"])
    }
    else
    {
      this._router.navigate([user])
    }
  }

  Logout()
  {
    sessionStorage.clear();
    this.emitSubject()
    this._router.navigate(["./"])
  }


}
