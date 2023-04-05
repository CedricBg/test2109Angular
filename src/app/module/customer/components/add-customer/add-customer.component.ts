import { AddressService } from 'src/app/services/address.service';
import { CustomerService } from './../../../../services/customer.service';
import { Component,Inject, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Countrys } from 'src/app/models/countrys.models';
import { Customers } from 'src/app/models/customer/customers.models';
import { Language } from 'src/app/models/language.models';
import { Role } from 'src/app/models/Role.models';
import { InformationsService } from 'src/app/services/informations.service';
import { Site } from 'src/app/models/customer/site.models';
import { ContactPerson } from 'src/app/models/customer/ContactPerson.models';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss']
})
export class AddCustomerComponent implements OnInit {
  formClient!: FormGroup
  formClientSite!: FormGroup
  formContactPerson!: FormGroup
  isLinear: boolean
  customer: string
  idClient!: number
  idSite!: number
  isEditable: boolean = false
  newContact: ContactPerson
  listLanguage: Language[] = []
  listCountrys: Countrys[] = []
  siteCreated: Site = new Site()
  constructor(private _builder: FormBuilder,private _Router : Router, private _custService : CustomerService, private _infoService: InformationsService, private _addressService: AddressService
   )
    {

    }

  ngOnInit(): void {
    this.sendCompany()
    this.SendSite()

    this._infoService.GetLanguages().subscribe({
      next: (data: Language[]) =>{
        this.listLanguage = data
      }
    })
    this._addressService.GetAllCountrys().subscribe({
      next: (data: Countrys[]) => {
        this.listCountrys = data
      }
    })

  }

  sendCompany()
  {
    this.formClient = this._builder.group({
      nameCustomer: ['', [Validators.required, Validators.minLength(3)]],
    })
    this.isLinear = true;
  }

  SendSite()
  {
    this.formClientSite = this._builder.group({
      name: ['',[Validators.required,Validators.minLength(3)]],
      vatNumber: [''],
      language:this._builder.group({
        name: ['',Validators.required],
        id:['']
      }),
      address : this._builder.group({
        sreetAddress : ['',Validators.required],
        city : ['',Validators.required],
        state : ['Belgium',Validators.required],
        zipCode : ['',Validators.required],
      }),
    })
  }
  CreateSite()
  {
    if(this.formClientSite.valid)
    {
      this._infoService.getSectedCountry(this.listCountrys, this.formClientSite)
      this._infoService.getLanguages(this.listLanguage, this.formClientSite)
      this.siteCreated = this.formClientSite.value
      this.siteCreated.customerIdCreate = this.idClient
      this._custService.CreateSite(this.siteCreated).subscribe({
        next: (data : number) =>{
          this.idSite = data
          this.AddContactPersonSite()
        }
      })
    }
  }



  AddContactPersonSite()
  {
    console.log(this.idSite)
    this.formContactPerson = this._builder.group({
      ContactPerson: this._builder.group({
        FirstName: ['', Validators.required],
        LastName: ['', Validators.required],
        Responsible: [false],
        EmergencyContact: [false],
        NightContact: [false],
        SiteId:[this.idSite],
        Email: this._builder.array([
          this._builder.group({
            emailAddress: ['', Validators.required],
          })
        ]),
        Phone: this._builder.array([
          this._builder.group({
            number: ['',Validators.required],
          })
        ]),
      })
    })
  }

  AjoutcontactSite()
  {
      this._custService.AddContactCreateSite(this.formContactPerson.get('ContactPerson').value)
      this._Router.navigateByUrl('OPS/customer/listcustomer')
  }




  get Email(): FormArray
  {
    return this.formContactPerson.get('ContactPerson.Email') as FormArray;
  }
  get Phone(): FormArray
  {
    return this.formContactPerson.get('ContactPerson.Phone') as FormArray;
  }

  AddEmail() {
    const email = this._builder.group({
      emailAddress: ['', Validators.required]
    });
    this.Email.push(email);
  }

  AddPhone() {
    const phone = this._builder.group({
      number: ['', Validators.required]
    });
    this.Phone.push(phone);
  }

  DeleteEmails(id: number)
  {
    this.Email.removeAt(id)
  }
  DeletePhones(id: number)
  {
    this.Phone.removeAt(id)
  }

  CreateCompany()
  {
    if(this.formClient.valid)
    {
      this.customer = this.formClient.get('nameCustomer').value
      this._custService.CreateCompany(this.customer).subscribe({
        next : (data: number)=>{
          this.idClient = data
        }
      })
    }
  }
}
