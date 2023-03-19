import { Language } from '../language.models';
import { Address } from 'src/app/models/address.models';
import { Role } from 'src/app/models/Role.models';
import { Email } from '../email.models';
import { Phone } from '../phone.models';
import { ContactPerson } from './contactPerson.models';
export interface Customers
{
  id: number
  nameCustomer: string
  contactPerson: ContactPerson[]
  emergencyPhone: Phone[]
  emergencyEmail: Email[]
  generalPhone: Phone[]
  generalEmail: Email[]
  vatNumber: string
  role: Role
  address: Address[]
  language: Language
}
