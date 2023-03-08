import { Role } from './role.models';
import { Address } from './address.models';
import { Email } from "./email.models"
import { Phone } from "./phone.models"

export interface DetailedEmployee
{
    id: number
    firstName : string
    surName : string
    birthDate : Date
    vehicle : boolean
    securityCard : string | null
    entryService: Date |null
    employeeCardNumber : string | null
    registreNational : string | null
    address: Address
    role : Role
    phone : Phone[]
    email : Email[]
    IsDeleted : Boolean
}
