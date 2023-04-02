import { Email } from "../email.models"
import { Phone } from "../phone.models"

export interface Contacts
{
  id: number
  firstName: string
  lastName: string
  email: Email[]
  phone: Phone[]
  responsible: boolean
  emergencyContact: boolean
  nightContact: boolean
}
