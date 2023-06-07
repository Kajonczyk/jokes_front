import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './pages/register/register.component';
import { InputComponent } from './components/input/input.component';
import { ButtonComponent } from './components/button/button.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { JokesBackgroundComponent } from './components/jokes-background/jokes-background.component';
import { LoginComponent } from './pages/login/login.component';
import {AuthService} from './services/auth.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {RequestInterceptor} from './interceptors/request.interceptor';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import {GuestGuardService} from './services/guest-guard.service';
import {LoggedUserGuardService} from './services/logged-user-guard.service';
import {RoomsService} from './services/rooms.service';
import {StoreModule} from '@ngrx/store';
import {userReducer} from './store/reducers/user.reducer';
import {UserService} from './services/user.service';
import {roomsReducer} from './store/reducers/rooms.reducer';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    InputComponent,
    ButtonComponent,
    JokesBackgroundComponent,
    LoginComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    StoreModule.forRoot({user: userReducer, rooms: roomsReducer}),
  ],
  providers: [AuthService, UserService, GuestGuardService, LoggedUserGuardService, RoomsService, {
    provide: HTTP_INTERCEPTORS,
    useClass: RequestInterceptor,
    multi: true,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
