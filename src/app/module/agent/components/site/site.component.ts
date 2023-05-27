import { AgentService } from 'src/app/services/agent.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { EmployeeService } from 'src/app/services/employee.service';
import { Site } from 'src/app/models/customer/site.models';
import { Customers } from 'src/app/models/customer/customers.models';
import { CustomerService } from 'src/app/services/customer.service';
import { CdkDragDrop,CdkDrag,CdkDropList,CdkDropListGroup,moveItemInArray,transferArrayItem, } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-site',
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.scss']
})
export class SiteComponent implements OnInit{
subscription: Subscription[] = []
listCustomers: Customers[] = []
listSiteAgent: Site[] = []
listCustomerstoAgent: Customers[] = []
agent: any;
nom: string = ""
safeImageUrl: SafeUrl

  constructor(private activatedRoute: ActivatedRoute, private _serviceEmployee: EmployeeService, private _serviceCustomer: CustomerService, private _agentService : AgentService, private _DomSanitizer: DomSanitizer){}
  ngOnInit(): void {
    this.subscription.push(this.activatedRoute.data.subscribe({
      next :  (data : any) =>{
        this.agent = data
        this.subscription.push(this._serviceCustomer.getAllCustomers().subscribe({
          next : (data: Customers[]) =>{

            this.listCustomers = data
          }}));
        this.subscription.push(this._serviceEmployee.DownLoadFoto(this.agent.agent.id).subscribe({
          next : (data : Blob)=>{
            if(!(data == null))
            {
              const imageUrl: string = URL.createObjectURL(data);
              this.safeImageUrl = this._DomSanitizer.bypassSecurityTrustUrl(imageUrl);
            }
            else{
              this.safeImageUrl = null
            }
          }
        }));
        this.subscription.push(this._agentService.GetSites(data.agent.id).subscribe({
          next : (data : Site[] ) =>{
            this.listSiteAgent = data
          }})
        );
        this.subscription.push(this._agentService.GetAssignedCustomers(data.agent.id).subscribe({
          next : (data : Customers[]) =>{
            this.listCustomerstoAgent = data
            console.log(this.listCustomerstoAgent)
          }
        }))
        }
      })
    );
  }

  drop(event: CdkDragDrop<Customers[]>)
  {
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

  ngOnDestroy(){
    this.subscription.forEach(element => {
      element.unsubscribe();
    });
  }
}
