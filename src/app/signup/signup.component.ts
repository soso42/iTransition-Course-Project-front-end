import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { AuthService } from "../service/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onClickSignUp(form: NgForm) {
    localStorage.clear();
    this.authService.signup(form.value.username, form.value.password, form.value.email).subscribe(res => {
      console.log(res);
      this.router.navigateByUrl('login');
    }, error => {
      console.log(error);
    });
  }

}
