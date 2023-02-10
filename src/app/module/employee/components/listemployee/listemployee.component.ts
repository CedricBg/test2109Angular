import { DetailedEmployee } from './../../../../models/DetailedEmployee.models';
import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/models/employee.models';
import { EmployeeService } from 'src/app/services/employee.service';
import { BehaviorSubject } from 'rxjs';


@Component({
  selector: 'app-listemployee',
  templateUrl: './listemployee.component.html',
  styleUrls: ['./listemployee.component.scss']
})
export class ListemployeeComponent implements OnInit {
  listEmployee! : Employee[]
  SelectedEmployee! : DetailedEmployee
  select : boolean = false




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
