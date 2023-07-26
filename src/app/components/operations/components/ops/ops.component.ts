import { Router, RouterOutlet } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MatIconModule } from '@angular/material/icon';
import { NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-ops',
    templateUrl: './ops.component.html',
    styleUrls: ['./ops.component.scss'],
    standalone: true,
    imports: [NgIf, MatIconModule, RouterOutlet , MatButtonModule]
})
export class OpsComponent implements OnInit {
  connected!: Boolean;
  constructor(private _Router : Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.connected = this.authService.isConnected;
  }

  Agent()
  {
    this._Router.navigateByUrl('OPS/agent/admin');
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
  }
}
