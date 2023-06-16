import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RondeService } from 'src/app/services/ronde.service';
import { ActivatedRoute } from '@angular/router';
import { Rounds } from 'src/app/models/rondes/rounds.models';

@Component({
  selector: 'app-modif-ronde',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modif-ronde.component.html',
  styleUrls: ['./modif-ronde.component.scss']
})
export class ModifRondeComponent implements OnInit{

subscription: Subscription[] = []
listRounds: Rounds[] = []
constructor(private _rondeService: RondeService, private _ActivatedRoute: ActivatedRoute){}
  ngOnInit(): void {
   this.subscription.push(
    this._ActivatedRoute.data.subscribe({
      next: (data: Rounds[])=> {
        this.listRounds = data
        console.log(this.listRounds);
      }
    })
   );
  }

}
