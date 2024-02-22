import { SpinnerService } from './../../../../services/spinner.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Component, OnInit,Inject  } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { BehaviorSubject } from 'rxjs';



@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    standalone: true,
    imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule,MatIconModule, ],
})
export class LoginComponent implements OnInit {
  description:string;


  constructor(private _builder : FormBuilder, private _authService : AuthService, private _spinnerService : SpinnerService,  public dialogRef: MatDialogRef<LoginComponent>)
  {}

  formLogin : FormGroup


  ngOnInit(): void
  {
    this.initform()
  }

  CloseDialogBox(): void {
  this.dialogRef.close();
  }

  initform()
  {
    this.formLogin = this._builder.group({
      login :['',Validators.required],
      password : ['', Validators.required]
    })
  }

  Login()
  {
    if(this.formLogin.valid)
    {
    this._spinnerService.spinner.next(true);
    this._authService.Login(this.formLogin.value)
    this.CloseDialogBox()
    }
  }

}
