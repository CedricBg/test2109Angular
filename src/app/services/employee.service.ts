import { DetailedEmployee } from './../models/DetailedEmployee.models';
import { environment } from './../../environments/environment';
import { HttpClient} from '@angular/common/http';;
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee.models';



@Injectable({
  providedIn: 'root'
})
export class EmployeeService implements OnInit {

  constructor(private _httpClient : HttpClient) { }
  emplo! : Employee
  ngOnInit(): void { }

  insert(employee : DetailedEmployee){

    this._httpClient.post<string>(environment.baseAdres+ "Employee/insert", employee).subscribe({
      next : (data : string) =>{
        console.log(data);
      },
      error : (error) =>{
        console.log(error.message)
      }
    })
  }

  get() : Observable<Employee[]>{
    return this._httpClient.get<Employee[]>(environment.baseAdres+ 'Employee/all')
  }

  getOne(id : number)
  {
    return this._httpClient.get<DetailedEmployee>(environment.baseAdres+ 'Employee/GetOne/'+id)
  }

}
