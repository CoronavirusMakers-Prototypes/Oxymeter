import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from "rxjs";
import { tap, catchError } from "rxjs/operators";
import { Router } from '@angular/router';

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    return next.handle(request).pipe(
        catchError((err: any) => {
            if(err instanceof HttpErrorResponse) {
                console.log(err)
                if(err.status === 401){
                    this.router.navigate([`/logout`]);
                }
            }
            return throwError(err);
        }));
  }
}
