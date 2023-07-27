import { StartEndTimeWork } from './../models/Planning/StartEndTimeWork.models';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { Customers } from "../models/customer/customers.models";
import { CustomerService } from "../services/customer.service";
import { inject } from "@angular/core";
import { AgentService } from "../services/agent.service";
import { Site } from '../models/customer/site.models';


export const listAllCustomerResolver: ResolveFn<Customers[]> =
( route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  return inject(CustomerService).getAllCustomers();
}

export const listassignedCustomerResolver: ResolveFn<Customers[]> =
( route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const id = +route.paramMap.get('id');
  return inject(AgentService).GetAssignedCustomers(id);
}

