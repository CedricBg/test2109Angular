import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DetailedEmployee } from 'src/app/models/DetailedEmployee.models';
import { Subscription } from 'rxjs';
import { Employee } from 'src/app/models/employee.models';

@Component({
  selector: 'app-site',
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.scss']
})
export class SiteComponent implements OnInit{
subscription: Subscription[] = []
agent: any;
nom: string = ""

  constructor(private activatedRoute: ActivatedRoute){}
  ngOnInit(): void {

    this.subscription.push(this.activatedRoute.data.subscribe({
      next :  (data : any) =>{
        this.agent = data

        }
      })
    );
  }

  ngAfterViewInit(): void {

  }
}
