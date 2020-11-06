import { Injectable } from '@angular/core';
import { HttpClient, HttpInterceptor } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Router} from '@angular/router';
/* import { Edifici } from '../interfaces/Edifici';
import { Planta } from '../interfaces/Planta';
import { Sala } from '../interfaces/Sala';
import { Servespe } from '../interfaces/Servespe';
import { Contacte } from '../interfaces/Contacte';
import { Servei } from '../interfaces/Servei';
import { Resposta } from '../interfaces/Resposta'; */
import{ RegUsuari } from '../models/regUsuari.model';
import { LoginUsuari } from '../models/loginUsuari.model';

@Injectable({
  providedIn: 'root'
})
export class RespostasService {

   public selectedRegUsuari: RegUsuari = {
    nif: '',
    password:'',
    username: '',
    cip: '',
    mobilePhone: '',
    email: '',
    birthdate: new Date,
    role: 'User'
  };

  public selectedLogUsuari: LoginUsuari = {
    nif: '',
    password:''
  };

  readonly URL: string= 'http://localhost:3000/api';

  constructor(private http: HttpClient, private router: Router) { }


  // Registre
  getUsers(): Observable<RegUsuari[]>{
    return this.http.get<RegUsuari[]>(`${this.URL}/users`);
  }
  getUser(id:string): Observable<RegUsuari>{
    return this.http.get<RegUsuari>(`${this.URL}/users/${id}`);
  }
  createUser(regUsuari: RegUsuari): Observable<RegUsuari>{
    return this.http.post<RegUsuari>(`${this.URL}/users/register`, regUsuari);
  }
  deleteUser(id:string): Observable<RegUsuari>{
    return this.http.delete<RegUsuari>(`${this.URL}/users/${id}`);
  }
  updateUser(id:string, regUsuari: RegUsuari): Observable<RegUsuari>{
    return this.http.put<RegUsuari>(`${this.URL}/users/${id}`,regUsuari);
  }

  //Login
  login(loginUsuari: LoginUsuari): Observable<LoginUsuari>{
    return this.http.post<LoginUsuari>(`${this.URL}/users/login`, loginUsuari)
      .pipe(
        tap( (res: any) => {
          localStorage.setItem('token', res.token)
        })
      );
  }

  //Hi ha token?
  getToken(){
    const token = [localStorage.getItem('token')];
    console.log(token);
    return token;
  }

  //està autenticat?
  loggedIn(): boolean {
    const token = localStorage.getItem('token');
    console.log(token);
    //if token retorna true sino hi ha token torna false
    return !!token;
  }

  //sortir
  logOut(){
    console.log([localStorage.getItem('token')]);
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }



  /* // Respostas
  getRespostas(): Observable<Resposta[]>{
    return this.http.get<Resposta[]>(`${this.URL}/Respostas`);
  }
  getResposta(id:string): Observable<Resposta>{
    return this.http.get<Resposta>(`${this.URL}/Respostas/$id`);
  }
  createResposta(Resposta: Resposta): Observable<Resposta>{
    return this.http.post<Resposta>(`${this.URL}/Respostas/create`, Resposta);
  }
  deleteResposta(id:string): Observable<Resposta>{
    return this.http.delete<Resposta>(`${this.URL}/Respostas/delete?RespostaId=${id}`);
  }
  updateResposta(id:string, resposta: Resposta): Observable<Resposta>{
    return this.http.put<Resposta>(`${this.URL}/Respostas/update?RespostaId=${id}`,resposta);
  }

  // Edificis
  getEdificis(): Observable<Edifici[]>{
    return this.http.get<Edifici[]>(`${this.URL}/Edificis`);
  }
  getEdifici(id:string): Observable<Edifici>{
    return this.http.get<Edifici>(`${this.URL}/Edificis/$id`);
  }
  createEdifici(Edifici: Edifici): Observable<Edifici>{
    return this.http.post<Edifici>(`${this.URL}/Edificis/create`, Edifici);
  }
  deleteEdifici(id:string): Observable<Edifici>{
    return this.http.delete<Edifici>(`${this.URL}/Edificis/delete?EdificiId=${id}`);
  }
  updateEdifici(id:string, edifici: Edifici): Observable<Edifici>{
    return this.http.put<Edifici>(`${this.URL}/Edificis/update?EdificiId=${id}`,edifici);
  }

  // Plantes
  getPlantas(): Observable<Planta[]>{
    return this.http.get<Planta[]>(`${this.URL}/Plantas`);
  }
  getPlanta(id:string): Observable<Planta>{
    return this.http.get<Planta>(`${this.URL}/Plantas/${id}`);
  }
  createPlanta(Planta: Planta): Observable<Planta>{
    return this.http.post<Planta>(`${this.URL}/Plantas/create`, Planta);
  }
  deletePlanta(id:string): Observable<Planta>{
    return this.http.delete<Planta>(`${this.URL}/Plantas/delete?PlantaId=${id}`);
  }
  updatePlanta(id:string, planta: Planta): Observable<Planta>{
    return this.http.put<Planta>(`${this.URL}/Plantas/update?PlantaId=${id}`, planta);
  }

  // Sales d'espera
  getSalas(): Observable<Sala[]>{
    return this.http.get<Sala[]>(`${this.URL}/salas`);
  }
  getSala(id:string): Observable<Sala>{
    return this.http.get<Sala>(`${this.URL}/salas/$id`);
  }
  createSala(Sala: Sala): Observable<Sala>{
    return this.http.post<Sala>(`${this.URL}/salas/create`, Sala);
  }
  deleteSala(id:string): Observable<Sala>{
    return this.http.delete<Sala>(`${this.URL}/salas/delete?salaId=${id}`);
  }
  updateSala(id:string, sala: Sala): Observable<Sala>{
    return this.http.put<Sala>(`${this.URL}/salas/update?salaId=${id}`, sala);
  }

  // Servei/especialitats
  getServespes(): Observable<Servespe[]>{
    return this.http.get<Servespe[]>(`${this.URL}/servespes`);
  }
  getServespe(id:string): Observable<Servespe>{
    return this.http.get<Servespe>(`${this.URL}/servespes/$id`);
  }
  createServespe(servespe: Servespe): Observable<Servespe>{
    return this.http.post<Servespe>(`${this.URL}/servespes/create`, servespe);
  }
  deleteServespe(id:string): Observable<Servespe>{
    return this.http.delete<Servespe>(`${this.URL}/servespes/delete?servespeId=${id}`);
  }
  updateServespe(id:string, servespe: Servespe): Observable<Servespe>{
    return this.http.put<Servespe>(`${this.URL}/servespes/update?servespeId=${id}`, servespe);
  }

  // Contactes
   getContactes(): Observable<Contacte[]>{
    return this.http.get<Contacte[]>(`${this.URL}/Contactes`);
  }
  getContacte(id:string): Observable<Contacte>{
    return this.http.get<Contacte>(`${this.URL}/Contactes/$id`);
  }
  createContacte(Contacte: Contacte): Observable<Contacte>{
    return this.http.post<Contacte>(`${this.URL}/Contactes/create`, Contacte);
  }
  deleteContacte(id:string): Observable<Contacte>{
    return this.http.delete<Contacte>(`${this.URL}/Contactes/delete?ContacteId=${id}`);
  }
  updateContacte(id:string, contacte: Contacte): Observable<Contacte>{
    return this.http.put<Contacte>(`${this.URL}/Contactes/update?ContacteId=${id}`, contacte);
  }


  // Serveis
  getServeis(): Observable<Servei[]>{
    return this.http.get<Servei[]>(`${this.URL}/Serveis`);
  }
  getServei(id:string): Observable<Servei>{
    return this.http.get<Servei>(`${this.URL}/Serveis/$id`);
  }
  createServei(Servei: Servei): Observable<Servei>{
    return this.http.post<Servei>(`${this.URL}/Serveis/create`, Servei);
  }
  deleteServei(id:string): Observable<Servei>{
    return this.http.delete<Servei>(`${this.URL}/Serveis/delete?ServeiId=${id}`);
  }
  updateServei(id:string, servei: Servei): Observable<Servei>{
    return this.http.put<Servei>(`${this.URL}/Serveis/update?ServeiId=${id}`, servei);
  } */


}

