export class Usuari{

  constructor(

    public username: string,
    public nif: string,
    public cip: string,
    public mobilePhone: string,
    public email: string,
    public birthdate: Date,
    public active: boolean,
    public dependencies: [],
    public id?: string,
    public createdAt?: Date,
    public updatedAt?: Date,
    public role?: string

  ){}

}
