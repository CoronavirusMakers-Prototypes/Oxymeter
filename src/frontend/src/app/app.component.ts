import { Component, OnDestroy } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import { SocketService } from '@services/socket/socket.service';
import { GlobalService } from '@services/global/global.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy{
  public loading: boolean;
  public logged: boolean;
  private loadingSubscription: Subscription;
  private loggedSubscription: Subscription;
  constructor(private translate: TranslateService,
              public socketService: SocketService,
              public globalService: GlobalService){
    // TODO: idioma del navegador por defecto y posibilidad de cambiarlo manualmente
    translate.setDefaultLang('es');
    this.logged = globalService.authService.isAuthenticated();
    this.loadingSubscription = globalService.loading$.subscribe( value => {
      this.loading = value;
    });
    this.loggedSubscription = globalService.authService.logged$.subscribe( value => {
      this.logged = value;
    });
  }

  ngOnDestroy() {
    this.loadingSubscription.unsubscribe();
    this.loggedSubscription.unsubscribe();
  }
}
