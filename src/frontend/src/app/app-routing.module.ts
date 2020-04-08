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
import { FloorsComponent } from './components/floors/floors.component';
import { AreasComponent } from './components/areas/areas.component';
import { RoomsComponent } from './components/rooms/rooms.component';
import { BedsComponent } from './components/beds/beds.component';
import { BedComponent } from './components/bed/bed.component';
import { AlarmsComponent } from './components/alarms/alarms.component';


const routes: Routes = [
  { path: '', redirectTo: 'notifications', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'about', component: AboutComponent },
  { path: 'logout', component: LogoutComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: PerfilComponent, canActivate: [AuthGuard] },
  { path: 'about', component: AboutComponent, canActivate: [AuthGuard]  },
  { path: 'alarms', component: AlarmsComponent, canActivate: [AuthGuard]  },
  { path: 'hospital', component: HospitalComponent, canActivate: [AuthGuard] }, // Muestra el listado de buildings
  { path: 'building/:id', component: FloorsComponent, canActivate: [AuthGuard]  }, // Muestra las plantas
  { path: 'floor/:id', component: AreasComponent, canActivate: [AuthGuard]  }, // Muestra las areas
  { path: 'area/:id', component: RoomsComponent, canActivate: [AuthGuard]  }, // Muestra las habitaciones
  { path: 'room/:areaId/:id', component: BedsComponent, canActivate: [AuthGuard]  }, // Muestra las camas
  { path: 'bed/:id', component: BedComponent, canActivate: [AuthGuard]  } // Muestra la cama
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {}
