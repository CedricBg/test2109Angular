import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Customers } from 'src/app/models/customer/customers.models';
import { JsonPipe, NgFor, NgIf } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { filterByName } from "../../../customer/filter-by-name.pipe";





@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss'],
    standalone: true,
    imports: [NgFor, NgIf, JsonPipe, MatSelectModule, MatInputModule, FormsModule, filterByName]
})
export class AdminComponent implements OnInit {
subscription : Subscription[] = [];
listCustomers : any;
client: string;
constructor(private _activetdedRoute : ActivatedRoute){}
  ngOnInit(): void {

    this.subscription.push(this._activetdedRoute.data.subscribe({
      next : (data : Customers[]) => {
        this.listCustomers = data
        console.log(this.listCustomers)
      }
    }));
  }

  SelectCustomer()
  {
    console.log(this.client)
  }

  SelectSite()
  {

  }

  ngOnDestroy(){
    this.subscription.forEach(element => {
      element.unsubscribe();
    });
  }
}
