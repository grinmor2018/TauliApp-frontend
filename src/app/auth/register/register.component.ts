import { formatDate } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { RegUsuari } from "../../models/regusuari.model";
import { Moment } from "moment";

import { RespostasService } from "../../services/respostas.service";
import * as moment from "moment";
import { Router } from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: [],
})
export class RegisterComponent implements OnInit {
  item: RegUsuari = {
    nif: "",
    password: "",
    username: "",
    cip: "",
    mobilePhone: "",
    email: "",
    birthdate: new Date(),
    role: "User",
  };

  items: RegUsuari[] = [];

  editing: boolean = false;

  FORMATO_ENTRADA = "DD-MM-YYYY";
  FORMATO_SALIDA = "YYYY-MM-DDTHH:mm:ss Z";

  constructor(
    public respostasService: RespostasService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.item = {
      nif: "",
      password: "",
      username: "",
      cip: "",
      mobilePhone: "",
      email: "",
      birthdate: new Date(),
      role: "User",
    };
    this.respostasService.selectedRegUsuari = this.item;
  }

  getItems() {
    this.respostasService.getUsers().subscribe(
      (res) => {
        this.items = res as RegUsuari[];
        console.log(res);
        console.log(this.items);
      },
      (err) => console.log(err)
    );
  }

  getItem(id: string) {
    this.respostasService.getUser(id).subscribe(
      (res) => {
        this.item = res;
        console.log(this.item);
      },
      (err) => console.log(err)
    );
  }

  submitItem() {
    this.item = this.respostasService.selectedRegUsuari;
    const data = this.respostasService.selectedRegUsuari.birthdate;
    const fecha = moment(data, this.FORMATO_SALIDA).toDate();
    this.item.birthdate = fecha;
    this.respostasService.createUser(this.item).subscribe(
      (res) => {
        console.log(res);
        this.editing = false;
        this.getItems();
        this.scrollDown();
        this.resetForm();
        Swal.fire("Exit", "Usuari registrat", "success");
        this.router.navigate(["/component/users"]);
      },
      (err) => console.log(err)
    );
  }

  deleteItem(id: string) {
    console.log(id);
    if (confirm("Are you sure to delete?")) {
      this.respostasService.deleteUser(id).subscribe(
        (res) => {
          this.getItems();
          this.resetForm();
          this.scrollTop();
        },
        (err) => console.log(err)
      );
    }
  }

  editItem() {
    this.item = this.respostasService.selectedRegUsuari;
    console.log(this.item);
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
            username: "",
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

  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
    }
  }

  preEditItem(regUsuari: RegUsuari): void {
    this.respostasService.selectedRegUsuari = Object.assign({}, regUsuari);
    this.editing = true;
    this.scrollTop();
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
