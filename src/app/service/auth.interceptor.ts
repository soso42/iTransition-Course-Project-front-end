import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

  OPEN_ENDPOINTS: string[] = ["/signup", "/search/*", "/collection", "/tags/all", "/item/id=*", "/item/latest", "/comment/all/item-id=*"];

  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = localStorage.getItem('token');

    if (token === null || this.apiIsOpen(req.url)) {
      return next.handle(req);
    }

    const req1 = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + token),
    });
    return next.handle(req1);
  }

  apiIsOpen(url: string) {
    let endpoint = url.replace(environment.API_PATH, "");
    return this.OPEN_ENDPOINTS.includes(endpoint);
  }

}
