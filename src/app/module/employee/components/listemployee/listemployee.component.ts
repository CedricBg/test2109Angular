import { Component, OnInit } from '@angular/core';
import { DetailedEmployee } from 'src/app/models/DetailedEmployee.models';
import { Employee } from 'src/app/models/employee.models';
import { EmployeeService } from 'src/app/services/employee.service';


@Component({
  selector: 'app-listemployee',
  templateUrl: './listemployee.component.html',
  styleUrls: ['./listemployee.component.scss']
})
export class ListemployeeComponent implements OnInit {
  listEmployee! : Employee[]
  employee! : DetailedEmployee
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
  GetOne(id : number)
  {

    this._serviceEmployee.getOne(id).subscribe({
      next : async (data : DetailedEmployee)=>
      {
          this.employee = data
          console.log(data)
      }
    })
  }
}
