import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {RegisterComponent} from './register/register.component';
import {GuestGuardService} from '../../guards/guest-guard.service';
import {LoginComponent} from './login/login.component';
import {AppModule} from '../../app.module';

const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [GuestGuardService],
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [GuestGuardService],
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class AuthModule { }
