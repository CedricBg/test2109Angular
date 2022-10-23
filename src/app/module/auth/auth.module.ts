import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { AddloginComponent } from './components/addlogin/addlogin.component';
import { RegisterComponent } from './components/register/register.component';


@NgModule({
  declarations: [
    AuthComponent,
    AddloginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
