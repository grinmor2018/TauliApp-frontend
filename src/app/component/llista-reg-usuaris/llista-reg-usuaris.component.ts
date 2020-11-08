import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import Swal from "sweetalert2";

import { RegUsuari } from "../../models/regUsuari.model";
import { RespostasService } from "../../services/respostas.service";

@Component({
  selector: "app-llista-reg-usuaris",
  templateUrl: "./llista-reg-usuaris.component.html",
  styleUrls: ["./llista-reg-usuaris.component.css"],
})
export class LlistaRegUsuarisComponent implements OnInit {
  constructor(
    public respostasService: RespostasService,
    private router: Router
  ) {}

  item: RegUsuari = {
    nif: "",
    password: "",
    nom: "",
    cognom1: "",
    cognom2: "",
    cip: "",
    mobilePhone: "",
    email: "",
    birthdate: new Date(),
    role: "User",
  };

  items: RegUsuari[] = [];

  editing: boolean = false;

  filtre = '';
  selectCerca = '0';

  ngOnInit(): void {
    this.getItems();
    this.respostasService.selectedRegUsuari = this.item;
  }

  getItems() {
    this.respostasService.getUsers().subscribe(
      (res) => {
        this.items = res as RegUsuari[];
      },
      (err) => console.log(err)
    );
  }

  getItem(id: string) {
    this.respostasService.getUser(id).subscribe(
      (res) => {
        this.respostasService.selectedRegUsuari= res;
      },
      (err) => console.log(err)
    );
  }

  deleteItem(id: string) {

    Swal.fire({
      title: 'Estàs segur?',
      text: "No podràs recuperar l'usuari!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, esborra-ho!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.respostasService.deleteUser(id).subscribe(
          (res) => {
            this.getItems();
            Swal.fire({
              icon: 'warning',
              title: 'Usuari esborrat',
              showConfirmButton: false,
              timer: 1000
            })
            this.router.navigate(["/component/users"]);
          },
          (err) => console.log(err)
        );
      }
    })

  }

  editItem() {
    this.item = this.respostasService.selectedRegUsuari;
    console.log(this.respostasService.selectedRegUsuari);
    const id = this.item.id || "";
    console.log(id);
    if (id !== null) {
      this.respostasService.updateUser(id, this.item).subscribe(
        (res) => {
          console.log(res);
          this.getItems();
          this.editing = false;
          this.respostasService.selectedRegUsuari = {
            nif: "",
            password: "",
            nom: "",
            cognom1: "",
            cognom2: "",
            cip: "",
            mobilePhone: "",
            email: "",
            birthdate: new Date(),
            role: "User",
          };
          this.scrollDown();
        },
        (err) => console.log(err)
      );
    }
  }

  resetForm(){
    this.editing = false;
    //this.router.navigate(["/component/users"]);
  }

  loadForm(id: string) {
    this.editing = true;
    this.scrollTop();
    this.getItem(id);
  }

  scrollTop() {
    document.body.scrollTop = 0; // Safari
    document.documentElement.scrollTop = 0; // Other
  }

  scrollDown() {
    const height = document.body.clientHeight;
    document.body.scrollTop = height; // Safari
    document.documentElement.scrollTop = height; // Other
  }
}
