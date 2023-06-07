import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RegisterComponent} from './pages/register/register.component';
import {LoginComponent} from './pages/login/login.component';
import {GuestGuardService} from './services/guest-guard.service';
import {LoggedUserGuardService} from './services/logged-user-guard.service';
import {DashboardComponent} from './pages/dashboard/dashboard.component';

const routes: Routes = [
  {path: "register", component: RegisterComponent, canActivate: [GuestGuardService]},
  {path: "login", component: LoginComponent, canActivate: [GuestGuardService]},
  {path: "dashboard", component: DashboardComponent, canActivate: [LoggedUserGuardService]}
  // {path: "dashboard", component: DashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
