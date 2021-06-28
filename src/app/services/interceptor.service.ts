import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(public router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("inte call")
    const reqBody = req.body;
    if (reqBody.search("authBuilderUser") == -1 || reqBody.search("GET_LINK_DETAILS") == -1) {
      if (localStorage.getItem("auth-token") == null) {
        this.router.navigate(['/login'])
      } else {
        return next.handle(req)
      }
    } else {
      return next.handle(req)
    }

    return next.handle(req)
  }
}
