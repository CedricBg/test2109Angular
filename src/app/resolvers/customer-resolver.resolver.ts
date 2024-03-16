
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { Customers } from "../models/customer/customers.models";
import { CustomerService } from "../services/customer.service";
import { inject } from "@angular/core";



export const listAllCustomerResolver: ResolveFn<Customers[]> =
(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const service = inject(CustomerService);
  service.getAllCustomers();
  return service.getAllCustomersSubject();
};


