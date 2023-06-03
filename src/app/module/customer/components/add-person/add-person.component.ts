import { Component, Inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
import { Route, Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-add-person',
  templateUrl: './add-person.component.html',
  styleUrls: ['./add-person.component.scss']
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
