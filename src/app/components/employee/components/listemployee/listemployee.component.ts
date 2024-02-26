import { UpdateEmployeeComponent } from './../update-employee/update-employee.component';
import { DetailedEmployee } from 'src/app/models/DetailedEmployee.models';
import { Component, LOCALE_ID, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employee } from 'src/app/models/employee.models';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';
import { Subscription, switchMap } from 'rxjs';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { NgFor, NgIf, TitleCasePipe, DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
    selector: 'app-listemployee',
    templateUrl: './listemployee.component.html',
    styleUrls: ['./listemployee.component.scss'],
    standalone: true,
    imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule, FormsModule, MatButtonModule, MatIconModule, NgFor, NgIf, TitleCasePipe, DatePipe],
    providers: [{ provide: LOCALE_ID, useValue: "fr-BE" },
    ]
})
export class ListemployeeComponent implements OnInit {
  surName: any
  listEmployee : Employee[] = []
  SelectedEmployee! : DetailedEmployee
  select : boolean = false
  subscriptionUpdate: Subscription
  subscriptionAll: Subscription
  role: string
  safeImageUrl: SafeUrl
  subscription: Subscription[] = []

  constructor(private _serviceEmployee : EmployeeService, public dialog : MatDialog, private _DomSanitizer: DomSanitizer,private _spinnerService : SpinnerService ) { }

  ngOnInit(): void {
    this.role = sessionStorage.getItem('dimin')
    this.GetEmployee()
    this.subscription.push(this._serviceEmployee.getUpdateData().subscribe(newData => {
      this.SelectedEmployee = newData
    }))
    this.subscription.push(this._serviceEmployee.getAllData().subscribe(newData =>{
      this.listEmployee = newData
    }))
    this._spinnerService.setActive(false);
  }

  GetEmployee()
  {
    this._serviceEmployee.get()
  }

  GetOne(id: number)
  {
    this.select = true

    this.subscription.push(this._serviceEmployee.getOne(id).pipe(
      switchMap((data: any) => {
        this.SelectedEmployee = data
        return this._serviceEmployee.DownLoadFoto(id);
      }),
    ).subscribe({
      next: (data: Blob) => {
        if (!(data == null)) {
          const imageUrl: string = URL.createObjectURL(data);
          this.safeImageUrl = this._DomSanitizer.bypassSecurityTrustUrl(imageUrl);
        }
        else {
          this.safeImageUrl = null
        }
      }
    }))
  }

  ngModelChange()
  {
    if(this.surName == "")
    {
      this.ngOnInit();
    }
    else{
      this.listEmployee = this.listEmployee.filter(res=>{
        const reponse = res.surName.toLocaleLowerCase().match(this.surName.toLocaleLowerCase());
        return reponse;
      })
    }
  }
  OpenformUpdate(id: number)
  {
    const diallogConfig = new MatDialogConfig;
    diallogConfig.data = id
    diallogConfig.disableClose = true;
    diallogConfig.autoFocus = true;
    const dialogRef = this.dialog.open(UpdateEmployeeComponent,diallogConfig);
  }
  OpenformAddUser()
  {
    const diallogConfig = new MatDialogConfig;
    diallogConfig.disableClose = true;
    diallogConfig.autoFocus = true;
    const dialogRef = this.dialog.open(AddEmployeeComponent,diallogConfig);
  }
  DeleteUSer(id: number)
  {
    const deletes = confirm("Supprimer l'utilisateur ?")
    if(deletes)
    {
      this._serviceEmployee.DeleteUser(id)
    }

  }
  ngOnDestroy()
  {
    this.subscription.forEach(element => {
      element.unsubscribe();
    });
  }
}
