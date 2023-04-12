import { Language } from './../../../../models/language.models';
import { InformationsService } from 'src/app/services/informations.service';
import { Role } from 'src/app/models/Role.models';
import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Countrys } from 'src/app/models/countrys.models';
import { DetailedEmployee } from 'src/app/models/DetailedEmployee.models';
import { Employee } from 'src/app/models/employee.models';
import { AddressService } from 'src/app/services/address.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { Observable } from 'rxjs';
import { DialogConfig } from '@angular/cdk/dialog';
import { AddloginComponent } from 'src/app/module/auth/components/addlogin/addlogin.component';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.scss']
})
export class UpdateEmployeeComponent implements OnInit {
  firstName: any
  listEmployee: Employee[]
  SelectedEmployee: DetailedEmployee
  formEmployee: FormGroup
  idToModify!: number
  listCountrys: Countrys[]
  idEmployee: number
  listRoles: Role[]
  listLanguages: Language[]
  selectedRole!: string



  constructor(private _serviceEmployee : EmployeeService, private _builder : FormBuilder,private _InfoService : InformationsService, public dialog : MatDialog ,private _AddressService : AddressService,
    private dialogRef: MatDialogRef<UpdateEmployeeComponent>,
    @Inject(MAT_DIALOG_DATA) data: number
    ){
      this.idEmployee = data
    }
  ngOnInit(): void {
    this.GetLanguage()
    this.GetListCountrys()
    this.GetRoles()
    this.GetOne(this.idEmployee)
  }
  CloseDialogBox(): void {
    this.dialogRef.close();
  }
   SendInformationForm()
  {
    this.formEmployee =  this._builder.group({
      firstName: [this.SelectedEmployee.firstName,Validators.required],
      surName: [this.SelectedEmployee.surName,Validators.required],
      birthDate: [this.SelectedEmployee.birthDate,Validators.required],
      securityCard: [this.SelectedEmployee.securityCard],
      employeeCardNumber: [this.SelectedEmployee.employeeCardNumber],
      registreNational: [this.SelectedEmployee.registreNational,Validators.required],
      vehicle: [this.SelectedEmployee.vehicle],
      email: this._builder.array([]),
      phone: this._builder.array([]),
      address: this._builder.group({
        AddressId: [ this.SelectedEmployee.address.addressId],
        sreetAddress: [this.SelectedEmployee.address.sreetAddress,Validators.required],
        city: [ this.SelectedEmployee.address.city,Validators.required],
        state: [this.SelectedEmployee.address.state,Validators.required],
        stateId: [this.SelectedEmployee.address.stateId,Validators.required],
        zipCode: [this.SelectedEmployee.address.zipCode,Validators.required],
      }),
      role: this._builder.group({
        name: [this.SelectedEmployee.role.name,Validators.required],
        diminName: [this.SelectedEmployee.role.diminName],
        roleId: [this.SelectedEmployee.role.roleId]
      }),
      language:this._builder.group({
        id:[this.SelectedEmployee.language.id],
        name: [this.SelectedEmployee.language.name]
      })
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

  GetLanguage()
  {
    this._InfoService.GetLanguages().subscribe({
      next: (data: Language[]) =>{
        this.listLanguages = data
      }
    })
  }

  GetRoles()
  {
    this._InfoService.GetRoles().subscribe({
      next: (data: Role[]) =>{
        this.listRoles = data
      }
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
        this.SelectedEmployee = data
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
      emailId:[null]
    })
  }

  newPhone(): FormGroup
  {
    return this._builder.group({
      number: ['',Validators.required],
      phoneId: [null]
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
    this._InfoService.getSelectedRole(this.listRoles, this.formEmployee)
    this._InfoService.getSectedCountry(this.listCountrys, this.formEmployee)
    this._InfoService.getLanguages(this.listLanguages, this.formEmployee)
    this.formEmployee.value['id'] = this.SelectedEmployee.id

    return this._serviceEmployee.UpdateUser(this.formEmployee.value)
  }
  uploadFile(event: any)
  {
    const day = new Date()
    const formData = new FormData();
    formData.append('file',event.target.files[0],event.target.files[0].name+day.getTime())
    this._serviceEmployee.UploadPoto(formData)
  }

  AddLogin(id: number)
  {
    let dialogRef = new MatDialogConfig;
    dialogRef.height = '200px'
    dialogRef.width = '400px'
    dialogRef.data = id
    const dialog = this.dialog.open(AddloginComponent,dialogRef);
  }
}
