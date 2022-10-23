import { AddloginComponent } from './components/addlogin/addlogin.component';
import { AddLogin } from './../../models/AddLogin.models';
import { AuthComponent } from './auth.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  { path : '', component : AuthComponent , children :
  [ { path : 'AddLogin' ,component : AddloginComponent},
    { path : 'register' , component : RegisterComponent} ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
