import { environment } from './../../environments/environment';
import { HttpClient} from '@angular/common/http';;
import { Injectable, OnInit } from '@angular/core';
import { Employee } from '../models/Employee.models';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class EmployeeService implements OnInit {

  constructor(private _httpClient : HttpClient) { }
  emplo! : Employee
  ngOnInit(): void { }

  insert(employee : Employee){

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

}
