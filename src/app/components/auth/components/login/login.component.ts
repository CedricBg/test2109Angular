import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Component, OnInit,Inject  } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    standalone: true,
    imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule]
})
export class LoginComponent implements OnInit {
  description:string;


  constructor(private _builder : FormBuilder, private _authService : AuthService, public dialogRef: MatDialogRef<LoginComponent>,
    @Inject(MAT_DIALOG_DATA) data)
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
    this._authService.Login(this.formLogin.value)
    this.CloseDialogBox()
    }
  }

}
