import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/models/employee.models';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { Subscription } from 'rxjs';


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
id!: string
constructor(private _autService : AuthService, private _employeeService : EmployeeService, private _Router: Router, private activatedRoute: ActivatedRoute){

  }

  ngOnInit(): void {
    this.connected = this._autService.isConnected;
    this._employeeService.get()
    this.subscriptions.push(this._employeeService.getAllData().subscribe({
      next : (data : Employee[]) =>{
        this.listAgent = data;
      }
    }))
  }
//Détection de l'agent sélectionnné

  ngModelChange(newValue: string)
  {
    this.id = this.SelectAgent(newValue)
    this.Routing(this.id)
  }

  SelectAgent(name: string) : string
  {
    this.detail = this.listAgent.find((e)=>e.surName === name);
    while(this.detail === undefined)
    {
      new Promise(resolve => setTimeout(resolve, 100));
      this.detail = this.listAgent.find(e=>e.firstName === name);
    }
    return this.detail.id.toString();
  }



  Routing(id: string)
  {
    this._Router.navigateByUrl('OPS/agent/admin/site/'+id);
  }

  ngOnDestroy(){

    this.subscriptions.forEach(subscription  => {
      subscription.unsubscribe();
    });
  }
}

