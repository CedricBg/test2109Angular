import { inject } from '@angular/core';
import { RouterStateSnapshot, ActivatedRouteSnapshot, ResolveFn} from '@angular/router';
import { AgentService } from '../services/agent.service';
import { Employee } from '../models/employee.models';


export const EmployeeResolver: ResolveFn<Employee> =
( route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const id = +route.paramMap.get('id');
  return inject(AgentService).GetOneGuard(id);
}



