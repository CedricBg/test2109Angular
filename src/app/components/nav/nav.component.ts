import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
 isConnected : boolean
  constructor( private _authService : AuthService )
  {  }

  ngOnInit(): void
  {
    this._authService.connectedSubject.subscribe
    ({
      next : (data : boolean) => this.isConnected = data
    })
  }

  Login()
  {
    this._authService.OpenDialog();
  }

  Logout(): void {
    this._authService.Logout();
  }
}
