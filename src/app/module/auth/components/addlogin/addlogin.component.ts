import { _DisposeViewRepeaterStrategy } from '@angular/cdk/collections';
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
import { AddRegisterForm } from 'src/app/models/customer/AddRegisterForm.modes';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-addlogin',
  templateUrl: './addlogin.component.html',
  styleUrls: ['./addlogin.component.scss']
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
    }
  }
}
