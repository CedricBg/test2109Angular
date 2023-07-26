import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { Router } from '@angular/router';
import { NgIf, TitleCasePipe } from '@angular/common';
import { UserProfileComponent } from '../employee/components/user-profile/user-profile.component';
import { LoginComponent } from '../auth/components/login/login.component';

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.scss'],
    standalone: true,
    imports: [NgIf, TitleCasePipe]
})
export class NavComponent implements OnInit {
 isConnected : boolean
 name! : string
 title: string = 'Protect group'
  constructor( private _authService : AuthService,public dialog : MatDialog,private _Router : Router )
  {  }

  ngOnInit(): void
  {
    this._authService.connectedSubject.subscribe
    ({
      next : (data : boolean) => {
        this.isConnected = data
        this.name = sessionStorage.getItem('firstName')
      }
    })
  }

  Login()
  {

    const diallogConfig = new MatDialogConfig;
    diallogConfig.disableClose = false;
    diallogConfig.position = {right:'10px', top:'10px'};
    diallogConfig.autoFocus = true;
    diallogConfig.height = '250px';
    diallogConfig.width = '300px';
    const dialogRef = this.dialog.open(LoginComponent,diallogConfig);
  }

  OpenDialog()
  {
    const diallogConfig = new MatDialogConfig;
    diallogConfig.disableClose = false;
    diallogConfig.position = {right:'10px', top:'10px'};
    diallogConfig.autoFocus = true;
    diallogConfig.height = '200px';
    diallogConfig.width = '400px';
    const dialogRef = this.dialog.open(UserProfileComponent,diallogConfig);
  }
}
