import { Email } from "../email.models"
import { Phone } from "../phone.models"

export class ContactPerson
{
  contactId: number | null
  firstName: string
  lastName: string
  email: Email[]
  phone: Phone[]
  responsible: boolean
  emergencyContact: boolean
  nightContact: boolean
  siteId: number | null
}
