import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ops',
  templateUrl: './ops.component.html',
  styleUrls: ['./ops.component.scss']
})
export class OpsComponent implements OnInit {

  constructor(private _Router : Router) { }

  ngOnInit(): void {
  }
  AllEmp()
  {
    this._Router.navigateByUrl('OPS/employee/AllEmployees')
  }
  Customers()
  {
    this._Router.navigateByUrl('OPS/customer/listcustomer')
  }
  Rondes()
  {
    this._Router.navigateByUrl('OPS/ronde')
  }

}
