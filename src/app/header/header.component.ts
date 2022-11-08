import { Component, OnInit } from '@angular/core';
import { AuthService } from "../service/auth.service";
import { BehaviorSubject } from "rxjs";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  searchTerm: string = '';

  loginStatus = new BehaviorSubject<Boolean>(false);

  constructor(public authService: AuthService, private router: Router) {
    this.authService.globalStateChanged.subscribe(state => {
      this.loginStatus.next(state.loggedInStatus);
    });
  }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    this.redirectTo('search/' + this.searchTerm);
    if (form.valid) {
      form.reset();
    }
  }

  redirectTo(uri:string){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
      this.router.navigate([uri]));
  }

}
