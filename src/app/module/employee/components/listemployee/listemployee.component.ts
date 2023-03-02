import { UpdateEmployeeComponent } from './../update-employee/update-employee.component';
import { DetailedEmployee } from 'src/app/models/DetailedEmployee.models';
import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employee } from 'src/app/models/employee.models';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';


@Component({
  selector: 'app-listemployee',
  templateUrl: './listemployee.component.html',
  styleUrls: ['./listemployee.component.scss']
})
export class ListemployeeComponent implements OnInit {
surName: any
  listEmployee : Employee[]
  SelectedEmployee! : DetailedEmployee
  select : boolean = false
  pageEvent: PageEvent


  displayedColumns: string[] = ['surName', 'firstName','id'];

  constructor(private _serviceEmployee : EmployeeService, public dialog : MatDialog) { }


  ngOnInit(): void {
    this.GetEmployee()

  }

  async GetEmployee()
  {
    this._serviceEmployee.get().subscribe({
      next : async (data : Employee[])=>{
        this.listEmployee =  data
      }
    })
  }

  GetOne(id: number)
  {
    this.select = true
    this._serviceEmployee.getOne(id).subscribe({
        next : ( data : DetailedEmployee)  => {
        this.SelectedEmployee =  data
      }
    })
  }

  ngModelChange()

  {
    if(this.surName == "")
    {
      this.ngOnInit()
    }
    else{
      this.listEmployee = this.listEmployee.filter(res=>{
        return res.surName.toLocaleLowerCase().match(this.surName.toLocaleLowerCase())
      })
    }
  }
  OpenformUpdate(id: number)
  {
    const diallogConfig = new MatDialogConfig;
    diallogConfig.data = id
    diallogConfig.disableClose = false;
    diallogConfig.autoFocus = true;
    const dialogRef = this.dialog.open(UpdateEmployeeComponent,diallogConfig);
  }
  OpenformAddUser()
  {
    const diallogConfig = new MatDialogConfig;
    diallogConfig.disableClose = false;
    diallogConfig.autoFocus = true;
    const dialogRef = this.dialog.open(AddEmployeeComponent,diallogConfig);
  }
}
