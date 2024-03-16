import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ActiveWorkingInfo } from '../models/Planning/activeWorkingInfo.models';

@Injectable({
  providedIn: 'root'
})
export class PlanningService {

  constructor(private _http : HttpClient) { }

  activeWorkers()
  {
    return this._http.get<ActiveWorkingInfo[]>(environment.baseAdres+ "planning/AllworkersActive");
  }
}
