import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  spinner : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor() { }
}
