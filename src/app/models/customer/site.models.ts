import { Contacts } from './Contacts.models';
import { Phone } from './../phone.models';
import { Email } from './../email.models';
import { Language } from './../language.models';
import { Address } from './../address.models';
export class Site
{
  siteId: number
  name: string
  emergencyPhone: Phone[]
  generalPhone: Phone[]
  emergencyEmail: Email[]
  generalEmail: Email[]
  vatNumber: string
  creationDate: Date | null
  isDeleted: boolean| null
  language: Language
  adress: Address
  contacts: Contacts[]

}
