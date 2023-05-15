import { Component, Output, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  connected : boolean = this._AuthSercice.isConnected

  constructor(public _AuthSercice : AuthService){}

  ngOnInit(): void {
    if(this.connected)
    {
      this._AuthSercice.redirectTo()
    }
  }

  loggedIn()
  {
    this.connected = this._AuthSercice.isConnected
  }

  title = 'Protect group';


}
