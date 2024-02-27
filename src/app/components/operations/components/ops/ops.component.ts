import { Router, RouterOutlet } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MatIconModule } from '@angular/material/icon';
import { NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
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
    this.subscriptions.push(this.authService.connectedSubject.subscribe((connected: boolean) => {
      this.connected = connected;
    }));
    this._spinnerService.setActive(false);
  }

  Agent()
  {
    if(this._Router.url != '/OPS/agent/admin' && !(this._Router.url.startsWith('/OPS/agent/admin'))){
    this._spinnerService.setActive(true);
    }

    this._Router.navigateByUrl('OPS/agent/admin');
  }

  Rondes(chemin: string)
  {
    if(this._Router.url != '/OPS/ronde/'+chemin && this._Router.url != ('/OPS/ronde') && !(this._Router.url.startsWith('/OPS/ronde'))){
      this._spinnerService.setActive(true);
    }
    if(!(chemin == ""))
    {
      this._Router.navigateByUrl('OPS/ronde/'+chemin);
    }
    else{
      this._Router.navigateByUrl('OPS/ronde');
    }

  }

  AllEmp(chemin: string)
  {
    if(this._Router.url != '/OPS/employee/'+chemin && this._Router.url !='employee'){

      this._spinnerService.setActive(true);
    }
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
    if(this._Router.url != '/OPS/customer/listcustomer'){
      this._spinnerService.setActive(true);
    }
  }


  ngOnDestroy(){
    this.subscriptions.forEach(subscription  => {
      subscription.unsubscribe();
    });
  }
}
