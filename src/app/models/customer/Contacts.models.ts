import { Email } from "../email.models"
import { Phone } from "../phone.models"

export interface Contacts
{
  id: number
  firstName: string
  lastName: string
  email: Email[]
  phone: Phone[]
  reponsible: boolean
  emergencyContact: boolean
  nightContact: boolean
}