import { Component, OnDestroy } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import { SocketService } from '@services/socket/socket.service';
import { GlobalService } from '@services/global/global.service';
import { Subscription } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';
import { BrowserStack } from 'protractor/built/driverProviders';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy{
  public loading: boolean;
  public logged: boolean;
  public showBreadCrumb: boolean;
  private loadingSubscription: Subscription;
  private loggedSubscription: Subscription;
  private routerEventsSubscription: Subscription;
  constructor(private translate: TranslateService,
              public socketService: SocketService,
              public globalService: GlobalService,
              private router: Router){
    // TODO: idioma del navegador por defecto y posibilidad de cambiarlo manualmente
    translate.setDefaultLang('es');
    this.logged = globalService.authService.isAuthenticated();
    this.loadingSubscription = globalService.loading$.subscribe( value => {
      this.loading = value;
    });
    this.loggedSubscription = globalService.authService.logged$.subscribe( value => {
      this.logged = value;
    });
    this.routerEventsSubscription = router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const route = event.url;
        const routesWithoutBreadCrumbs = ['profile','about','bed','notifications'];
        this.showBreadCrumb = true;
        routesWithoutBreadCrumbs.forEach( r => {
          if (route.indexOf(r) >= 0){
            this.showBreadCrumb = false;
          }
        });
      }
    });
  }

  ngOnDestroy() {
    this.loadingSubscription.unsubscribe();
    this.loggedSubscription.unsubscribe();
  }
}
