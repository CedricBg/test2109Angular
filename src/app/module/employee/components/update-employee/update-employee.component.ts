import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Countrys } from 'src/app/models/countrys.models';
import { DetailedEmployee } from 'src/app/models/DetailedEmployee.models';
import { Employee } from 'src/app/models/employee.models';
import { AddressService } from 'src/app/services/address.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.scss']
})
export class UpdateEmployeeComponent implements OnInit {
  firstName: any
  listEmployee : Employee[]
  SelectedEmployee! : DetailedEmployee
  formEmployee! : FormGroup
  idToModify!: number
  listCountrys : Countrys[]
  idEmployee : number

  constructor(private _serviceEmployee : EmployeeService, private _builder : FormBuilder,private _AddressService : AddressService,
    private dialogRef: MatDialogRef<UpdateEmployeeComponent>,
    @Inject(MAT_DIALOG_DATA) data: number
    ){
      this.idEmployee = data
    }
  ngOnInit(): void {
    this.GetListCountrys()

    this.GetOne(this.idEmployee)
  }
  async SendInformationForm()
  {
    this.formEmployee = await this._builder.group({
      firstName : [this.SelectedEmployee.firstName,Validators.required],
      surName : [this.SelectedEmployee.surName,Validators.required],
      birthDate : [this.SelectedEmployee.birthDate,Validators.required],
      securityCard : [this.SelectedEmployee.securityCard,Validators.required],
      employeeCardNumber : [this.SelectedEmployee.employeeCardNumber,Validators.required],
      registreNational : [this.SelectedEmployee.registreNational,Validators.required],
      address : [this.SelectedEmployee.address,Validators.required],

      vehicle : [this.SelectedEmployee.vehicle],
      sreetAddress : [this.SelectedEmployee.address ? this.SelectedEmployee.address.sreetAddress :''],
      city : [this.SelectedEmployee.address ? this.SelectedEmployee.address.city :''],
      state : [this.SelectedEmployee.address ? this.SelectedEmployee.address.state :''],
      stateId : [this.SelectedEmployee.address ? this.SelectedEmployee.address.id :''],
      zipCode : [this.SelectedEmployee.address ? this.SelectedEmployee.address.zipCode :''],
      emails : this._builder.array([]),
      phones : this._builder.array([]),
    })
    this.SelectedEmployee.email.forEach(e=>{
      let newcontrol = this.newEmail()
      newcontrol.patchValue(e)
      this.emails.push(newcontrol)
    })
    this.SelectedEmployee.phone.forEach(e=>{
      let newcontrol = this.newPhone()
      newcontrol.patchValue(e)
      this.phones.push(newcontrol)
    })
  }

  GetListCountrys()
  {
    this._AddressService.GetAllCountrys().subscribe({
      next :  (data: Countrys[]) =>{
          this.listCountrys =  data
      }
    })
  }
  GetOne(id: number)
  {
    this._serviceEmployee.getOne(id).subscribe({
        next : ( data : DetailedEmployee)  => {
        this.SelectedEmployee =  data
        this.SendInformationForm()
      }
    })
  }
  get emails(): FormArray
  {
    return this.formEmployee.get("emails") as FormArray
  }

  get phones(): FormArray
  {
    return this.formEmployee.controls["phones"] as FormArray
  }
  newEmail(): FormGroup
  {
    return this._builder.group({
      id:[{value:'', disabled: true}],
      emailAddress : ['',Validators.required]
    })
  }
  newPhone(): FormGroup
  {
    return this._builder.group({
      id:[{value:'', disabled: true}],
      number: ['',Validators.required]
    })
  }
  AddEmail()
  {
    this.emails.push(this.newEmail())
  }
  AddPhone()
  {
    this.phones.push(this.newPhone())
  }
  DeleteEmails(id: number)
  {
    this.emails.removeAt(id)
  }
  DeletePhones(id: number)
  {
    this.phones.removeAt(id)
  }
}
