import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/models/Employee.models';
import { EmployeeService } from 'src/app/services/employee.service';


@Component({
  selector: 'app-listemployee',
  templateUrl: './listemployee.component.html',
  styleUrls: ['./listemployee.component.scss']
})
export class ListemployeeComponent implements OnInit {
  listEmployee! : Employee[]
  constructor(private _serviceEmployee : EmployeeService) { }

  ngOnInit(): void {
    this.GetEmployee()
  }

  GetEmployee()
  {
    this._serviceEmployee.get().subscribe({
      next : async (data : Employee[])=>{
        this.listEmployee = data
      }
    })
  }
}
