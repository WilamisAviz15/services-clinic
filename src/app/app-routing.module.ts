import { RegisterComponent } from './account/register/register.component';
import { AuthGuard } from './shared/auth/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutenticationComponent } from './account/autentication/autentication.component';
import { LoginComponent } from './account/login/login.component';
import { MainComponent } from './pages/main/main.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AppointmentsComponent } from './pages/appointments/appointments.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [],
    canActivate: [AuthGuard],
  },
  {
    path: 'appointment',
    component: AppointmentsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '',
    component: AutenticationComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
