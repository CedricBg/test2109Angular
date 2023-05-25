import { Language } from './language.models';
import { Role } from './Role.models';
import { Address } from './address.models';
import { Email } from "./email.models"
import { Phone } from "./phone.models"

export class DetailedEmployee
{
    id: number
    firstName: string
    surName: string
    birthDate: Date
    vehicle: boolean
    securityCard: string | null
    entryService: Date |null
    employeeCardNumber: string | null
    registreNational: string | null
    isDeleted: Boolean
    role: Role
    phone: Phone[]
    email: Email[]
    address: Address
    language: Language
}
