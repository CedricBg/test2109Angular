import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatProgressSpinnerModule, ProgressSpinnerMode} from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { NgIf, TitleCasePipe } from '@angular/common';
import { UserProfileComponent } from '../employee/components/user-profile/user-profile.component';
import { LoginComponent } from '../auth/components/login/login.component';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { SpinnerService } from 'src/app/services/spinner.service';
import { ThemePalette } from '@angular/material/core';

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.scss'],
    standalone: true,
    imports: [NgIf, TitleCasePipe,MatProgressSpinnerModule,MatIconModule,CommonModule, MatProgressSpinnerModule]
})
export class NavComponent implements OnInit {
  load:boolean = false;

  isConnected : boolean;

  name! : string;
  title: string = 'Shield Connect';
  constructor( private _authService : AuthService,  public _spinnerService: SpinnerService, public dialog : MatDialog,private _Router : Router )
  {  }

  ngOnInit(): void
  {

    this._spinnerService.spinner.subscribe((data : boolean) => this.load = data)
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
    diallogConfig.position = {right:'2vw', top:'55px'};
    diallogConfig.autoFocus = true;
    diallogConfig.height = '250px';
    diallogConfig.width = '300px';
    const dialogRef = this.dialog.open(LoginComponent,diallogConfig);


  }

  OpenDialog()
  {
    const diallogConfig = new MatDialogConfig;
    diallogConfig.disableClose = false;
    diallogConfig.position = {right:'2vw', top:'55px'};
    diallogConfig.autoFocus = true;
    diallogConfig.height = '100px';
    diallogConfig.width = '200px';
    const dialogRef = this.dialog.open(UserProfileComponent,diallogConfig);
  }

}
