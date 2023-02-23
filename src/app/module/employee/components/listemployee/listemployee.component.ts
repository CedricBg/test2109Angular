import { Phone } from './../../../../models/phone.models';

import { DetailedEmployee } from './../../../../models/DetailedEmployee.models';
import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/models/employee.models';
import { EmployeeService } from 'src/app/services/employee.service';





@Component({
  selector: 'app-listemployee',
  templateUrl: './listemployee.component.html',
  styleUrls: ['./listemployee.component.scss']
})
export class ListemployeeComponent implements OnInit {
  firstName: any
  listEmployee : Employee[]
  disabledForm :boolean = true
  SelectedEmployee! : DetailedEmployee
  select : boolean = false


  ngModelChange()
  {
    if(this.firstName == "")
    {
      this.ngOnInit()
    }
    else{
      this.listEmployee = this.listEmployee.filter(res=>{
        return res.firstName.toLocaleLowerCase().match(this.firstName.toLocaleLowerCase())
      })
    }
  }


  displayedColumns: string[] = ['surName', 'firstName','id'];
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

  GetOne(id: number)
  {
    this.select = true
    this._serviceEmployee.getOne(id).subscribe({
      next : (data : DetailedEmployee) => {
        this.SelectedEmployee = data
      }
    })
  }
}
