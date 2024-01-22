import { RfidPatrol } from 'src/app/models/rondes/RfidPatrol.models';
import { MatIconModule } from '@angular/material/icon';
import { PutRfidRounds } from 'src/app/models/rondes/putRfidRounds.models';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { RondeService } from 'src/app/services/ronde.service';
import { ActivatedRoute } from '@angular/router';
import { Rounds } from 'src/app/models/rondes/rounds.models';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  CdkDragDrop,
  CdkDrag,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,

} from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-modif-ronde',
  standalone: true,
  imports: [CommonModule,MatButtonModule,ReactiveFormsModule,MatSelectModule,NgFor,NgIf,MatFormFieldModule,FormsModule,CdkDropList, CdkDropListGroup, CdkDropList, CdkDrag ,MatIconModule],
  templateUrl: './modif-ronde.component.html',
  styleUrls: ['./modif-ronde.component.scss']
})
export class ModifRondeComponent implements OnInit{

subscription: Subscription[] = [];
listRounds: Rounds[] = [];
siteId!: number;
listRfidRound: RfidPatrol[] =[];
listRfidSite: RfidPatrol[]= [];
listFiltered: RfidPatrol[]=[];
putRfid: PutRfidRounds = new PutRfidRounds();
rifdPosition!: RfidPatrol;
round: Rounds = new Rounds();
roundId: number = 0;


constructor(private _rondeService: RondeService, private _ActivatedRoute: ActivatedRoute, private _snack: SnackBarService){}
  ngOnInit(): void {
  this.round.name = '';
   this.subscription.push(
    this._ActivatedRoute.data.subscribe({
      next: (data: any)=> {
        this.listRounds = data.ListRoundsResolver;
      }
    })
   );
   this.subscription.push(
    this._ActivatedRoute.params.subscribe(params =>{
      this.siteId = params['id'];

      this.subscription.push(
        this._rondeService.GetRfidPatrols(this.siteId).subscribe({
          next : (data: RfidPatrol[]) =>{
            this.listRfidSite = data;

          }
        })
      )
    })
  );
  }

  GetFilteredlist()
  {
    this.listFiltered = this.listRfidSite.filter(e => !this.listRfidRound.some(r=> r.patrolId === e.patrolId));
  }

  Getround()
  {
    this.round = this.SelectRound()
    this._rondeService.GetRoundRfid(this.round).subscribe({
      next: (data: RfidPatrol[]) =>{
        this.listRfidRound = data;
        this.GetFilteredlist()
      }
    })
  }

  SelectRound()
  {
    const round = this.listRounds.find(e=>e.roundsId == this.roundId);
    return round;
  }

  drop(event: CdkDragDrop<RfidPatrol[]>) {

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
    if(event.container.data.length){
      console.log(this.listRfidRound)
      for(var i = 0; i < event.container.data.length; i++)
      {
        if(this.listRfidRound[i] != null)
        {
          this.listRfidRound[i].position = i;
        }
      }
    }
  }

  ModifyRound()
  {
    console.log(this.listRfidRound)
    this.putRfid.idRound = this.roundId;
    this.putRfid.listRfid = this.listRfidRound
    this.subscription.push(
      this._rondeService.PutRfidRounds(this.putRfid).subscribe({
        next: (data: RfidPatrol[]) =>{
          this.listRfidRound = data;
          if(data.length > 0){
            this._snack.openSnackBar({text1:'Réussi', text2:'La ronde à bien été modifié'});
          }
          else{
            this._snack.openSnackBar({text1:'Erreur', text2:'Nous n\'avons rien modifié'});
          }
        }
      })
    );
  }
  ChangeName(){
    const name = prompt("Entrez un nom");
    if(name != '')
    {
      this.round.name = name;
      this.subscription.push(
        this._rondeService.ChangeName(this.round).subscribe({
          next: (data: Rounds[]) =>{
            console.log(data)
              console.log(this.listRounds)
              if (JSON.stringify(data) === JSON.stringify(this.listRounds))
            {
              this._snack.openSnackBar({text2: 'Aucun changements'})
            }
            else
            {
              this.listRounds = data;
              console.log(this.listRounds);
              this._snack.openSnackBar({text2: 'Nom bien changé'})
            }
          }
        })
      );
    }
  }

  ngOnDestroy(){
    this.subscription.forEach(element => {
      element.unsubscribe();
    });
  }
}
