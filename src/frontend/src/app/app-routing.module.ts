import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';import { 
  AuthGuardService as AuthGuard 
} from '@services/authentication/auth-guard.service';
import { LoginComponent } from '@components/access/login/login.component';
import { LogoutComponent } from '@components/access/logout/logout.component';
import { RegistrationComponent } from '@components/access/registration/registration.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { AboutComponent } from './components/about/about.component';
import { HospitalComponent } from './components/hospital/hospital.component';
import { FloorComponent } from './components/floor/floor.component';
import { AreaComponent } from './components/area/area.component';
import { RoomComponent } from './components/room/room.component';
import { BedComponent } from './components/bed/bed.component';


const routes: Routes = [
  { path: '', redirectTo: 'hospital', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'logout', component: LogoutComponent, canActivate: [AuthGuard] },
  { path: 'hospital', component: HospitalComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: PerfilComponent, canActivate: [AuthGuard] },
  { path: 'about', component: AboutComponent, canActivate: [AuthGuard]  },
  { path: 'floor', component: FloorComponent, canActivate: [AuthGuard]  },
  { path: 'area', component: AreaComponent, canActivate: [AuthGuard]  },
  { path: 'area/:id', component: AreaComponent, canActivate: [AuthGuard]  },
  { path: 'room', component: RoomComponent, canActivate: [AuthGuard]  },
  { path: 'room/:id', component: RoomComponent, canActivate: [AuthGuard]  },
  { path: 'bed/:id', component: BedComponent, canActivate: [AuthGuard]  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {}
