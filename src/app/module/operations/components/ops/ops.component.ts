import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-ops',
  templateUrl: './ops.component.html',
  styleUrls: ['./ops.component.scss']
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
    this._Router.navigateByUrl('OPS/employee');
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
