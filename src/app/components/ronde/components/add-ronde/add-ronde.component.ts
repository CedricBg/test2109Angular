import { RfidPatrol } from 'src/app/models/rondes/RfidPatrol.models';

import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { CommonModule, NgIf, NgFor } from '@angular/common';
import { RondeService } from 'src/app/services/ronde.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-add-ronde',
  standalone: true,
  imports: [CommonModule,MatFormFieldModule,MatSelectModule,NgIf,NgFor],
  templateUrl: './add-ronde.component.html',
  styleUrls: ['./add-ronde.component.scss']
})
export class AddRondeComponent implements OnInit {
subscription : Subscription[] = []
listRfid: RfidPatrol[]= []
nameRonde: string
constructor(private _activatedRoute : ActivatedRoute, private _RondeService : RondeService){}

  ngOnInit(): void {
    this.nameRonde = "";
    this.subscription.push(this._activatedRoute.data.subscribe(
      ({AllRfid}) =>{
        this.listRfid = AllRfid
       }
      ));
  }



  OnDestroy()
  {
    this.subscription.forEach(element =>{
      element.unsubscribe();
    })
  }

}
