import { Pdf } from './../models/customer/Pdf.models';
import { DetailedEmployee } from './../models/DetailedEmployee.models';
import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders} from '@angular/common/http';;
import { Injectable, OnInit } from '@angular/core';
import { Observable, Subject} from 'rxjs';
import { Employee } from '../models/employee.models';




@Injectable({
  providedIn: 'root'
})
export class EmployeeService implements OnInit {

  constructor(private _httpClient : HttpClient) { }

  ngOnInit(): void { }

  private isUpdatedSubject: Subject<DetailedEmployee> = new Subject<DetailedEmployee>()
  private isSaveRapportSubject: Subject<Pdf> = new Subject<Pdf>();
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

  GetSavedData()
  {
    return this.isSaveRapportSubject.asObservable();
  }
  getUpdateData()
  {
    return this.isUpdatedSubject.asObservable();
  }
  getAllData()
  {
    return this.AllSubject.asObservable();
  }
  //Ajout d'un employee
  insert(employee: DetailedEmployee){
    this._httpClient.post<string>(environment.baseAdres+ 'Employee/insert', employee).subscribe(value =>{
      this.get()
    })
  }
  //charge la photo sur l'api
  UploadPoto(file: FormData)
  {
    this._httpClient.post<string>(environment.baseAdres+ 'Employee/UploadFile', file).subscribe(
      {
        next : (data: string)=> {
          alert(data)
        },
        error : (data : string) =>{
          alert(data)
        }
      }
    )
  }
  //télécharge la photo pour affichage
  DownLoadFoto(id: number)
  {
    return this._httpClient.get(environment.baseAdres + 'employee/loadFile/'+id,{responseType:'blob'})
  }
  //liste de tout le employées
  get()
  {
    return this._httpClient.get<Employee[]>(environment.baseAdres+ 'Employee/all').subscribe({
      next : (data : Employee[])=>{
        this.AllSubject.next(data)
      }
    })
  }
  //Chargement d'un employee par sont Id
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
  SaveRapport(pdf: Pdf)
  {
    this._httpClient.post<Pdf>(environment.baseAdres+ 'pdf/saveRapport', pdf).subscribe({
      next: (data: Pdf) =>{
        this.isSaveRapportSubject.next(data);
      }
    })
  }
  SendRapport(pdf: Pdf)
  {
    return this._httpClient.post(environment.baseAdres + 'pdf', pdf).subscribe()
  }
  CheckForRapport(id: number)
  {
    return this._httpClient.get<Pdf>(environment.baseAdres+ 'pdf/checkRapport/'+id)
  }
  getOneString(id: string): Observable<DetailedEmployee>
  {
    const intId = Number(id);
    return this._httpClient.get<DetailedEmployee>(environment.baseAdres+ 'Employee/GetOne/'+intId)
  }
}
