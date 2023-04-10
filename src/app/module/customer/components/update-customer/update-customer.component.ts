import { NgSwitchDefault } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Form, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, distinctUntilChanged, first } from 'rxjs';
import { Customers } from 'src/app/models/customer/customers.models';
import { CustomerService } from 'src/app/services/customer.service';


@Component({
  selector: 'app-update-customer',
  templateUrl: './update-customer.component.html',
  styleUrls: ['./update-customer.component.scss']
})
export class UpdateCustomerComponent implements OnInit {


  formCustomer : FormGroup
  customer!: Customers
  private subscription: Subscription;
  constructor(private _builder: FormBuilder,private _custService: CustomerService, private _router  : Router
){

  }
  ngOnInit(): void {
    this._custService.GetACustomer().subscribe({
      next : (data : Customers)=>{
        this.customer = data
        this.formulaire()
      }
    })
  }

  formulaire()
  {
    this.formCustomer = this._builder.group({
      customerId : [this.customer.customerId],
      nameCustomer: [this.customer.nameCustomer,Validators.required],
      contact: this._builder.group({
        firstName: [this.customer.contact == null ? '':this.customer.contact.firstName ,Validators.required],
        lastName: [this.customer.contact == null ? '': this.customer.contact.lastName,Validators.required],
        responsible:      [this.customer.contact == null ? false: this.customer.contact.responsible,[Validators.required, Validators.minLength(5)]],
        emergencyContact: [this.customer.contact == null ? false : this.customer.contact.emergencyContact ,Validators.required],
        nightContact: [ this.customer.contact == null ? false: this.customer.contact.nightContact ,Validators.required],
        contactId: [this.customer.contact == null ? 0:this.customer.contact.contactId ],
        email: this._builder.array([]),
        phone: this._builder.array([]),
      })
    })
    if(this.customer.contact != null)
    {
      if(this.customer.contact.email != null)
      {
        this.customer.contact.email.forEach(mail => {
          let newControl = this.newEmail()
          newControl.patchValue(mail)
          this.email.push(newControl)
        });
      }
      else
      {
        this.email.push(this.newEmail())
      }

      if(this.customer.contact.phone != null)
      {
        this.customer.contact.phone.forEach(phone =>{
          let newControl = this.newPhone()
          newControl.patchValue(phone)
          this.phone.push(newControl)
        })
      }
      else
      {
        this.phone.push(this.newPhone())
      }
    }
    else{
      this.email.push(this.newEmail())
      this.phone.push(this.newPhone())
    }
  }

  Send(id: number)
  {
    this.formCustomer.get('customerId').patchValue(id)
    if(this.formCustomer.valid)
    {
      console.log(this.formCustomer.value)
      this._custService.UpdateCustomer(this.formCustomer.value)
    }
  }

  get email(): FormArray
  {
    const group = this.formCustomer.get('contact') as FormGroup
    return group.get("email") as FormArray
  }

  get phone() : FormArray
  {
    const group = this.formCustomer.get('contact') as FormGroup
    return group.get("phone") as FormArray
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
      number: ['',[Validators.required,Validators.minLength(10)]],
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

}


