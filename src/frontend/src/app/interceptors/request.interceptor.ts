import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor
} from '@angular/common/http';
import { AuthenticationService } from '@services/authentication/authentication.service';
import { mockRoutes } from '../../assets/mocks/mockRoutes';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    // add authorization header with token if available
    const token = this.authenticationService.getToken();

    const url = request.url.split('?');

    if (mockRoutes[url[0]]){
      request = new HttpRequest('GET', mockRoutes[url[0]] );
    }

    let authReq: any = null;

    if(token && token !== 'undefined'){
      authReq = request.clone({
        headers: request.headers
          .set('Accept', 'application/json;charset=UTF-8')
          .set('Content-Type', 'application/json;charset=UTF-8')
          .set('Authorization', 'Bearer '+token)
      });
    }else{
      authReq = request.clone({
        headers: request.headers
          .set('Accept', 'application/json;charset=UTF-8')
          .set('Content-Type', 'application/json;charset=UTF-8')
      });
    }

    return next.handle(authReq);
  }
}
