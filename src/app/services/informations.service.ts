import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Role } from '../models/Role.models';
import { Language } from '../models/language.models';
import { FormGroup } from '@angular/forms';
import { Countrys } from '../models/countrys.models';

@Injectable({
  providedIn: 'root'
})
export class InformationsService {

  constructor(private _HttpClient : HttpClient) { }

  GetRoles() : Observable<Role[]>
  {
    return this._HttpClient.get<Role[]>(environment.baseAdres+ 'information/Role')
  }

  GetLanguages(): Observable<Language[]>
  {
    return this._HttpClient.get<Language[]>(environment.baseAdres+'information/Language')
  }

  getSelectedRole(listRoles: Role[], formEmployee: FormGroup)
  {
    const role = listRoles.find(f => f.name === formEmployee.value['role'].name)
    this.getFormGroup('role',formEmployee).value['roleId'] = role ? role.roleId : null
  }
  getSectedCountry(listCountrys: Countrys[],formEmployee: FormGroup )
  {
    const adress = listCountrys.find(f => f.country === formEmployee.value['address'].state)
    this.getFormGroup('address',formEmployee ).value['stateId'] = adress ? adress.id : null
  }

  getLanguages(listLanguage: Language[],formEmployee: FormGroup )
  {
    const language = listLanguage.find(f => f.name === formEmployee.value['language'].name)
    this.getFormGroup('language',formEmployee ).value['id'] = language ? language.id : null
  }

  getFormGroup(fg: string, formEmployee: FormGroup)
  {
    return formEmployee.get(fg) as FormGroup
  }
}
