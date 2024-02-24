import { Router, RouterOutlet } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MatIconModule } from '@angular/material/icon';
import { NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { ThemePalette } from '@angular/material/core';
import { SpinnerService } from 'src/app/services/spinner.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-ops',
    templateUrl: './ops.component.html',
    styleUrls: ['./ops.component.scss'],
    standalone: true,
    imports: [NgIf, MatIconModule, RouterOutlet , MatButtonModule, MatMenuModule]
})
export class OpsComponent implements OnInit {
  connected!: Boolean;
  private subscriptions: Subscription[] = [];

  constructor(private _Router : Router, public _spinnerService: SpinnerService, private authService: AuthService) { }

  ngOnInit(): void {
    this.connected = this.authService.isConnected;
    this._spinnerService.spinner.next(false);
  }

  Agent()
  {
    this._Router.navigateByUrl('OPS/agent/admin');
    this._spinnerService.spinner.next(true);

  }

  AllEmp(chemin: string)
  {
    if(!(chemin == ""))
    {
    this._Router.navigateByUrl('OPS/employee/'+chemin);
    }
    else{
    this._Router.navigateByUrl('employee');
    }
  }
  Customers(chemin: string)
  {
    this._Router.navigateByUrl('OPS/customer/listcustomer');
    this._spinnerService.spinner.next(true);
  }

  Rondes(chemin: string)
  {
    if(!(chemin == ""))
    {
      this._Router.navigateByUrl('OPS/ronde/'+chemin);
    }
    else{
      this._Router.navigateByUrl('OPS/ronde');
    }
    this._spinnerService.spinner.next(true);
  }
  ngOnDestroy(){
    this.subscriptions.forEach(subscription  => {
      subscription.unsubscribe();
    });
  }
}
