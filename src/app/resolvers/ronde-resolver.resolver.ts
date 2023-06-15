import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { RfidPatrol } from "../models/rondes/RfidPatrol.models";
import { RondeService } from "../services/ronde.service";
import { inject } from "@angular/core";



export const ListRfidResolver: ResolveFn<any> =
(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) =>{
  const id = +route.paramMap.get('id');
  return inject(RondeService).GetRfidPatrols(id);
}
