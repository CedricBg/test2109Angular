import { inject } from '@angular/core';
import { RouterStateSnapshot, ActivatedRouteSnapshot, ResolveFn} from '@angular/router';


import { AgentService } from '../services/agent.service';
import { Employee } from '../models/employee.models';
import { Customers } from '../models/customer/customers.models';
import { CustomerService } from '../services/customer.service';


export const EmployeeResolver: ResolveFn<Employee> =
( route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const id = +route.paramMap.get('id');
  return inject(AgentService).GetOneGuard(id);
}

export const listassignedCustomerResolver: ResolveFn<Customers[]> =
( route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const id = +route.paramMap.get('id');
  return inject(AgentService).GetAssignedCustomers(id);
}

export const listAllCustomerResolver: ResolveFn<Customers[]> =
( route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  return inject(CustomerService).getAllCustomers();
}
