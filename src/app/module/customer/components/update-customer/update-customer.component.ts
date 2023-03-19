import { EmployeeService } from 'src/app/services/employee.service';
import { CustomerService } from './../../../../services/customer.service';
import { Role } from 'src/app/models/Role.models';
import { Language } from './../../../../models/language.models';
import { InformationsService } from 'src/app/services/informations.service';
import { AddressService } from './../../../../services/address.service';
import { Countrys } from './../../../../models/countrys.models';
import { ContactPerson } from './../../../../models/customer/contactPerson.models';
import { Phone } from './../../../../models/phone.models';
import { Email } from './../../../../models/email.models';
import { Customers } from './../../../../models/customer/customers.models';
import { FormBuilder, FormGroup, Validators, FormArray, FormControlName, FormControl } from '@angular/forms';
import { Component,Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-update-customer',
  templateUrl: './update-customer.component.html',
  styleUrls: ['./update-customer.component.scss']
})
export class UpdateCustomerComponent implements OnInit {
  FormClient!: FormGroup
  selectedClient: Customers
  listContact: ContactPerson[] = []
  listCountrys: Countrys[] = []
  listLanguage: Language[]=[]
  listRoles: Role[] = []
  IdClient: number

  constructor(private _builder : FormBuilder, private _AddressService: AddressService,private _infoService: InformationsService,private _serviceEmployee: EmployeeService,private _customerService: CustomerService,
    private dialogRef: MatDialogRef<UpdateCustomerComponent>,
    @Inject(MAT_DIALOG_DATA) data: number
  ){
    this.IdClient = data
  }

  ngOnInit(): void {
    this.GetListCountrys()
    this.GetLanguage()
    this.GetOne(this.IdClient)
  }


  async SendInformationForm()
  {
    this.FormClient = await this._builder.group({
      nameCustomer: [this.selectedClient.nameCustomer,Validators.required],
      vat: [this.selectedClient.vatNumber,Validators.required],
      emergencyEmail: this._builder.array([]),
      generalEmail: this._builder.array([]),
      emergencyPhone: this._builder.array([]),
      generalPhone: this._builder.array([]),
      language: this._builder.array([]),
      contactPerson: this._builder.array([]),
      address : this._builder.array([]),
      role: this._builder.group({
        name: [this.selectedClient.role.name,Validators.required],
        diminName: [this.selectedClient.role.diminName],
        roleId: [this.selectedClient.role.roleId]
      })
    })

    this.AllSelectedEmail(this.GeteArray("emergencyEmail"),this.selectedClient.emergencyEmail)
    this.AllSelectedEmail(this.GeteArray("generalEmail"),this.selectedClient.generalEmail)
    this.AllSelectedPhone(this.GeteArray("emergencyPhone"),this.selectedClient.emergencyPhone)
    this.AllSelectedPhone(this.GeteArray("generalPhone"),this.selectedClient.generalPhone)
  }

  CloseDialogBox(): void {
    this.dialogRef.close();
  }

  AllSelectedEmail(name: FormArray, client: Email[])
  {
      client.forEach(e=>{
      let newcontrol = this.newEmail()
      newcontrol.patchValue(e)
      name.push(newcontrol)
    })
  }
  AllSelectedPhone(name: FormArray, client: Phone[])
  {
      client.forEach(e=>{
      let newcontrol = this.newPhone()
      newcontrol.patchValue(e)
      name.push(newcontrol)
    })
  }
  GeteArray(name: string) : FormArray
  {
    return this.FormClient.get(name) as FormArray
  }
  newAdress()
  {
    return this._builder.group({
      AddressId: [''],
        sreetAddress: [''],
        city: [''],
        state: [''],
        stateId: [''],
        zipCode: [''],
    })
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
    this._customerService.GetOne(id).subscribe({
      next:  (data: Customers) =>{
        this.selectedClient =  data
        this.SendInformationForm()
      }
    })
  }
  GetLanguage()
  {
    this._infoService.GetLanguages().subscribe({
      next : (data: Language[]) =>{
        this.listLanguage = data
      }
    })
  }
  updateClient()
  {
    this._infoService.getSelectedRole(this.listRoles, this.FormClient)
    this._infoService.getSectedCountry(this.listCountrys, this.FormClient)
    this._infoService.getLanguages(this.listLanguage, this.FormClient)
    this.CloseDialogBox()
    return this._customerService.UpdateUser(this.FormClient.value)
  }

}
