import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DetailedEmployee } from 'src/app/models/DetailedEmployee.models';
import { Subscription } from 'rxjs';
import { Employee } from 'src/app/models/employee.models';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-site',
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.scss']
})
export class SiteComponent implements OnInit{
subscription: Subscription[] = []
agent: any;
nom: string = ""
safeImageUrl: SafeUrl

  constructor(private activatedRoute: ActivatedRoute, private _serviceEmployee: EmployeeService, private _DomSanitizer: DomSanitizer){}
  ngOnInit(): void {

    this.subscription.push(this.activatedRoute.data.subscribe({
      next :  (data : any) =>{
        this.agent = data
        this._serviceEmployee.DownLoadFoto(this.agent.agent.id).subscribe({
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
        })
        }
      })
    );
  }

  ngAfterViewInit(): void {

  }
}
