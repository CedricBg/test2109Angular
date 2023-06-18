import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { Customers } from 'src/app/models/customer/customers.models';
import { NgFor, NgIf } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import {  FormBuilder, FormsModule,ReactiveFormsModule  } from '@angular/forms';
import { filterByName } from "../../../customer/filter-by-name.pipe";
import { MatIconModule } from '@angular/material/icon';



@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss'],
    standalone: true,
    imports: [NgFor, NgIf, RouterOutlet, MatSelectModule, MatInputModule, FormsModule, filterByName,ReactiveFormsModule,MatIconModule  ]
})
export class AdminComponent implements OnInit {
subscription : Subscription[] = [];
listCustomers : any;
client!: string;
siteId: number;

constructor(private _activetdedRoute : ActivatedRoute, private _builder : FormBuilder, private _router : Router){}
  ngOnInit(): void {

    this.subscription.push(this._activetdedRoute.data.subscribe({
      next : (data : Customers[]) => {
        this.listCustomers = data
      }
    }));
  }

  ChangeSite()
  {
    this._router.navigateByUrl('OPS/ronde/admin')
  }

   AddRfid()
  {
    this._router.navigateByUrl('OPS/ronde/admin/AddRfid/'+this.siteId)

  }
  ModifRfid()
  {
    this._router.navigateByUrl('OPS/ronde/admin/ModifyRfid/'+this.siteId)

  }
  AddRonde()
  {
    this._router.navigateByUrl('OPS/ronde/admin/AddRonde/'+this.siteId)
  }
  ModifRonde()
  {
    this._router.navigateByUrl('OPS/ronde/admin/ModifRonde/'+this.siteId);
  }

  ngOnDestroy(){
    this.subscription.forEach(element => {
      element.unsubscribe();
    });
  }
}
