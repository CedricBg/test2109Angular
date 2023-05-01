import { Injectable } from '@angular/core';
import { StartEndTimeWork } from '../models/Planning/StartEndTimeWork.models';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';
import { Customers } from '../models/customer/customers.models';
import { Working } from '../models/Planning/working.models';

@Injectable({
  providedIn: 'root'
})
export class AgentService {

  constructor(private _Http: HttpClient) { }

  isStartWorkSubject: Subject<Boolean> = new Subject<Boolean>()

  IsWorking(id: number)
  {
    return this._Http.get<Working>(environment.baseAdres+ "planning/working/"+id)
  }

  GetCustomers(id: number)
  {
    return this._Http.get<Customers[]>(environment.baseAdres+ "planning/"+id)
  }

  StartWork(form: StartEndTimeWork)
  {
    return this._Http.post<Working>(environment.baseAdres+ "planning/startWork", form)
  }

  EndWork(id: number)
  {
    return this._Http.get<Boolean>(environment.baseAdres+ "planning/endWork/"+id)
  }

}
