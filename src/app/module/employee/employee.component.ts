import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  constructor(private _Router : Router ) { }

  name! : string
  ngOnInit(): void {
    this.name = sessionStorage.getItem('firstName')
  }


  AllEmp()
  {
    this._Router.navigate(['/addEmployee'])
  }
}
