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

    if(mockRoutes[request.url]){
      request = new HttpRequest('GET', mockRoutes[request.url] );
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
