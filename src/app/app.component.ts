import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { RouterOutlet } from '@angular/router';
import { NgIf } from '@angular/common';
import { NavComponent } from './components/nav/nav.component';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: true,
    imports: [NavComponent, NgIf, RouterOutlet]
})
export class AppComponent implements OnInit {

  connected : boolean = this._AuthService.isConnected

  constructor(public _AuthService : AuthService){}

  ngOnInit(): void {
    if(this.connected)
    {
      this._AuthService.redirectTo()
    }
  }

  loggedIn()
  {
    this.connected = this._AuthService.isConnected
  }

  title = 'Protect group';


}
