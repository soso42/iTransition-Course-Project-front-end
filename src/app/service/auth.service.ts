import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Router } from "@angular/router";
import { ObservableStore } from "@codewithdan/observable-store";
import { StoreState } from "../interfaces/storestate";
import { BehaviorSubject } from "rxjs";


export interface AuthResponseData {
  token: string
}

@Injectable({providedIn: 'root'})
export class AuthService extends ObservableStore<StoreState> {

  private loginStatus = new BehaviorSubject<boolean>(this.isUserLoggedIn());

  constructor(private http: HttpClient, private router: Router) {
    super({ trackStateHistory: true, logStateChanges: true });

    this.loginStatus.subscribe((result) => {
      this.setState({ loggedInStatus: result }, 'Logged_in_status');
    });
  }

  signup(username: string, password: string, email: string) {
    return this.http.post(environment.API_PATH + '/signup', {username, password, email});
  }

  login(username: string, password: string) {
    return this.http.post<AuthResponseData>(environment.API_PATH + '/auth', { username, password });
  }

  logout() {
    localStorage.removeItem('token');
    this.loginStatus.next(false);
    this.router.navigateByUrl('login');
  }

  setUserStatusLoggedIn() {
    this.loginStatus.next(true);
  }

  getToken(): string {
    let token = localStorage.getItem('token');
    return token !== null ? token : '';
  }

  getValuesFromToken() {
    const token = this.getToken();
    if (token !== '') {
      const payload = token.split('.')[1];
      return JSON.parse(window.atob(payload));
    } else {
      return {};
    }
  }

  getLoggedInUsername() {
    let value = this.getValuesFromToken();
    return value.sub;
  }

  isLoggedInUserAdmin(): boolean {
    if(!this.isUserLoggedIn()){
      return false;
    }
    let values = this.getValuesFromToken();
    return values.role.includes('ADMIN');
  }

  userHasWriteAccess(owner: string) {
    if (!this.isUserLoggedIn()) {
      return false;
    }
    return this.isLoggedInUserAdmin() || owner == this.getLoggedInUsername();
  }

  // Logged in logic
  isUserLoggedIn() {
    if (this.getToken() === '') {
      return false;
    }
    return !this.isTokenExpired();
  }

  isTokenExpired() {
    let expDate = new Date(0);
    expDate.setUTCSeconds(this.getValuesFromToken().exp);
    let dateNow = new Date();
    return dateNow > expDate;
  }

}
