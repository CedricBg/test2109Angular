import { Employee } from './../../../../models/Employee.models';
import { EmployeeService } from './../../../../services/employee.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})

export class AddEmployeeComponent implements OnInit {

  EmployeeForm : FormGroup

  constructor(@Inject(EmployeeService) private _serviceEmployee : EmployeeService, private _builder : FormBuilder) { }

  ngOnInit(): void {
    this.EmployeeForm = this._builder.group({
      firstName : ['',Validators.required],
      surName : ['',Validators.required],
      birthDate : ['',Validators.required],
      actif : [true,Validators.required],
      vehicle : [true,Validators.required],
      securityCard : ['', Validators.required],
      entryService: ['',Validators.required],
      employeeCardNumber : ['',Validators.required],
      registreNational : ['',Validators.required]
    })
  }


  AddEmployee()
  {
    console.log(this.EmployeeForm.value['birthDate'])
    console.log(this.EmployeeForm.value)
    this._serviceEmployee.insert(this.EmployeeForm.value)
  }

}
