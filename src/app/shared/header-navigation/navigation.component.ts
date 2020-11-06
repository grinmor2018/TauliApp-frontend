import { Component, EventEmitter, Output } from '@angular/core';
import { RespostasService } from '../../services/respostas.service';

//declare var $: any;

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html'
})
export class NavigationComponent {
  @Output()
  toggleSidebar = new EventEmitter<void>();

  public showSearch = false;

  isLoggedIn = this.respostasService.loggedIn();
  isLoggedOut = !this.isLoggedIn;

  constructor(private respostasService: RespostasService) {}

  logOut(){
    this.respostasService.logOut();
  }
}
