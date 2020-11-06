import { Component, OnInit } from "@angular/core";
import { RespostasService } from "../../services/respostas.service";

import { LoginUsuari } from "../../models/loginUsuari.model";
import { NgForm } from "@angular/forms";
import { Router, RouterModule } from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  item: LoginUsuari = {
    nif: "",
    password: "",
  };

  constructor(
    public respostasService: RespostasService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.item = {
      nif: "",
      password: "",
    };
    this.respostasService.selectedLogUsuari = this.item;
  }

  submitItem() {
    this.item = this.respostasService.selectedLogUsuari;
    this.respostasService.login(this.item).subscribe(
      (res) => {
        this.scrollDown();
        this.router.navigate(["/component/users"]);
      },
      (err) => {
        Swal.fire("NIF o Password incorrectos", err.error.msg, "error");
        console.log(err);
      }
    );
  }

  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
    }
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
