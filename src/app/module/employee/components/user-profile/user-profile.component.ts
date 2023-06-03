import { AuthService } from './../../../../services/auth.service';
import { Component, OnInit,Inject, Output, EventEmitter } from '@angular/core';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  name! : string;

  constructor(private _authService : AuthService, public dialogRef: MatDialogRef<UserProfileComponent>,
    @Inject(MAT_DIALOG_DATA) data) { }

  ngOnInit(): void {
    this.name = sessionStorage.getItem('surName');
  }

  CLosedDialogBox()
  {
    this.dialogRef.close();
  }

  Logout(): void {
    this._authService.Logout();
    this.CLosedDialogBox();
  }
}
