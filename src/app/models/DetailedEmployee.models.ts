import { Email } from "./email.models"
import { Phone } from "./phone.models"

export interface DetailedEmployee
{
    firstName : string
    surName : string
    birthDate : Date
    actif : boolean
    vehicle : boolean
    securityCard : string
    entryService: Date
    employeeCardNumber : string
    registreNational : string
    phones : Phone[]
    emails : Email[]
}
