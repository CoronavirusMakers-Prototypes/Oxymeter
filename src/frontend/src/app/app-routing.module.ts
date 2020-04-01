import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';import { 
  AuthGuardService as AuthGuard 
} from '@services/authentication/auth-guard.service';
import { LoginComponent } from '@components/access/login/login.component';
import { LogoutComponent } from '@components/access/logout/logout.component';
import { RegistrationComponent } from '@components/access/registration/registration.component';
import { HomeComponent } from './components/home/home.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { AboutComponent } from './components/about/about.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'logout', component: LogoutComponent, canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: PerfilComponent, canActivate: [AuthGuard] },
  { path: 'about', component: AboutComponent, canActivate: [AuthGuard]  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {}
