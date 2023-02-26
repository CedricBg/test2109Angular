import { Address } from './address.models';
import { Email } from "./email.models"
import { Phone } from "./phone.models"

export interface DetailedEmployee
{
    id: number
    firstName : string
    surName : string
    birthDate : Date
    actif : boolean
    vehicle : boolean
    securityCard : string
    entryService: Date
    employeeCardNumber : string
    registreNational : string
    address: Address
    phones : Phone[]
    emails : Email[]
}
