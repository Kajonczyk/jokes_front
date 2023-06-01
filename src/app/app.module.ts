import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';
import { InputComponent } from './components/input/input.component';
import { ButtonComponent } from './components/button/button.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { JokesBackgroundComponent } from './components/jokes-background/jokes-background.component';
import { LoginComponent } from './components/login/login.component';
import {AuthService} from './services/auth.service';
import {HttpClientModule} from '@angular/common/http';
import {RequestInterceptor} from './interceptors/request.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    InputComponent,
    ButtonComponent,
    JokesBackgroundComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [AuthService, RequestInterceptor],
  bootstrap: [AppComponent]
})
export class AppModule { }
