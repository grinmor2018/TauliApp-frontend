import { Component, OnInit } from '@angular/core';

import { RespostasService } from "../../services/respostas.service";

@Component({
  selector: 'app-page404',
  templateUrl: './page404.component.html',
  styleUrls: [ './page404.component.css'
  ]
})
export class Page404Component implements OnInit {

  year = new Date().getFullYear();

  constructor( private respostasService: RespostasService) { }

  ngOnInit(): void {
  }

  logOut(){
    this.respostasService.logOut();
  }

}
