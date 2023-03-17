import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UserProfileComponent } from 'src/app/module/employee/components/user-profile/user-profile.component';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
 isConnected : boolean
 name! : string
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
    this._authService.OpenDialog();
  }

  AllEmp()
  {
    this._Router.navigateByUrl('employee/employee/AllEmployees')
  }
  Customers()
  {
    this._Router.navigateByUrl('customer/listcustomer')
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
