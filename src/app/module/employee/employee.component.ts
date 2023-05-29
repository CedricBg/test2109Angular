
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  constructor( ) { }

  name! : string

  ngOnInit(): void {
    this.name = sessionStorage.getItem('surName')
  }
}
