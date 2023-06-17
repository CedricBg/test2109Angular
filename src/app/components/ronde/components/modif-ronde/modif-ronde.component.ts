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
import { RfidPatrol } from 'src/app/models/rondes/RfidPatrol.models';

@Component({
  selector: 'app-modif-ronde',
  standalone: true,
  imports: [CommonModule,MatButtonModule,ReactiveFormsModule,MatSelectModule,NgFor,NgIf,MatFormFieldModule,FormsModule],
  templateUrl: './modif-ronde.component.html',
  styleUrls: ['./modif-ronde.component.scss']
})
export class ModifRondeComponent implements OnInit{

subscription: Subscription[] = [];
listRounds: Rounds[] = [];
listRfid: RfidPatrol[] = [];
round: Rounds = new Rounds();
roundId!: number;
constructor(private _rondeService: RondeService, private _ActivatedRoute: ActivatedRoute){}
  ngOnInit(): void {
   this.subscription.push(
    this._ActivatedRoute.data.subscribe({
      next: (data: any)=> {
        this.listRounds = data.ListRoundsResolver;

      }
    })
   );
  }

  Getround()
  {
    this.round = this.SelectRound()
    this.subscription.push(
      this._rondeService.GetRoundRfid(this.round).subscribe({
        next: (data: RfidPatrol[])=> {
          this.listRfid = data;
          console.log(data);
        }
      })
    );
  }

  SelectRound()
  {
    const round = this.listRounds.find(e=>e.roundsId == this.roundId);
    return round;
  }

  ngOnDestroy(){
    this.subscription.forEach(element => {
      element.unsubscribe();
    });
  }
}
