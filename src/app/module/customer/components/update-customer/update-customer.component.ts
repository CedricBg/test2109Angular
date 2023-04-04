import { Site } from './../../../../models/customer/site.models';
import { ContactPerson } from '../../../../models/customer/ContactPerson.models';
import { EmployeeService } from 'src/app/services/employee.service';
import { CustomerService } from './../../../../services/customer.service';
import { Role } from 'src/app/models/Role.models';
import { Language } from './../../../../models/language.models';
import { InformationsService } from 'src/app/services/informations.service';
import { AddressService } from './../../../../services/address.service';
import { Countrys } from './../../../../models/countrys.models';
import { FormBuilder, FormGroup, Validators, FormArray, FormControlName, FormControl, AbstractControl } from '@angular/forms';
import { Component,Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Customers } from 'src/app/models/customer/customers.models';

@Component({
  selector: 'app-update-customer',
  templateUrl: './update-customer.component.html',
  styleUrls: ['./update-customer.component.scss']
})
export class UpdateCustomerComponent implements OnInit {
  formClient!: FormGroup
  selectedClient: Site
  listContact: ContactPerson[] = []
  listCountrys: Countrys[] = []
  listLanguage: Language[]=[]
  listRoles: Role[] = []
  emailArray: FormArray
  phoneArray: FormArray
  index: number = 0
  updatedCustomer: Customers

  constructor(private _builder : FormBuilder, private _AddressService: AddressService,private _infoService: InformationsService,private _serviceEmployee: EmployeeService,private _customerService: CustomerService,
    private dialogRef: MatDialogRef<UpdateCustomerComponent>,
    @Inject(MAT_DIALOG_DATA) data: Site
  ){
    this.selectedClient = data;
  }

  ngOnInit(): void {
    this.GetLanguages()
    this.GetListCountrys()
    this.SendInformationForm()
  }
  async SendInformationForm()
  {
    this.formClient = await this._builder.group({
      siteId:[this.selectedClient.siteId],
      name: [this.selectedClient.name,Validators.required],
      vatNumber: [this.selectedClient.vatNumber],
      contactSite: this._builder.array([]),

      address: this._builder.group({
        addressId: [this.selectedClient.address.addressId],
        sreetAddress: [this.selectedClient.address.sreetAddress,Validators.required],
        city: [this.selectedClient.address.city,Validators.required],
        state: [this.selectedClient.address.state,Validators.required],
        zipCode: [this.selectedClient.address.zipCode,Validators.required],
        stateId: [this.selectedClient.address.stateId,Validators.required],
      }),
      language: this._builder.group({
          id: [this.selectedClient.language.id],
          name: [this.selectedClient.language.name,Validators.required]
      }),
    })

      this.selectedClient.contactSite.forEach(e => {
        let newcontrol = this.newContact()
        newcontrol.patchValue(e)
        const phoneControl = newcontrol.get('phone') as FormArray
        const emailControl = newcontrol.get('email') as FormArray
          e.phone.forEach(y =>{
            const newPhone = this.newPhone();
            newPhone.patchValue(y)
            phoneControl.push(newPhone)
          })
          e.email.forEach(a=>{
            const newEmail = this.newEmail();
            newEmail.patchValue(a)
            emailControl.push(newEmail)
          })
          this.contactSite.push(newcontrol);

      });

  }
  Send()
  {
    this._infoService.getSectedCountry(this.listCountrys,this.formClient)
    this._infoService.getLanguages(this.listLanguage,this.formClient)
    console.log(this.formClient.value)
    return this._customerService.UpdateUser(this.formClient.value)

  }
  get contactSite(): FormArray
  {
    return this.formClient.get("contactSite") as FormArray
  }

  getPhoneControls(contact: AbstractControl): AbstractControl[] {
    this.phoneArray = contact.get('phone') as FormArray;
    return this.phoneArray.controls;
  }

  getEmailControls(contact: AbstractControl): AbstractControl[] {
    this.emailArray = contact.get('email') as FormArray;
    return this.emailArray.controls;
  }
  DeleteEmails(id: number)
  {
    this.emailArray.removeAt(id)
  }
  DeletePhones(id: number)
  {
    this.phoneArray.removeAt(id)
  }

  newContact(): FormGroup
  {
    return this._builder.group({
      firstName: ['',Validators.required],
      lastName: ['',Validators.required],
      responsible: ['',Validators.required],
      emergencyContact: ['',Validators.required],
      nightContact: ['',Validators.required],
      email: this._builder.array([]),
      phone: this._builder.array([]),
      contactId: [null]
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
  GetLanguages()
  {
    this._infoService.GetLanguages().subscribe({
      next : (data: Language[])=>
      {
        this.listLanguage = data
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

  CloseDialogBox(): void {
    this.dialogRef.close();
  }
}

