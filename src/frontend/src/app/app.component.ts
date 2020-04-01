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
  private loadingSubscription: Subscription;
  constructor(private translate: TranslateService,
              public socketService: SocketService,
              public globalService: GlobalService){
    // TODO: idioma del navegador por defecto y posibilidad de cambiarlo manualmente
    translate.setDefaultLang('es');
    this.loadingSubscription = globalService.loading$.subscribe( value => {
      this.loading = value;
    });
  }

  ngOnDestroy() {
    this.loadingSubscription.unsubscribe();
  }
}
