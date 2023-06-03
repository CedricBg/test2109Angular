import { AuthService } from './../../../../services/auth.service';
import { Component, OnInit,Inject, Output, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.scss'],
    standalone: true,
    imports: [MatIconModule]
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
