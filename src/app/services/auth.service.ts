
import { User } from './../models/user.models';
import { Login } from './../models/login.models';
import { LoginComponent } from './../module/auth/components/login/login.component';
import { environment } from './../../environments/environment';
import { AddLogin } from './../models/AddLogin.models';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

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

  constructor(private _httpClient : HttpClient, private _router : Router, public dialog : MatDialog) { }
  returnData! : User
  AddLogin(form : AddLogin)
  {
    this._httpClient.post<string>(environment.baseAdres+ 'Employee/AddLogin', form).subscribe()
  }

  OpenDialog()
  {
    const diallogConfig = new MatDialogConfig;
    diallogConfig.disableClose = false;
    diallogConfig.position = {right:'10px', top:'10px'};
    diallogConfig.autoFocus = true;
    diallogConfig.height = '200px';
    diallogConfig.width = '400px';

    const dialogRef = this.dialog.open(LoginComponent,diallogConfig);

  }


  Login(userin : Login)
  {
    return this._httpClient.post<User>(environment.baseAdres+ 'Auth/login', userin).subscribe({
      next : (data : User)=> {
        this.returnData = data
        console.log(this.returnData)
        if(this.returnData != null)
        {
          sessionStorage.setItem('token' , this.returnData.token)
          sessionStorage.setItem('firstName' , this.returnData.firstName)
          sessionStorage.setItem('surMame', this.returnData.surName)
          sessionStorage.setItem('id', this.returnData.id.toString())
          sessionStorage.setItem('role', this.returnData.role)
          this.emitSubject()
          this._router.navigate(["employee"])
        }
      }
    })
  }

  Logout()
  {
    sessionStorage.clear();
    this.emitSubject()
    this._router.navigate(["./"])
  }


}
