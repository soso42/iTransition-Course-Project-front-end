import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from "../service/auth.service";

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate() {
    if (!this.authService.isUserLoggedIn()) {
      this.router.navigateByUrl('error403');
      return false;
    }
    return true;
  }

}
