import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { PlanningService } from '../services/planning.service';
import { firstValueFrom } from 'rxjs';

export const ActiveWorkersResolver : ResolveFn<any> =
   (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const planningService = inject(PlanningService);
  return planningService.activeWorkers();

};
