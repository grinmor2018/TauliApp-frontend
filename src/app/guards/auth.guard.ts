import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, RouterModule } from '@angular/router';

import{ Router } from '@angular/router';

import { RespostasService } from '../services/respostas.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(private respostasService: RespostasService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {

      console.log('Pasa por el guard');
      console.log(this.respostasService.loggedIn());
      if(this.respostasService.loggedIn()){
        return true;
      }else{
        this.router.navigate(['/login']);
      return false;
      }



  }

}
