import { DetailedEmployee } from './../../../../models/DetailedEmployee.models';
import { Component,EventEmitter,Inject,  OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Countrys } from 'src/app/models/countrys.models';
import { AddressService } from 'src/app/services/address.service';
import { EmployeeService } from 'src/app/services/employee.service';


@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})

export class AddEmployeeComponent implements OnInit {
  listCountrys : Countrys[]
  formEmployee! : FormGroup
  SelectedEmployee : DetailedEmployee
  constructor(private _serviceEmployee : EmployeeService, private _builder : FormBuilder,private _AddressService : AddressService)
   {}
    ngOnInit(): void {
      this.GetListCountrys()
      this.SendInformationForm()
      this.AddPhone()
      this.AddEmail()
    }
  SendInformationForm()
  {
    this.formEmployee =  this._builder.group({
      firstName : ['',Validators.required],
      surName : ['',Validators.required],
      birthDate : ['',Validators.required],
      securityCard : [''],
      employeeCardNumber : [''],
      registreNational : ['',Validators.required],
      address : ['',Validators.required],
      actif : [''],
      vehicle : [''],
      sreetAddress : [''],
      city : [''],
      state : [''],
      stateId : [''],
      zipCode : [''],
      emails : this._builder.array([]),
      phones : this._builder.array([]),
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
   get  emails(): FormArray
  {
     return  this.formEmployee.get("emails") as  FormArray
  }

  get phones(): FormArray
  {
    return this.formEmployee.controls["phones"] as FormArray
  }
  AddEmail()
  {
    const emailForm = new FormControl('', [Validators.required, Validators.email])
    this.emails.push(emailForm)
  }
  AddPhone()
  {
    const phoneform = this._builder.group({
      number:['',[Validators.required,Validators.minLength(10)]]
    })
    this.phones.push(phoneform)
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

