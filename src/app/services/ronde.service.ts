import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RfidPatrol } from '../models/rondes/RfidPatrol.models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RondeService {

  constructor(private _http: HttpClient){}

  //on enregistre les pastilles pour les rondes (contient l'id site, le nom de l'emplacement de la pastille et le nr de la pastille)
  AddRfid(rfid: RfidPatrol[])
  {
    console.log(rfid)
    return this._http.post<boolean>(environment.baseAdres+'rondes/addRfid',rfid);
  }

  GetRfidPatrols(id:number)
  {
    return this._http.get(environment.baseAdres+ 'rondes/GetRfid/'+id);
  }

  UpdateRfid(rfid: RfidPatrol)
  {
    return this._http.put<RfidPatrol[]>(environment.baseAdres+ 'rondes/updateRfid', rfid)
  }

}

