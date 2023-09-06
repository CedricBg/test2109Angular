import { _DisposeViewRepeaterStrategy } from '@angular/cdk/collections';
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AddRegisterForm } from 'src/app/models/customer/AddRegisterForm.modes';
import { AuthService } from 'src/app/services/auth.service';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
    selector: 'app-addlogin',
    templateUrl: './addlogin.component.html',
    styleUrls: ['./addlogin.component.scss'],
    standalone: true,
    imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule]
})
export class AddloginComponent implements OnInit {

  idEmployee!: number
  constructor(private _auth : AuthService, private _builder : FormBuilder, private dialogRef: MatDialogRef<AddloginComponent>,
    @Inject(MAT_DIALOG_DATA) data: number) {
      this.idEmployee = data
    }

  public formLogin: FormGroup
  ngOnInit(): void {
    this.FormLogin()
  }

  FormLogin()
  {
    this.formLogin = this._builder.group({
      login: ['',[Validators.required,Validators.minLength(5)]],
      password: ['',[Validators.required,Validators.minLength(8)]]
    })
  }

  get formLogi()
  {
    return this.formLogin.controls
  }

  sendform()
  {
    if(this.formLogin.valid)
    {
      const form: AddRegisterForm = this.formLogin.value
      form.id = this.idEmployee
      this._auth.AddLogin(form)
      this.dialogRef.close();
    }
  }
}
