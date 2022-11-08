import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "../service/auth.service";
import { Form, NgForm } from "@angular/forms";
import { FormBuilder } from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  error: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  authenticate(form: NgForm) {
    localStorage.clear();
    this.authService.login(form.value.username, form.value.password).subscribe(res => {
      localStorage.setItem('token', res.token);
      this.authService.setUserStatusLoggedIn();
      this.router.navigateByUrl('/');
    }, err => {
      this.error = err.message;
    });
  }

}
