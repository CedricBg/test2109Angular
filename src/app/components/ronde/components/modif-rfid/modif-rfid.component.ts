
import { NgFor, NgIf } from '@angular/common';
import { Subscription, Observable } from 'rxjs';
import { Component, OnInit, inject } from '@angular/core';
import { RondeService } from 'src/app/services/ronde.service';
import { ActivatedRoute } from '@angular/router';
import { RfidPatrol } from 'src/app/models/rondes/RfidPatrol.models';
import { MatSelectModule } from '@angular/material/select';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-modif-rfid',
  templateUrl: './modif-rfid.component.html',
  styleUrls: ['./modif-rfid.component.scss'],
  standalone: true,
  imports: [MatSelectModule,NgFor, NgIf,FormsModule, MatFormFieldModule,MatInputModule, ReactiveFormsModule, MatButtonModule,MatIconModule],
})

export class ModifRfidComponent implements OnInit {
subscription : Subscription[] = [];
listRfid: RfidPatrol[]=[];
selectedValue: string ="";
Rfidform: FormGroup;
siteId: number;
rfids!: Observable<RfidPatrol>;
rfid: RfidPatrol
constructor(private _rondeService : RondeService,private _SnackBar: SnackBarService, private _activatedRoute : ActivatedRoute, private _builder: FormBuilder ){}

  ngOnInit(): void {
    this.subscription.push(
      this._activatedRoute.params.subscribe(params =>{
        this.siteId = params['id']
        this.subscription.push(this._rondeService.GetRfidPatrols(params['id']).subscribe({
          next :(data: RfidPatrol[])=>{
            this.listRfid = data;
          }
        }))
      })
    );
  }
  send()
  {
    if(this.Rfidform.valid)
    {
      this._rondeService.UpdateRfid(this.Rfidform.value).subscribe({
        next : (data: RfidPatrol[]) => {
          if(data.length > 0){
            this.listRfid = data
            this._SnackBar.openSnackBar({text2: 'La pastille à bien été modifié'})
          }
          else{
            this._SnackBar.openSnackBar({text2: 'Nous n\'avons pas pu modifier la pastille'})
          }

        }
      })
    }

  }

  GetSite()
  {
    this.rfid = this.listRfid.find(elt=>elt.location === this.selectedValue);
    console.log(this.rfid)
    this.form()
  }

  form()
  {
      this.Rfidform = this._builder.group({
        RfidNr: [this.rfid.rfidNr,Validators.required],
        Location: [this.rfid.location, Validators.required],
        idSite: [this.rfid.idSite],
        patrolId: [this.rfid.patrolId]
      });
  }

  DeleteRfid()
  {
    const ok = confirm('Supprimer la pastille ?')
    if(ok){
      console.log(this.rfid)
      this._rondeService.DeleteRfid(this.rfid).subscribe({
        next : (data: RfidPatrol[]) =>{
          if(data.length > 0)
          {
            this.listRfid = data
            console.log(this.listRfid)
            this.selectedValue = null
            this._SnackBar.openSnackBar({text2: 'La pastille à bien été supprimée'})
          }
          else{
            this._SnackBar.openSnackBar({text2: 'Nous n\'avons pas pu supprimer la pastille'})
          }
        }
      })
    }

  }

  OnDestroy()
  {
    this.subscription.forEach(element => {
      element.unsubscribe();
    });
  }
}
