import { Injectable } from '@angular/core';
import { StartEndTimeWork } from '../models/Planning/StartEndTimeWork.models';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';
import { Customers } from '../models/customer/customers.models';
import { Working } from '../models/Planning/working.models';
import { Pdf } from '../models/customer/Pdf.models';
import { Site } from '../models/customer/site.models';
import { Employee } from '../models/employee.models';
import { AddSites } from '../models/agents/AddSites.models';

@Injectable({
  providedIn: 'root'
})
export class AgentService {

  constructor(private _Http: HttpClient) { }

  isStartWorkSubject: Subject<Boolean> = new Subject<Boolean>();

  //verifie si l'agent est en service, par rapport au rapport et ou il faut le redirigé
  IsWorking(id: number)
  {
    return this._Http.get<Working>(environment.baseAdres+ "planning/working/"+id);
  }
  //Tous les sites attribué a un agent
  GetSites(id: number)
  {
    return this._Http.get<Site[]>(environment.baseAdres+ "planning/"+id);
  }

  StartWork(form: StartEndTimeWork)
  {
    return this._Http.post<Working>(environment.baseAdres+ "planning/startWork", form);
  }

  EndWork(id: number)
  {
    return this._Http.get<Boolean>(environment.baseAdres+ "planning/endWork/"+id)
  }
  //Retourn une liste de rapport par id employee
  GetRapport(id: number)
  {
    return this._Http.get<Pdf[]>(environment.baseAdres+ 'pdf/listRapport/'+id);
  }
  //charge un rapport en Pdf par rapport a sont id
  loadRapport(id: number)
  {
    return this._Http.get(environment.baseAdres+ 'pdf/loadRapport/'+id,{responseType:'blob'});
  }
  //Charge les agents par a rapport a leur role
  GetGuards()
  {
    return this._Http.get<Employee[]>(environment.baseAdres+ 'agent');
  }

  GetOneGuard(id: number)
  {
    return this._Http.get<Employee>(environment.baseAdres+ 'agent/GetOne/'+id);
  }

  GetAssignedCustomers(id: number)
  {
    return this._Http.get<Customers[]>(environment.baseAdres+ 'agent/Customers/'+id);
  }

  AddSitesToGuard(sites: AddSites)
  {

    return this._Http.post(environment.baseAdres + 'agent/AddSites',sites);
  }

  RemoveSitesToGuard(sites: AddSites)
  {
    return this._Http.post(environment.baseAdres + 'agent/RemoveSites',sites);
  }

  UpdateSite(sites: AddSites)
  {
    return this._Http.post(environment.baseAdres + 'agent/UpdateSite',sites);
  }
}
