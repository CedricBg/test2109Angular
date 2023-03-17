import { ContactPerson } from './contactPerson.models';
import { Phone } from '../phone.models';
import { Email } from '../email.models';
import { Language } from '../language.models';

export interface CustomerAll
{
  id: number
  nameCustomer:string
  ContactPerson: ContactPerson
  EmergencyPhone:Phone
  GeneralPhone: Phone
  EmergencyEmail: Email
  Language: Language
}
