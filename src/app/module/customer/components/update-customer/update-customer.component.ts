import { Site } from './../../../../models/customer/site.models';
import { Contacts } from './../../../../models/customer/Contacts.models';
import { EmployeeService } from 'src/app/services/employee.service';
import { CustomerService } from './../../../../services/customer.service';
import { Role } from 'src/app/models/Role.models';
import { Language } from './../../../../models/language.models';
import { InformationsService } from 'src/app/services/informations.service';
import { AddressService } from './../../../../services/address.service';
import { Countrys } from './../../../../models/countrys.models';
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
  selectedClient: Site
  listContact: Contacts[] = []
  listCountrys: Countrys[] = []
  listLanguage: Language[]=[]
  listRoles: Role[] = []
  index: number = 0

  constructor(private _builder : FormBuilder, private _AddressService: AddressService,private _infoService: InformationsService,private _serviceEmployee: EmployeeService,private _customerService: CustomerService,
    private dialogRef: MatDialogRef<UpdateCustomerComponent>,
    @Inject(MAT_DIALOG_DATA) data: Site
  ){
    this.selectedClient = data;

  }

  ngOnInit(): void {

    this.GetListCountrys()
    this.SendInformationForm()
  }
  async SendInformationForm()
  {
    this.formClient = await this._builder.group({
      siteId:[this.selectedClient.siteId],
      name: [this.selectedClient.name,Validators.required],
      vatNumber: [this.selectedClient.vatNumber],
      emergencyPhone: this._builder.array([]),
      generalPhone: this._builder.array([]),
      emergencyEmail: this._builder.array([]),
      generalEmail: this._builder.array([]),
      contacts: this._builder.array([]),
      address: this._builder.group({
        addressId: [this.selectedClient.address.addressId],
        sreetAddress: [this.selectedClient.address.sreetAddress,Validators.required],
        city: [this.selectedClient.address.city,Validators.required],
        state: [this.selectedClient.address.state,Validators.required],
        zipCode: [this.selectedClient.address.zipCode,Validators.required],
        stateId: [this.selectedClient.address.stateId,Validators.required],
      }),
      language: this._builder.group({
          id: [null],
          name: ['',Validators.required]
      }),

    })

      this.selectedClient.contacts.forEach(e => {
        let newcontrol = this.newContact()
        newcontrol.patchValue(e)
        this.contacts.push(newcontrol);
      });
      this.selectedClient.emergencyEmail.forEach((control, index) => {
        let newcontrol = this.newEmail()
        newcontrol.patchValue(control)
        this.getArray(this.formClient,'emergencyEmailArray').push(newcontrol);
      });
      this.selectedClient.generalEmail.forEach((control, index) => {
        let newcontrol = this.newEmail()
        newcontrol.patchValue(control)
        this.getArray(this.formClient,'generalEmailArray').push(newcontrol);
      });
      this.selectedClient.emergencyPhone.forEach((control, index) => {
        let newcontrol = this.newPhone()
        newcontrol.patchValue(control)
        this.getArray(this.formClient,'emergencyPhoneArray').push(newcontrol);
      });
      this.selectedClient.generalPhone.forEach((control, index) => {
        let newcontrol = this.newPhone()
        newcontrol.patchValue(control)
        this.getArray(this.formClient,'generalPhoneArray').push(newcontrol);
      });
  }



  get site(): FormArray
  {
    return this.formClient.get("site") as FormArray
  }
  getArray(array: FormGroup, name: string): FormArray
  {
    return array.get(name) as FormArray
  }


  get contacts(): FormArray
  {
    return this.formClient.get("contacts") as FormArray
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
  CloseDialogBox(): void {
    this.dialogRef.close();
  }
}

