import { AddloginComponent } from './components/addlogin/addlogin.component';
import { AuthComponent } from './auth.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';



@NgModule({

  exports: [RouterModule]
})
export class AuthRoutingModule { }
