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
import { RfidPatrol } from 'src/app/models/rondes/RfidPatrol.models';
import { MatIconModule } from '@angular/material/icon';
import { PutRfidRounds } from 'src/app/models/rondes/putRfidRounds.models';

@Component({
  selector: 'app-modif-ronde',
  standalone: true,
  imports: [CommonModule,MatButtonModule,ReactiveFormsModule,MatSelectModule,NgFor,NgIf,MatFormFieldModule,FormsModule,CdkDropListGroup, CdkDropList, CdkDrag,MatIconModule],
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
    console.log(this.listRfidSite)
    console.log(this.listRfidRound)
    this.listFiltered = this.listRfidSite.filter(e => !this.listRfidRound.some(r=> r.patrolId === e.patrolId));
    console.log(this.listFiltered)
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

  drop(event: CdkDragDrop<any[]>) {
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
  }

  ModifyRound()
  {

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


  ngOnDestroy(){
    this.subscription.forEach(element => {
      element.unsubscribe();
    });
  }
}
