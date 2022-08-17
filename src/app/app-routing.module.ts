import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ControllerComponent } from './pages/controller/controller.component';
import { HistoriqueComponent } from './pages/historique/historique.component';
import { HomeComponent } from './pages/home/home.component';
import { LastTripComponent } from './pages/last-trip/last-trip.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfilComponent } from './pages/profil/profil.component';
import { RegisterComponent } from './pages/register/register.component';
import { SettingsComponent } from './pages/settings/settings.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },

  {
  path:"login",
  component:LoginComponent
  },
  {
    path:'register',
    component:RegisterComponent
  },
  {
    path:'home',
    component:HomeComponent
  },
  {
    path:'profil',
    component:ProfilComponent
  },
  {
    path:'historique',
    component:HistoriqueComponent
  },
  {
    path:'controller',
    component:ControllerComponent
  },
  {
    path:'lastTrip',
    component:LastTripComponent
  },
  {
    path:'settings',
    component:SettingsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
