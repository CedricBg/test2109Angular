import { Address } from 'src/app/models/address.models';
import { InformationsService } from 'src/app/services/informations.service';
import { Observable } from 'rxjs';
import { DetailedEmployee } from 'src/app/models/DetailedEmployee.models';
import { Component, OnInit,  } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Countrys } from 'src/app/models/countrys.models';
import { AddressService } from 'src/app/services/address.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { Role } from 'src/app/models/Role.models';
;



@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})

export class AddEmployeeComponent implements OnInit {
  listCountrys : Countrys[]
  listRoles: Role[] = []
  formEmployee! : FormGroup
  adress! : FormGroup

  constructor(private _serviceEmployee : EmployeeService, private _builder : FormBuilder,private _AddressService : AddressService, private _InformationService : InformationsService)
   {

   }
    ngOnInit(): void {
      this.GetListRoles()
      this.GetListCountrys()
      this.SendInformationForm()
    }

  SubmitForm()
  {
      this._serviceEmployee.getSectedCountry(this.listCountrys, this.formEmployee)
      this._serviceEmployee.getSelectedRole(this.listRoles, this.formEmployee)
      this._serviceEmployee.insert(this.formEmployee.value)
  }
   SendInformationForm()
  {
    this.formEmployee =  this._builder.group({
      firstName : ['',Validators.required],
      surName : ['',Validators.required],
      birthDate : ['',Validators.required],
      registreNational : ['',Validators.required],
      vehicle : [true],
      IsDeleted : [false],
      email : this._builder.array([
        this._builder.group({
          emailAddress : ['',Validators.required],
        })
      ]),
      phone : this._builder.array([
        this._builder.group({
          number: ['',Validators.required],
        })
      ]),
      address : this._builder.group({
      sreetAddress : [''],
      city : [''],
      state : ['Belgium'],
      zipCode : [''],}),

      role : this._builder.group({
        name : ['Agent statique'],
        diminName : [''],
        roleId : ['']
      }),
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
  GetListRoles()
  {
    this._InformationService.GetRoles().subscribe({
      next:  (data : Role[])=> {
          this.listRoles =  data

      }
    })
  }
   get email(): FormArray
  {
     return  this.formEmployee.get("email") as  FormArray
  }


  newEmail(): FormGroup
  {
    return this._builder.group({
      emailAddress : ['',Validators.required],

    })
  }
  newPhone(): FormGroup
  {
    return this._builder.group({
      number: ['',Validators.required],
    })
  }

  get phone(): FormArray
  {
    return this.formEmployee.controls["phone"] as FormArray
  }

  AddEmail()
  {
    this.email.push(this.newEmail())
  }
  AddPhone()
  {
    this.phone.push(this.newPhone())
  }
  DeleteEmails(id: number)
  {
    this.email.removeAt(id)
  }
  DeletePhones(id: number)
  {
    this.phone.removeAt(id)
  }
}

