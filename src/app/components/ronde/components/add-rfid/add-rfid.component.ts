import { RondeService } from './../../../../services/ronde.service';
import { Subscription } from 'rxjs';
import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, } from '@angular/router';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { RfidPatrol } from 'src/app/models/rondes/RfidPatrol.models';

@Component({
  selector: 'app-add-rfid',
  templateUrl: './add-rfid.component.html',
  styleUrls: ['./add-rfid.component.scss'],
  standalone: true,
  imports: [NgFor, NgIf, MatInputModule, ReactiveFormsModule,MatIconModule,MatButtonModule]
})

export class AddRfidComponent implements OnInit{
  formRfid!: FormGroup
  siteId: number
  subscription : Subscription[] = []
  listRfidPatrol: RfidPatrol[] = []
  constructor(private _activetdedRoute: ActivatedRoute, private _builder: FormBuilder, private _rondeService: RondeService,private _snackBar: SnackBarService){}

  ngOnInit(): void {
    this.subscription.push(this._activetdedRoute.params.subscribe(params =>

      this.siteId = params['id']));

    this.AddRfidForm()
  }

  DeleteRfid(id: number)
  {
    this.rfidPatrol.removeAt(id)
  }

  AddRfid() {
    const rfid = this._builder.group({
      RfidNr: ['',Validators.required],
      Location: ['', Validators.required],
      idSite: [this.siteId]

    });
    this.rfidPatrol.push(rfid);
  }

  get rfidPatrol(): FormArray
  {
    return this.formRfid.get('rfidPatrol') as FormArray;
  }

  AddRfidForm()
  {
    this.formRfid = this._builder.group({
      rfidPatrol: this._builder.array([
        this._builder.group({
          RfidNr: ['',Validators.required],
          Location: ['', Validators.required],
          idSite: [this.siteId]
        })
      ])
    });
  }

  Sendform()
  {
    if(this.formRfid.valid)
    {
      this.formRfid.get('rfidPatrol').value.forEach(element => {
        this.listRfidPatrol.push(element)
      });

      this._rondeService.AddRfid(this.listRfidPatrol).subscribe({
        next : (data : any) => {
          console.log(data)
          if(data === false)
          {
            this._snackBar.openSnackBar({text1: 'Erreur', text2 : "Nous n\'avons pas pu anregistré la pastille"});
          }
          else{
            this._snackBar.openSnackBar({ text2 : "Pastille bien enregistrée"});
          }
            this.listRfidPatrol = []
            this.ngOnInit()
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
