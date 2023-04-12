import { Language } from './../models/language.models';
import { Countrys } from 'src/app/models/countrys.models';
import { FormGroup } from '@angular/forms';
import { AddEmployeeComponent } from './../module/employee/components/add-employee/add-employee.component';
import { Router } from '@angular/router';
import { DetailedEmployee } from './../models/DetailedEmployee.models';
import { environment } from './../../environments/environment';
import { HttpClient, HttpEvent, HttpHeaders, HttpRequest} from '@angular/common/http';;
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

  private JsonHeader()
  {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/file'
      })
    };
    return httpOptions
  }

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

  UploadPoto(file: FormData)
  {
    console.log(file)
    this._httpClient.post<string>(environment.baseAdres+ 'Employee/uploadFile', file).subscribe(
      {
        next : (data: string)=> {
          console.log(data)
        }
      }
    )
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


}
