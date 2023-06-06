import { NgFor } from '@angular/common';
import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { RondeService } from 'src/app/services/ronde.service';
import { ActivatedRoute } from '@angular/router';
import { RfidPatrol } from 'src/app/models/rondes/RfidPatrol.models';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-modif-rfid',
  templateUrl: './modif-rfid.component.html',
  styleUrls: ['./modif-rfid.component.scss'],
  standalone: true,
  imports: [MatSelectModule,NgFor,FormsModule, MatFormFieldModule]
})

export class ModifRfidComponent implements OnInit {
subscription : Subscription[] = []
listRfid: RfidPatrol[]=[]
selectedValue: string
constructor(private _rondeService : RondeService, private _activatedRoute : ActivatedRoute){}

  ngOnInit(): void {
    this.subscription.push(
      this._activatedRoute.params.subscribe(params =>{
        this.subscription.push(this._rondeService.GetRfidPatrols(params['id']).subscribe({
          next :(data: RfidPatrol[])=>{
            this.listRfid = data
            console.log(data)
          }
        }))
      })
    );
  }

  OnDestroy()
  {
    this.subscription.forEach(element => {
      element.unsubscribe();
    });
  }
}
