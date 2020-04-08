import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse, HttpErrorResponse }   from '@angular/common/http';
import { Observable, of, throwError } from "rxjs";
import { tap, catchError } from "rxjs/operators";
import { GlobalService } from '@app/services/global/global.service';

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {
  constructor(private globalService: GlobalService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    return next.handle(request).pipe(
        catchError((err: any) => {
            if(err instanceof HttpErrorResponse) {
                if(err.status === 401 && err.error){
                    this.globalService.logout();
                }
            }
            return throwError(err);
        }));
  }
}
