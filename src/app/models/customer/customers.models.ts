import { Site } from './site.models';
import { Role } from 'src/app/models/Role.models';
export class Customers
{
  id: number
  nameCustomer: string
  site: Site[]
  role: Role
  IsDeleted: Boolean
}
