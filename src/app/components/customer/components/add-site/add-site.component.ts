import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {  Subscription } from 'rxjs';
import { Countrys } from 'src/app/models/countrys.models';
import { Customers } from 'src/app/models/customer/customers.models';
import { Site } from 'src/app/models/customer/site.models';
import { Language } from 'src/app/models/language.models';
import { AddressService } from 'src/app/services/address.service';
import { CustomerService } from 'src/app/services/customer.service';
import { InformationsService } from 'src/app/services/informations.service';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgIf, NgFor } from '@angular/common';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDialogRef } from '@angular/material/dialog';
import { AddCustomerComponent } from '../add-customer/add-customer.component';

@Component({
    selector: 'app-add-site',
    templateUrl: './add-site.component.html',
    styleUrls: ['./add-site.component.scss'],
    standalone: true,
    imports: [MatStepperModule, NgIf, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, NgFor, MatOptionModule, MatButtonModule, MatCheckboxModule, MatIconModule]
})
export class AddSiteComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<AddCustomerComponent>, private _infoService: InformationsService, private _builder : FormBuilder,private _Router: Router, private _custService: CustomerService,private _addressService: AddressService) { }
  formClientSite: FormGroup
  formContactPerson: FormGroup
  listCountrys: Countrys[] = []
  listLanguage: Language[] = []
  siteCreated: Site = new Site()
  idClient!: number
  idSite!: number
  customer!: Customers
  subscription: Subscription[] = []
  ngOnInit(): void {

    this.subscription.push(this._custService.GetaCustomerForUpdateSite().subscribe({
      next :  (data : Customers)=>{
        this.customer = data
      }
    }))
    this.subscription.push(this._infoService.GetLanguages().subscribe({
      next: (data: Language[]) =>{
        this.listLanguage = data
      }
    }))
    this.subscription.push(this._addressService.GetAllCountrys().subscribe({
      next: (data: Countrys[]) => {
        this.listCountrys = data
      }
    }))

    this.subscription.push(this._infoService.GetLanguages().subscribe({
      next: (data: Language[]) =>{
        this.listLanguage = data
      }
    }))
    this.SendSite()
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
  AddContactPersonSite()
  {
    this.formContactPerson = this._builder.group({
      ContactPerson: this._builder.group({
        FirstName: ['', Validators.required],
        LastName: ['', Validators.required],
        Responsible: [false],
        EmergencyContact: [false],
        NightContact: [false],
        DayContact: [false],
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
  CreateSite()
  {
    if(this.formClientSite.valid)
    {
      console.log(this.idSite)
      this._infoService.getSectedCountry(this.listCountrys, this.formClientSite)
      this._infoService.getLanguages(this.listLanguage, this.formClientSite)
      this.siteCreated = this.formClientSite.value
      this.siteCreated.customerIdCreate = this.customer.customerId
      this.subscription.push(this._custService.CreateSite(this.siteCreated).subscribe({
        next: (data : number) =>{
          this.idSite = data
          console.log(this.idSite)
          this.AddContactPersonSite()
        }
      }))
    }
  }
  AjoutcontactSite()
  {
      this._custService.AddContactCreateSite(this.formContactPerson.get('ContactPerson').value)
      this.CloseWindow();
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
  get Email(): FormArray
  {
    return this.formContactPerson.get('ContactPerson.Email') as FormArray;
  }
  get Phone(): FormArray
  {
    return this.formContactPerson.get('ContactPerson.Phone') as FormArray;
  }
  DeleteEmails(id: number)
  {
    this.Email.removeAt(id)
  }
  DeletePhones(id: number)
  {
    this.Phone.removeAt(id)
  }
  CloseWindow(){
    this.dialogRef.close();
  }
  ngOnDestroy(){
    this.subscription.forEach(element => {
      element.unsubscribe()
    });
  }
}
