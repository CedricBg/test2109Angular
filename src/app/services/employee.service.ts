import { Language } from './../models/language.models';
import { Countrys } from 'src/app/models/countrys.models';
import { FormGroup } from '@angular/forms';
import { AddEmployeeComponent } from './../module/employee/components/add-employee/add-employee.component';
import { Router } from '@angular/router';
import { DetailedEmployee } from './../models/DetailedEmployee.models';
import { environment } from './../../environments/environment';
import { HttpClient, HttpEvent, HttpRequest} from '@angular/common/http';;
import { Injectable, OnInit } from '@angular/core';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { Employee } from '../models/employee.models';
import { Role } from '../models/Role.models';



@Injectable({
  providedIn: 'root'
})
export class EmployeeService implements OnInit {

  constructor(private _httpClient : HttpClient, private _route : Router) { }

  ngOnInit(): void { }

  private isUpdatedSubject: Subject<DetailedEmployee> = new Subject<DetailedEmployee>()
  private AllSubject: Subject<Employee[]> = new Subject<Employee[]>()

  getUpdateData()
  {
    return this.isUpdatedSubject.asObservable();
  }
  getAllData()
  {
    return this.AllSubject.asObservable();
  }

  insert(employee: DetailedEmployee){
    this._httpClient.post<string>(environment.baseAdres+ 'Employee/insert', employee).subscribe(value =>{
      this.get()
    })
  }

  get()
  {
    return this._httpClient.get<Employee[]>(environment.baseAdres+ 'Employee/all').subscribe({
      next : async (data : Employee[])=>{
        this.AllSubject.next(data)
      }
    })
  }

  getOne(id: number): Observable<DetailedEmployee>
  {
    return this._httpClient.get<DetailedEmployee>(environment.baseAdres+ 'Employee/GetOne/'+id)
  }

  DeleteUser(id: number)
  {
    return this._httpClient.delete(environment.baseAdres+ 'Employee/deactiveuser/'+id).subscribe(value =>{
      this.get()
    })
  }

  UpdateUser(employee: DetailedEmployee)
  {
    return this._httpClient.put(environment.baseAdres + 'Employee/update', employee).subscribe({
      next : (data : DetailedEmployee) =>{
        this.isUpdatedSubject.next(data)
        this.get()
      }
    })
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
