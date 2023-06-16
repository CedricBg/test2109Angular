import { RfidPatrol } from 'src/app/models/rondes/RfidPatrol.models';

import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { CommonModule, NgIf, NgFor } from '@angular/common';
import { RondeService } from 'src/app/services/ronde.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { Rounds } from 'src/app/models/rondes/rounds.models';
import { SnackBarService } from 'src/app/services/snack-bar.service';

@Component({
  selector: 'app-add-ronde',
  standalone: true,
  imports: [CommonModule,MatFormFieldModule,MatSelectModule,NgIf,NgFor,MatInputModule,FormsModule],
  templateUrl: './add-ronde.component.html',
  styleUrls: ['./add-ronde.component.scss']
})
export class AddRondeComponent implements OnInit {
subscription : Subscription[] = [];
nameRonde!: string;
rounds: Rounds = new Rounds();
idsite!: number;
SiteSected: Boolean = false;
constructor(private _activatedRoute : ActivatedRoute, private _RondeService : RondeService, private _snack: SnackBarService){}

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe(elt => {
      this.idsite =  Number(elt.get('id'));
      this.nameRonde = "";
      this.rounds.name = this.nameRonde;
      this.rounds.siteId = this.idsite;
    })
  }

  CheckRondeExist()
  {
    console.log(this.nameRonde)
    console.log(this.rounds.name)
    if( this.nameRonde.length <= 1){
      this._snack.openSnackBar({text1: "Erreur", text2:'Le nom de la ronde est trop court'});
    }
    else{
    this.rounds.name = this.nameRonde;
    this.rounds.siteId =  this.idsite;
    console.log(this.idsite)
    this._RondeService.CheckRondeExist(this.rounds).subscribe({
      next: (data: boolean)=>{
        console.log(data)
        if(data === false)
        {
          this._snack.openSnackBar({text1: "Erreur", text2:'Nous n\'avons pas pu créer la ronde'});
        }
        else{
          this._snack.openSnackBar({text1: "Réussi", text2:'La ronde '+ this.nameRonde+' créé avec succés'});
        }
      }
    })
  }
  }


  OnDestroy()
  {
    this.subscription.forEach(element =>{
      element.unsubscribe();
    })
  }

}
