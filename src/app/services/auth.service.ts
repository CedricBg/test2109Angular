import { UserLogin } from './../models/userlogin.models';
import { Login } from './../models/login.models';
import { LoginComponent } from './../module/auth/components/login/login.component';
import { environment } from './../../environments/environment';
import { AddLogin } from './../models/AddLogin.models';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _httpClient : HttpClient, public dialog : MatDialog) { }
  returnData! : string
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

  Login(user : Login)
  {
    return this._httpClient.post<string>(environment.baseAdres+ 'Auth/login', user).subscribe({
      next : (data : string)=> {
        this.returnData = data

      }
    })
  }
}
