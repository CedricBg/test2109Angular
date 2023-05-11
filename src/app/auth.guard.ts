import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  canActivate(){
    console.log('Activé');
    if(sessionStorage.getItem('dimin') === 'OPS' )
    {
      return true;
    }
    return false
  }

}
