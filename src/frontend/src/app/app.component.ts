import { Component } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import { SocketService } from '@services/socket/socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private translate: TranslateService,
              public socketService: SocketService){
    // TODO: idioma del navegador por defecto y posibilidad de cambiarlo manualmente
    translate.setDefaultLang('es');
  }
}
