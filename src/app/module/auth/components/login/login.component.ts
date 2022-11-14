import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private _builder : FormBuilder, private _authService : AuthService) { }
  formLogin : FormGroup

  ngOnInit(): void
  {

    this.initform()
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
    this._authService.Login(this.formLogin.value)
  }

}
