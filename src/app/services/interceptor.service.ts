import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(public router:Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap(evt=>{
        if(evt instanceof HttpResponse){

          // if(evt.body.search("You are not authorized.Kindly try again") >=0){
          //   return true
          // }else{
          //   this.router.navigate(["login"]);
          // }
          // console.log("interceptor "+evt.body);
        }
      })
    )
  }
}
