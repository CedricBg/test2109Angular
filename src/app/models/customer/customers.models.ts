import { ContactPerson } from './ContactPerson.models';
import { Site } from './site.models';
import { Role } from 'src/app/models/Role.models';
export class Customers
{
  customerId: number
  nameCustomer: string
  contact: ContactPerson
  site: Site[]
  role: Role
  IsDeleted: Boolean
}
