
import { EmployeeService } from 'src/app/services/employee.service';
import { CustomerService } from './../../../../services/customer.service';
import { Role } from 'src/app/models/Role.models';
import { Language } from './../../../../models/language.models';
import { InformationsService } from 'src/app/services/informations.service';
import { AddressService } from './../../../../services/address.service';
import { Countrys } from './../../../../models/countrys.models';
import { Contacts } from '../../../../models/customer/Contacts.models';
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
  formClient!: FormGroup
  selectedClient: Customers
  listContact: Contacts[] = []
  listCountrys: Countrys[] = []
  listLanguage: Language[]=[]
  listRoles: Role[] = []
  idClient: number

  constructor(private _builder : FormBuilder, private _AddressService: AddressService,private _infoService: InformationsService,private _serviceEmployee: EmployeeService,private _customerService: CustomerService,
    private dialogRef: MatDialogRef<UpdateCustomerComponent>,
    @Inject(MAT_DIALOG_DATA) data: number
  ){
    this.idClient = data;
  }

  ngOnInit(): void {
    this.GetOne(this.idClient);
    this.GetListCountrys()
  }

  GetOne(id: number) {
    this._customerService.GetOne(id).subscribe({
      next: (data: Customers) => {
        this.selectedClient = data;
        console.log(this.selectedClient)
        this.SendInformationForm();
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  SendInformationForm()
  {
    this.formClient = this._builder.group({
      nameCustomer: [this.selectedClient.nameCustomer, Validators.maxLength(20)],
      site: this._builder.array([]),

    })


    this.selectedClient.site.forEach(e=>{
      e.emergencyEmail.forEach(l=>{
        let newcontrol = this.newEmail()
        newcontrol.patchValue(e)
        this.emergencyEmail.push(newcontrol)
      })
      e.generalPhone.forEach(l=>{
        let newcontrol = this.newPhone()
        newcontrol.patchValue(e)
        this.generalPhone.push(newcontrol)
      })
      e.generalEmail.forEach(l=>{
        let newcontrol = this.newEmail()
        newcontrol.patchValue(e)
        this.generalEmail.push(newcontrol)
      })
      e.emergencyPhone.forEach(l=>{
        let newcontrol = this.newPhone()
        newcontrol.patchValue(e)
        this.emergencyPhone.push(newcontrol)
      })
      e.contacts.forEach(l=>{
        let newcontrol = this.newContact()
        newcontrol.patchValue(e)
        this.contacts.push(newcontrol)
      })
    })
  }

  get site(): FormArray
  {
    return this.formClient.get("site") as FormArray
  }

  get contacts(): FormArray
  {
    return this.formClient.get("contacts") as FormArray
  }
  get emergencyEmail(): FormArray
  {
    return this.formClient.get("emergencyEmail") as FormArray
  }
  get generalEmail(): FormArray
  {
    return this.formClient.get("generalEmail") as FormArray
  }
  get emergencyPhone(): FormArray
  {
    return this.formClient.get("emergencyPhone") as FormArray
  }
  get generalPhone(): FormArray
  {
    return this.formClient.get("generalPhone") as FormArray
  }
  get address(): FormArray
  {
    return this.formClient.get("address") as FormArray
  }

  newSite(): FormGroup
  {
    return this._builder.group({
      siteId:[null],
      name: ['',Validators.required],
      vatNumber: [''],
      EmergencyPhone: this._builder.array([]),
      generalPhone: this._builder.array([]),
      emergencyEmail: this._builder.array([]),
      generalEmail: this._builder.array([]),
      contacts: this._builder.array([]),
      language: this._builder.group({
          id: [null],
          name: ['',Validators.required]
      }),
      address :this._builder.group({
          sreetAddress: ['',Validators.required],
        city: ['',Validators.required],
        state: ['',Validators.required],
        zipCode: ['',Validators.required],
        stateId: ['',Validators.required],
        addressId: [null]
      })
    })
  }

  newContact(): FormGroup
  {
    return this._builder.group({
      firstName: ['',Validators.required],
      id: [null]
    })
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

  GetListCountrys()
  {
    this._AddressService.GetAllCountrys().subscribe({
      next :  (data: Countrys[]) =>{
          this.listCountrys =  data
      }
    })
  }
}

