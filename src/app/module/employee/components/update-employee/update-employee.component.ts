import { InformationsService } from './../../../../services/informations.service';
import { Role } from './../../../../models/Role.models';
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
  listEmployee: Employee[]
  SelectedEmployee!: DetailedEmployee
  formEmployee!: FormGroup
  idToModify!: number
  listCountrys: Countrys[]
  idEmployee: number
  listRoles: Role[]
  selectedRole!: string

  constructor(private _serviceEmployee : EmployeeService, private _builder : FormBuilder,private _InfoService : InformationsService,private _AddressService : AddressService,
    private dialogRef: MatDialogRef<UpdateEmployeeComponent>,
    @Inject(MAT_DIALOG_DATA) data: number
    ){
      this.idEmployee = data
    }
  ngOnInit(): void {
    this.GetListCountrys()
    this.GetRoles()
    this.GetOne(this.idEmployee)

  }
  async SendInformationForm()
  {
    this.formEmployee = await this._builder.group({
      firstName : [this.SelectedEmployee.firstName,Validators.required],
      surName : [this.SelectedEmployee.surName,Validators.required],
      birthDate : [this.SelectedEmployee.birthDate,Validators.required],
      securityCard : [this.SelectedEmployee.securityCard],
      employeeCardNumber : [this.SelectedEmployee.employeeCardNumber],
      registreNational : [this.SelectedEmployee.registreNational,Validators.required],
      vehicle : [this.SelectedEmployee.vehicle],
      email : this._builder.array([]),
      phone : this._builder.array([]),
      address : this._builder.group({
        AddressId: [ this.SelectedEmployee.address.addressId],
        sreetAddress : [this.SelectedEmployee.address.sreetAddress],
        city : [ this.SelectedEmployee.address.city],
        state : [this.SelectedEmployee.address.state],
        stateId : [this.SelectedEmployee.address.stateId],
        zipCode : [this.SelectedEmployee.address.zipCode],
      }),
      role : this._builder.group({
        name : [this.SelectedEmployee.role.name],
        diminName : [this.SelectedEmployee.role.diminName],
        roleId : [this.SelectedEmployee.role.roleId]
      }),
    })
    this.SelectedEmployee.email.forEach(e=>{
      let newcontrol = this.newEmail()
      newcontrol.patchValue(e)
      this.email.push(newcontrol)
    })
    this.SelectedEmployee.phone.forEach(e=>{
      let newcontrol = this.newPhone()
      newcontrol.patchValue(e)
      this.phone.push(newcontrol)
    })
  }

  GetRoles()
  {
    this._InfoService.GetRoles().subscribe({
      next: (data: Role[]) =>{
        this.listRoles = data
      }
    });
  }

  GetListCountrys()
  {
    this._AddressService.GetAllCountrys().subscribe({
      next :  (data: Countrys[]) =>{
          this.listCountrys =  data
      }
    })
  }
  async GetOne(id: number)
  {
    this._serviceEmployee.getOne(id).subscribe({
        next : async ( data : DetailedEmployee)  => {
        this.SelectedEmployee = await data
        this.SendInformationForm()
      }
    })
  }
  get email(): FormArray
  {
    return this.formEmployee.get("email") as FormArray
  }

  get phone(): FormArray
  {
    return this.formEmployee.controls["phone"] as FormArray
  }

  newEmail(): FormGroup
  {
    return this._builder.group({
      emailAddress: ['',Validators.required],

    })
  }



  newPhone(): FormGroup
  {
    return this._builder.group({
      number: ['',Validators.required],
    })
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
  updateUser()
  {
    this._serviceEmployee.getSelectedRole(this.listRoles, this.formEmployee)
    this._serviceEmployee.getSectedCountry(this.listCountrys, this.formEmployee)
    this.formEmployee.value['id'] = this.SelectedEmployee.id
    return this._serviceEmployee.UpdateUser(this.formEmployee.value)
  }
}
