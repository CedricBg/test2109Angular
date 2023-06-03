import { Language } from './../../../../models/language.models';
import { Address } from 'src/app/models/address.models';
import { InformationsService } from 'src/app/services/informations.service';
import { Observable, Subscription } from 'rxjs';
import { DetailedEmployee } from 'src/app/models/DetailedEmployee.models';
import { Component, Inject, OnInit,  } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Countrys } from 'src/app/models/countrys.models';
import { AddressService } from 'src/app/services/address.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { Role } from 'src/app/models/Role.models';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatOptionModule } from '@angular/material/core';
import { NgFor, NgIf } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';




@Component({
    selector: 'app-add-employee',
    templateUrl: './add-employee.component.html',
    styleUrls: ['./add-employee.component.scss'],
    standalone: true,
    imports: [MatCardModule, MatButtonModule, ReactiveFormsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatCheckboxModule, MatAutocompleteModule, NgFor, MatOptionModule, MatIconModule, NgIf]
})

export class AddEmployeeComponent implements OnInit {
  listCountrys : Countrys[] = []
  listRoles: Role[] = []
  formEmployee! : FormGroup
  adress! : FormGroup
  listLanguages: Language[] = []
  subscription: Subscription[] = []

  constructor(private _serviceEmployee : EmployeeService, private _builder : FormBuilder,private _InfoService: InformationsService ,private _AddressService : AddressService, private _InformationService : InformationsService, public dialogRef: MatDialogRef<AddEmployeeComponent>,
    @Inject(MAT_DIALOG_DATA) data)
    {

    }

    ngOnInit(): void {
      this.GetListRoles()
      this.GetLanguages()
      this.GetListCountrys()
      this.SendInformationForm()
    }

    CloseDialogBox(): void {
      this.dialogRef.close();
    }

  SubmitForm()
  {
    if(this.formEmployee.valid)
    {
      this._InfoService.getSectedCountry(this.listCountrys, this.formEmployee)
      this._InfoService.getSelectedRole(this.listRoles, this.formEmployee)
      this._InfoService.getLanguages(this.listLanguages, this.formEmployee)
      this._serviceEmployee.insert(this.formEmployee.value)
      this.CloseDialogBox()
    }
  }
   SendInformationForm()
  {
    this.formEmployee =  this._builder.group({
      firstName : ['',Validators.required],
      surName : ['',Validators.required],
      birthDate : ['',Validators.required],
      registreNational : ['',Validators.required],
      vehicle : [true],
      IsDeleted : [false],
      email : this._builder.array([
        this._builder.group({
          emailAddress : ['',Validators.required],
        })
      ]),
      language:this._builder.group({
        name: [''],
        id:['']
      }),
      phone : this._builder.array([
        this._builder.group({
          number: ['',Validators.required],
        })
      ]),
      address : this._builder.group({
      sreetAddress : [''],
      city : [''],
      state : ['Belgium'],
      zipCode : [''],}),

      role : this._builder.group({
        name : ['Agent statique'],
        diminName : [''],
        roleId : ['']
      }),
    })
  }
  GetLanguages()
  {
    this.subscription.push(this._InfoService.GetLanguages().subscribe({
      next: (data: Language[]) =>{
        this.listLanguages = data
      }
    }))
  }
  GetListCountrys()
  {
    this.subscription.push(this._AddressService.GetAllCountrys().subscribe({
      next :  (data: Countrys[]) =>{
          this.listCountrys = data
      }
    }))
  }
  GetListRoles()
  {
    this.subscription.push(this._InformationService.GetRoles().subscribe({
      next:  (data : Role[])=> {
          this.listRoles =  data
      }
    }))
  }
  get email(): FormArray
  {
     return  this.formEmployee.get("email") as  FormArray
  }

  newEmail(): FormGroup
  {
    return this._builder.group({
      emailAddress : ['',Validators.required],

    })
  }
  newPhone(): FormGroup
  {
    return this._builder.group({
      number: ['',Validators.required],
    })
  }

  get phone(): FormArray
  {
    return this.formEmployee.controls["phone"] as FormArray
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

  ngOnDestroy()
  {
    this.subscription.forEach(element => {
      element.unsubscribe()
    });
  }

}

