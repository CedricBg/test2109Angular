import { Site } from './../../../../models/customer/site.models';
import { ContactPerson } from '../../../../models/customer/ContactPerson.models';
import { EmployeeService } from 'src/app/services/employee.service';
import { CustomerService } from './../../../../services/customer.service';
import { Role } from 'src/app/models/Role.models';
import { Language } from './../../../../models/language.models';
import { InformationsService } from 'src/app/services/informations.service';
import { AddressService } from './../../../../services/address.service';
import { Countrys } from './../../../../models/countrys.models';
import { FormBuilder, FormGroup, Validators, FormArray, FormControlName, FormControl, AbstractControl, FormGroupName } from '@angular/forms';
import { ChangeDetectorRef, Component,Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Customers } from 'src/app/models/customer/customers.models';
import { AddPersonComponent } from '../add-person/add-person.component';
import { Subject, Subscription, distinctUntilChanged, first, takeUntil } from 'rxjs';

@Component({
  selector: 'app-update-site',
  templateUrl: './update-site.component.html',
  styleUrls: ['./update-site.component.scss']
})
export class UpdateSiteComponent implements OnInit {
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
  private subscription: Subscription [] = []


  constructor(public dialog: MatDialog, private _builder : FormBuilder,private _cd: ChangeDetectorRef, private _AddressService: AddressService,private _infoService: InformationsService,private _serviceEmployee: EmployeeService,private _customerService: CustomerService,
    private dialogRef: MatDialogRef<UpdateSiteComponent>,
    @Inject(MAT_DIALOG_DATA) data: Site
  ){
    this.selectedClient = data;
  }

  ngOnInit(): void {
    this.GetLanguages()
    this.GetListCountrys()
    this.SendInformationForm()

    this.subscription.push(this._customerService.getUpdateData().subscribe({
      next :(data: Site) =>{
        this.selectedClient = data;
        this.UpdateInformationForm()
      }
    })
    )
    this.subscription.push(this._customerService.GetDeleteContact().pipe(
      distinctUntilChanged((prev,curr)=> JSON.stringify(prev) === JSON.stringify(curr))
    ).subscribe({
      next: (data: Site) =>
      {
        this.selectedClient = data
        this.UpdateInformationForm()
      }
    })
    )
  }


  ngOnDestroy() {
    if(this.subscription)
    {
      this.subscription.forEach(subscrp => {
        subscrp.unsubscribe()
      });
    }
  }

  SendInformationForm()
  {
    this.formClient = this._builder.group({
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
    if(this.selectedClient.contactSite != undefined)
      {
      this.selectedClient.contactSite.forEach(contact => {
        const contactForm = this.createContactForm(contact);
        this.contactSite.push(contactForm);
      });
    }
    else
    {
      const contactForm = this.createContactForm(new ContactPerson());
      this.contactSite.push(contactForm);
    }
  }

  public UpdateInformationForm() {
    this.updateForm(this.selectedClient);
  }

  private updateForm(selectedClient: any) {
    this.formClient.patchValue({
      siteId: selectedClient.siteId,
      name: selectedClient.name,
      vatNumber: selectedClient.vatNumber,
      address: {
        addressId: selectedClient.address.addressId,
        sreetAddress: selectedClient.address.sreetAddress,
        city: selectedClient.address.city,
        state: selectedClient.address.state,
        zipCode: selectedClient.address.zipCode,
        stateId: selectedClient.address.stateId
      },
      language: {
        id: selectedClient.language.id,
        name: selectedClient.language.name
      }
    });

    // Mettre à jour la liste des contacts
    const contactsArray = this.formClient.get('contactSite') as FormArray;
    contactsArray.clear();
    if(selectedClient.contactSite != undefined)
    {
      selectedClient.contactSite.forEach((contact: any) => {
        const contactForm = this.createContactForm(contact);
        contactsArray.push(contactForm);
      });
    }

  }

private createContactForm(contact: ContactPerson): FormGroup {
  const phoneArray = this._builder.array([]) as FormArray;

  contact.phone.forEach(phone => {
    const phoneGroup = this._builder.group({
      number: [phone.number, Validators.required],
    });
    phoneArray.push(phoneGroup);
  });

  const emailArray = this._builder.array([]) as FormArray;
  contact.email.forEach(email => {
    const emailGroup = this._builder.group({
      emailAddress: [email.emailAddress, Validators.required],
    });
    emailArray.push(emailGroup);
  });

  return this._builder.group({
    phone: phoneArray,
    email: emailArray,
    firstName: [contact.firstName,Validators.required],
    lastName: [contact.lastName,Validators.required],
    responsible: [contact.responsible,Validators.required],
    emergencyContact: [contact.emergencyContact,Validators.required],
    nightContact: [contact.nightContact,Validators.required],
    contactId: [contact.contactId],
  });
}

  Send()
  {
    this._infoService.getSectedCountry(this.listCountrys,this.formClient)
    this._infoService.getLanguages(this.listLanguage,this.formClient)
    this.CloseDialogBox()
    return this._customerService.UpdateUser(this.formClient.value)
  }
  get contactSite(): FormArray
  {
    return this.formClient.get("contactSite") as FormArray
  }

  getPhoneControls(contact: AbstractControl): AbstractControl[] {
    const phoneArray = contact.get('phone') as FormArray;
    return phoneArray.controls;
  }

  getEmailControls(contact: AbstractControl): AbstractControl[] {
    const emailArray = contact.get('email') as FormArray;
    return emailArray.controls;
  }
  AddEmail(idinstance: number) {
    const instance = this.contactSite.controls[idinstance]
    const array = instance.get('email') as FormArray;
    const email = this._builder.group({
      emailAddress: ['', Validators.required]
    });

    array.push(email);
  }

  AddPhone(idinstance: number) {
    const instance = this.contactSite.controls[idinstance]
    const array = instance.get('phone') as FormArray;
    const phone = this._builder.group({
      number: ['', Validators.required]
    });
    array.push(phone);
  }


  Delete(idinstance: number, id: number,nominstance: string)
  {
    const instance = this.contactSite.controls[idinstance]
    const array = instance.get(nominstance) as FormArray;
    array.removeAt(id)
  }

  newContact(): FormGroup
  {
    return this._builder.group({
      firstName: ['',Validators.required],
      lastName: ['',Validators.required],
      responsible: ['',Validators.required],
      emergencyContact: ['',Validators.required],
      nightContact: ['',Validators.required],
      contactId: [null],
      email: this._builder.array([]),
      phone: this._builder.array([]),
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

  DeleteContact(id: number)
  {
    return this._customerService.DeleteContact(id)
  }

  AddPerson(id: number)
  {
    const diallogConfig =  new MatDialogConfig;
    diallogConfig.data = id;
    diallogConfig.height = '350px';
    diallogConfig.width = '600px';
    diallogConfig.disableClose = true;
    const dialogRef = this.dialog.open(AddPersonComponent,diallogConfig);
  }
}

