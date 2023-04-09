import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Form, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs';
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
  constructor(private _builder: FormBuilder,private _custService: CustomerService
){

  }

  ngOnInit(): void {
    this._custService.GetACustomer().subscribe({
      next : (data : Customers)=>{
        this.customer = data
        console.log(this.customer)
      }
    })

  }

  formulaire()
  {
    this.formCustomer = this._builder.group({
      contact: this._builder.group({
        firstName: ['',Validators.required],
      lastName: ['',Validators.required],
      responsible: ['',Validators.required],
      emergencyContact: ['',Validators.required],
      nightContact: ['',Validators.required],
      contactId: [null],
      email: this._builder.array([]),
      phone: this._builder.array([]),
      })
    })
  }

  get email(): FormArray
  {
    return this.formCustomer.get('contact/email') as FormArray
  }

  get phone() : FormArray
  {
    return this.formCustomer.get('contact/phone') as FormArray
  }
}
