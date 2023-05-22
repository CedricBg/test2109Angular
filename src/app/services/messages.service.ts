import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Message } from '../models/Discussion/Message.models';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  private isGetMessageSubject: Subject<string[]> = new Subject<string[]>();
  constructor(private _HttpClient : HttpClient){}

  MessagesForASite(id: number)
  {
      return this._HttpClient.get(environment.baseAdres + "messages/"+id);
  }

  GetMessage()
  {
    return this.isGetMessageSubject.asObservable();
  }

  SendNewMessage(message: Message)
  {
    this._HttpClient.post(environment.baseAdres+ "messages",message).subscribe({
      next: (data: string[]) =>{
        this.isGetMessageSubject.next(data);
      }
    })
  }
}
