import { Component, Inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Route, Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { NgIf, NgFor } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-add-person',
    templateUrl: './add-person.component.html',
    styleUrls: ['./add-person.component.scss'],
    standalone: true,
    imports: [MatButtonModule, NgIf, ReactiveFormsModule, MatStepperModule, MatFormFieldModule, MatInputModule, MatIconModule, NgFor, MatCheckboxModule]
})
export class AddPersonComponent {
idSite! : number
formContactPerson: FormGroup;
constructor(private _builder: FormBuilder,private _customer: CustomerService ,private _Router: Router, private dialogRef: MatDialogRef<AddPersonComponent>,
  @Inject(MAT_DIALOG_DATA) data: number
) {
    this.idSite = data;
  }

  ngOnInit(): void
  {
    this.AddContactPersonSite()
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
            emailAddress: ['', [Validators.required,Validators.email]],
          })
        ]),
        Phone: this._builder.array([
          this._builder.group({
            number: ['', [Validators.required,Validators.minLength(10)]]
          })
        ]),
      })
    })
  }

  Sendform()
  {
    if(this.formContactPerson.valid)
    {

      this._customer.AddContactSite(this.formContactPerson.get('ContactPerson').value)
      this.CloseDialogBox()

    }
  }

  DeleteEmails(id: number)
  {
    this.Email.removeAt(id)
  }
  DeletePhones(id: number)
  {
    this.Phone.removeAt(id)
  }

  AddEmail() {
    const email = this._builder.group({
      emailAddress: ['', [Validators.required,Validators.email]],
    });
    this.Email.push(email);
  }

  AddPhone() {
    const phone = this._builder.group({
      number: ['', [Validators.required,Validators.minLength(10)]]
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
  CloseDialogBox(): void {
    this.dialogRef.close();
  }

}
