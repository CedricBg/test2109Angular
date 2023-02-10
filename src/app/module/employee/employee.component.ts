import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  constructor(private _Router : Router ) { }

  name! : string
  linkOk : boolean = true

  connectedSubject : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.linkOk)
  emitSubject()
  {
    this.connectedSubject.next(this.linkOk)
  }
  ngOnInit(): void {
    this.name = sessionStorage.getItem('firstName')
  }


  AllEmp()
  {
    this.linkOk = false
    this.emitSubject()
    console.log(this.connectedSubject)
    this._Router.navigateByUrl('employee/employee/AllEmployees')

  }
}
