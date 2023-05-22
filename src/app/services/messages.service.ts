import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor(private _HttpClient : HttpClient) { }

  MessagesForASite(id: number)
  {
      return this._HttpClient.get(environment.baseAdres + "messages/"+id)
  }
}
