import { DatePipe, formatDate } from "@angular/common";

export class RegUsuari{

  constructor(

    public nom: string,
    public cognom1: string,
    public cognom2: string,
    public password: string,
    public nif: string,
    public cip: string,
    public mobilePhone: string,
    public email: string,
    public birthdate: Date,
    public role?: string,
    public id?:string

  ){}

}
