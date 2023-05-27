import { Employee } from 'src/app/models/employee.models';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AgentService } from 'src/app/services/agent.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit{
connected!: Boolean;
listAgent: Employee[]= [];
private subscriptions: Subscription[] = [];
name: string;
detail: Employee = new Employee()
id!: number
constructor(private _autService : AuthService, private _AgentService : AgentService, private _Router: Router){

  }

  ngOnInit(): void {
    this.connected = this._autService.isConnected;

    this.subscriptions.push(this._AgentService.GetGuards().subscribe({
      next : (data : Employee[]) =>{
        this.listAgent = data;
      }
    }))
  }
//Détection de l'agent sélectionnné
  ngModelChange(newValue: string)
  {
    this.id = this.IdAgent(newValue)
    this.Routing(this.id)
  }
//Converstion du vers l'id
  IdAgent(name: string) : number
  {
    this.detail = this.listAgent.find((e)=>e.surName === name);
    while(this.detail === undefined)
    {
      new Promise(resolve => setTimeout(resolve, 100));
      this.detail = this.listAgent.find(e=>e.firstName === name);
    }
    return this.detail.id;
  }

  //Chargement de l'agent avec le composant site
  Routing(id: number)
  {
    this._Router.navigateByUrl('OPS/agent/admin/site/'+id);
  }

  ngOnDestroy(){
    this.subscriptions.forEach(subscription  => {
      subscription.unsubscribe();
    });
  }
}

