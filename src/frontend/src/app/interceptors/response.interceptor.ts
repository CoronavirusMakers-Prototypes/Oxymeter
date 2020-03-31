import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse, HttpErrorResponse }   from '@angular/common/http';
import { Observable, of, throwError } from "rxjs";
import { AuthenticationService } from "@services/authentication/authentication.service";
import { tap, catchError } from "rxjs/operators";

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    return next.handle(request).pipe(
        catchError((err: any) => {
            if(err instanceof HttpErrorResponse) {
                if(err.status === 401 && err.error){
                    this.authenticationService.logout();
                }
            }
            return throwError(err);
        }));
  }
}
