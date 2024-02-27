import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  isActive: boolean = false;
  spinner : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.isActive);

  constructor() { }


  setActive(isActive: boolean) {
    this.isActive = isActive;
    this.spinner.next(this.isActive);
  }
}

