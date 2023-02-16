import { AuthService } from './../../../../services/auth.service';
import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  constructor(private _authService : AuthService, public dialogRef: MatDialogRef<UserProfileComponent>,
    @Inject(MAT_DIALOG_DATA) data) { }
  name! : string
  ngOnInit(): void {
    this.name = sessionStorage.getItem('firstName')
  }


  CLosedDialogBox()
  {
    this.dialogRef.close()
  }

  Logout(): void {
    this._authService.Logout()
    this.CLosedDialogBox()
  }
}