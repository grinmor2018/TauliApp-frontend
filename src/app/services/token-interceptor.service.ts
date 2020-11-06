import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { RespostasService } from './respostas.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private respostasService: RespostasService) { }

  intercept(req: any, next: any){
    let tokenizeReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${this.getToken()}`
      }
    })
    return next.handle(tokenizeReq);
  }

  //Hi ha token?
  getToken(){
    const token = localStorage.getItem('token');
    console.log('Funcio getToken: ',token);
    return token;
  }

}
