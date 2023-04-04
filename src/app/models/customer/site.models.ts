import { ContactPerson } from './ContactPerson.models';
import { Language } from './../language.models';
import { Address } from './../address.models';
export class Site
{
  siteId: number
  name: string
  vatNumber: string
  contactSite: ContactPerson[]
  creationDate: Date | null
  isDeleted: boolean| null
  language: Language
  address: Address
  customerIdCreate: number

}
