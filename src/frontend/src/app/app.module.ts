import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { PerfilComponent } from '@components/perfil/perfil.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from '@components/common/header/header.component';
import { FooterComponent } from '@components/common/footer/footer.component';
import { ConfirmationDialogComponent } from '@components/common/confirmation-dialog/confirmation-dialog.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AboutComponent } from '@components/about/about.component';
import { LoginComponent } from '@components/access/login/login.component';
import { LogoutComponent } from '@components/access/logout/logout.component';
import { RegistrationComponent } from '@components/access/registration/registration.component';

import { SocketService } from '@services/socket/socket.service';
import { AuthenticationService } from '@services/authentication/authentication.service';

import {ResponseInterceptor} from '@interceptors/response.interceptor';
import {RequestInterceptor} from '@interceptors/request.interceptor';

import { NgxLoadingModule, ngxLoadingAnimationTypes } from 'ngx-loading';
import { HospitalComponent } from './components/hospital/hospital.component';
import { BedComponent } from './components/bed/bed.component';
import { NotificationsComponent } from './components/common/notifications/notifications.component';
import { BreadCrumbsComponent } from './components/common/bread-crumbs/bread-crumbs.component';
import { FloorsComponent } from './components/floors/floors.component';
import { AreasComponent } from './components/areas/areas.component';
import { RoomsComponent } from './components/rooms/rooms.component';
import { BedsComponent } from './components/beds/beds.component';
import { AlarmsComponent } from './components/alarms/alarms.component';
import { ChartsModule } from 'ng2-charts';
import { FormDialogComponent } from './components/common/form-dialog/form-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    PerfilComponent,
    HeaderComponent,
    FooterComponent,
    ConfirmationDialogComponent,
    AboutComponent,
    LoginComponent,
    LogoutComponent,
    RegistrationComponent,
    HospitalComponent,
    BedComponent,
    NotificationsComponent,
    BreadCrumbsComponent,
    FloorsComponent,
    AreasComponent,
    RoomsComponent,
    BedsComponent,
    AlarmsComponent,
    FormDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
    }),
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatMenuModule,
    MatCheckboxModule,
    FormsModule,
    MatDialogModule,
    ReactiveFormsModule,
    NgxLoadingModule.forRoot({
      animationType: ngxLoadingAnimationTypes.threeBounce,
      backdropBackgroundColour: 'rgba(1,1,1,0.43)', 
      backdropBorderRadius: '4px',
      primaryColour: '#fff', 
      secondaryColour: '#fff', 
      tertiaryColour: '#fff'
    }),
    ChartsModule
  ],
  providers: [
    SocketService,
    AuthenticationService,
    { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ResponseInterceptor, multi: true }
  ],
  exports: [
    SocketService,
    AuthenticationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
