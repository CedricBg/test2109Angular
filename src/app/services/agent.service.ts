import { Injectable } from '@angular/core';
import { StartEndTimeWork } from '../models/Planning/StartEndTimeWork.models';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';
import { Customers } from '../models/customer/customers.models';
import { Working } from '../models/Planning/working.models';
import { Pdf } from '../models/customer/Pdf.models';
import { arrayBuffer } from 'stream/consumers';
import { Site } from '../models/customer/site.models';

@Injectable({
  providedIn: 'root'
})
export class AgentService {

  constructor(private _Http: HttpClient) { }

  isStartWorkSubject: Subject<Boolean> = new Subject<Boolean>()

  private JsonHeader()
  {
      return new HttpHeaders({ 'Content-Type': 'application/json' });
  }

  IsWorking(id: number)
  {
    return this._Http.get<Working>(environment.baseAdres+ "planning/working/"+id)
  }

  GetSites(id: number)
  {
    return this._Http.get<Site[]>(environment.baseAdres+ "planning/"+id)
  }

  StartWork(form: StartEndTimeWork)
  {
    return this._Http.post<Working>(environment.baseAdres+ "planning/startWork", form)
  }

  EndWork(id: number)
  {
    return this._Http.get<Boolean>(environment.baseAdres+ "planning/endWork/"+id)
  }
  GetRapport(id: number)
  {
    return this._Http.get<Pdf[]>(environment.baseAdres+ 'pdf/listRapport/'+id)
  }
  loadRapport(id: number)
  {
    const options = { responseType: 'blob' };
    return this._Http.get(environment.baseAdres+ 'pdf/loadRapport/'+id,{responseType:'blob'})

  }
}
