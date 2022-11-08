import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from "../service/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate() {
    if (!this.authService.isLoggedInUserAdmin()) {
      this.router.navigateByUrl('error403');
      return false;
    }
    return true;
  }

}
