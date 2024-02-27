
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { Customers } from "../models/customer/customers.models";
import { CustomerService } from "../services/customer.service";
import { inject } from "@angular/core";
import { switchMap } from "rxjs";



export const listAllCustomerResolver: ResolveFn<Customers[]> =
(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const service = inject(CustomerService);
  service.getAllCustomers();
  return service.getAllCustomersSubject();
};

/* export const listassignedCustomerResolver: ResolveFn<Customers[]> =
( route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const id = +route.paramMap.get('id');
  return inject(AgentService).GetAssignedCustomers(id);
} */

