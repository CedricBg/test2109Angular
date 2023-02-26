import { Email } from './../../../../models/email.models';
import { Phone } from 'src/app/models/phone.models';
import { DetailedEmployee } from 'src/app/models/DetailedEmployee.models';
import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { FormGroup,FormArray, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Employee } from 'src/app/models/employee.models';


@Component({
  selector: 'app-listemployee',
  templateUrl: './listemployee.component.html',
  styleUrls: ['./listemployee.component.scss']
})
export class ListemployeeComponent implements OnInit {
  firstName: any
  listEmployee : Employee[]
  SelectedEmployee! : DetailedEmployee
  select : boolean = false
  formEmployee : FormGroup

  displayedColumns: string[] = ['surName', 'firstName','id'];

  constructor(private _serviceEmployee : EmployeeService,private _builder :FormBuilder) { }


  ngOnInit(): void {
    this.GetEmployee()

  }

  SendInformationForm()
  {
    this.formEmployee = this._builder.group({
      firstName : [{value:this.SelectedEmployee.firstName, disabled: true},Validators.required],
      surName : [{value:this.SelectedEmployee.surName, disabled: true},Validators.required],
      birthDate : [{value:this.SelectedEmployee.birthDate, disabled: true},Validators.required],
      securityCard : [{value:this.SelectedEmployee.securityCard, disabled: true},Validators.required],
      entryService : [{value:this.SelectedEmployee.entryService, disabled: true},Validators.required],
      employeeCardNumber : [{value:this.SelectedEmployee.employeeCardNumber, disabled: true},Validators.required],
      registreNational : [{value:this.SelectedEmployee.registreNational, disabled: true},Validators.required],
      address : [{value:this.SelectedEmployee.address, disabled: true},Validators.required],
      actif : [{value:this.SelectedEmployee.actif, disabled: true}],
      vehicle : [{value:this.SelectedEmployee.vehicle, disabled: true}],
      sreetAddress : [{value:this.SelectedEmployee.address ? this.SelectedEmployee.address.sreetAddress :'', disabled: true}],
      city : [{value:this.SelectedEmployee.address? this.SelectedEmployee.address.city :'', disabled: true}],
      state : [{value:this.SelectedEmployee.address? this.SelectedEmployee.address.state :'', disabled: true}],
      zipCode : [{value:this.SelectedEmployee.address? this.SelectedEmployee.address.zipCode :'', disabled: true}],
      emails : this._builder.array([]),
      phones : this._builder.array([]),
    })
    this.SelectedEmployee.emails.forEach(e=>{
      let newcontrol = this.newEmail()
      newcontrol.patchValue(e)
      this.emails.push(newcontrol)
    })
    this.SelectedEmployee.phones.forEach(e=>{
      let newcontrol = this.newPhone()
      newcontrol.patchValue(e)
      this.phones.push(newcontrol)
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
      emailAddress : [{value:'', disabled: true},Validators.required]
    })
  }
  newPhone(): FormGroup
  {
    return this._builder.group({
      id:[{value:'', disabled: true}],
      number: [{value:'', disabled: true},Validators.required]
    })
  }

  AddEmail()
  {
    const emailForm = this._builder.group({
      id : [''],
      emailAddress : ['', [Validators.required, Validators.email]]
    })
    this.emails.push(emailForm)
  }
  AddPhone()
  {
    const phoneform = this._builder.group({
      id:[''],
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
        this.SendInformationForm()

      }
    })
  }
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
}
