import { AddEmployeeComponent } from './../module/employee/components/add-employee/add-employee.component';
import { Router } from '@angular/router';
import { DetailedEmployee } from './../models/DetailedEmployee.models';
import { environment } from './../../environments/environment';
import { HttpClient} from '@angular/common/http';;
import { Injectable, OnInit } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Employee } from '../models/employee.models';



@Injectable({
  providedIn: 'root'
})
export class EmployeeService implements OnInit {

  constructor(private _httpClient : HttpClient, private _route : Router) { }

  ngOnInit(): void { }

  insert(employee: DetailedEmployee){
    this._httpClient.post<string>(environment.baseAdres+ 'Employee/insert', employee).subscribe()
  }

  get(): Observable<Employee[]>
  {
    return this._httpClient.get<Employee[]>(environment.baseAdres+ 'Employee/all')
  }

  getOne(id: number): Observable<DetailedEmployee>
  {
    return this._httpClient.get<DetailedEmployee>(environment.baseAdres+ 'Employee/GetOne/'+id)
  }

  DeleteUser(id: number)
  {
    return this._httpClient.delete(environment.baseAdres+ 'Employee/deactiveuser/'+id).subscribe()
  }

}
