import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RfidPatrol } from '../models/rondes/RfidPatrol.models';
import { environment } from 'src/environments/environment';
import { Rounds } from '../models/rondes/rounds.models';

@Injectable({
  providedIn: 'root'
})
export class RondeService {

  constructor(private _http: HttpClient){}

  //on enregistre les pastilles pour les rondes (contient l'id site, le nom de l'emplacement de la pastille et le nr de la pastille)
  AddRfid(rfid: RfidPatrol[])
  {
    return this._http.post<boolean>(environment.baseAdres+'rondes/addRfid',rfid);
  }
  //on récupère les pastilles par id du site
  GetRfidPatrols(id: number)
  {
    return this._http.get(environment.baseAdres+ 'rondes/GetRfid/'+id);
  }
  //Mise a jour d'une pastille par rapport a l'id de la pastille et du site
  UpdateRfid(rfid: RfidPatrol)
  {
    return this._http.put<RfidPatrol[]>(environment.baseAdres+ 'rondes/updateRfid', rfid);
  }
  //Suppresion dédinitive d'une pastille
  DeleteRfid(rfid: RfidPatrol)
  {
    return this._http.put<RfidPatrol[]>(environment.baseAdres+'rondes/deleteRfid',rfid);
  }
  //check ronde existe si elle n'existe pas on la crée et on récupère une liste avec un élément de création pour le test
  CheckRondeExist(round: Rounds)
  {
    return this._http.put<boolean>(environment.baseAdres+'rondes/CheckRound',round);
  }

  //récupère une liste de rondes sur base de l'id du site
  GetRounds(id: number)
  {
    return this._http.get<Rounds[]>(environment.baseAdres+'rondes/GetRounds/'+id);
  }
  //récupère une liste de Rfid sur base d'une ronde
  GetRoundRfid(round: Rounds)
  {
    return this._http.post<RfidPatrol[]>(environment.baseAdres+'rondes/GetRfidRounds',round);
  }
}

