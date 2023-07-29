import {  NgIf, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Form, FormArray, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import {  Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Customers } from 'src/app/models/customer/customers.models';
import { CustomerService } from 'src/app/services/customer.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DialogRef } from '@angular/cdk/dialog';


@Component({
    selector: 'app-update-customer',
    templateUrl: './update-customer.component.html',
    styleUrls: ['./update-customer.component.scss'],
    standalone: true,
    imports: [NgIf, ReactiveFormsModule, MatFormFieldModule, MatInputModule, NgFor, MatIconModule, MatCheckboxModule, MatButtonModule]
})
export class UpdateCustomerComponent implements OnInit {


  formCustomer : FormGroup
  customer!: Customers
  private subscriptions: Subscription[]=[];
  constructor(private dialogRef: DialogRef<UpdateCustomerComponent>,private _builder: FormBuilder,private _custService: CustomerService, private _router  : Router
){}

ngOnInit(): void {
  this.subscriptions.push(this._custService.GetACustomer().subscribe({
    next : (data : Customers)=>{
      this.customer = data
      this.formulaire()
    }
  }));
}
  formulaire()
  {
    this.formCustomer = this._builder.group({
      customerId :      [this.customer.customerId],
      nameCustomer:     [this.customer.nameCustomer,Validators.required],
      contact: this._builder.group({
        firstName:        [this.customer.contact.firstName == null ? '':this.customer.contact.firstName ,Validators.required],
        lastName:         [this.customer.contact.lastName == null ? '': this.customer.contact.lastName,Validators.required],
        responsible:      [this.customer.contact.responsible == null ? false: this.customer.contact.responsible,[Validators.required, Validators.minLength(5)]],
        emergencyContact: [this.customer.contact.emergencyContact == null ? false : this.customer.contact.emergencyContact ,Validators.required],
        nightContact:     [this.customer.contact.nightContact == null ? false: this.customer.contact.nightContact ,Validators.required],
        dayContact:       [this.customer.contact.dayContact == null ? false: this.customer.contact.dayContact ,Validators.required],
        contactId:        [this.customer.contact.contactId == null ? 0:this.customer.contact.contactId ],
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
    if(this.formCustomer.valid === true)
    {
      this._custService.UpdateCustomer(this.formCustomer.value);
      this.CloseWindow()
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
      emailAddress: ['',[Validators.required,Validators.email]],
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
  CloseWindow()
  {
    this.dialogRef.close();
  }
  ngOnDestroy(){
    this.subscriptions.forEach(subscription  => {
      subscription.unsubscribe()
    })
  }
}


