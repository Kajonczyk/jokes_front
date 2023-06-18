import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { InputComponent } from './components/input/input.component';
import { ButtonComponent } from './components/button/button.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JokesBackgroundComponent } from './components/jokes-background/jokes-background.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RequestInterceptor } from './interceptors/request.interceptor';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { StoreModule } from '@ngrx/store';
import { userReducer } from './store/reducers/user.reducer';
import { roomsReducer } from './store/reducers/rooms.reducer';
import { RoomComponent } from './pages/room/room.component';
import { CardComponent } from './components/card/card.component';
import { PlayerComponent } from './components/player/player.component';
import { roomReducer } from './store/reducers/room.reducer';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { ModalComponent } from './components/modal/modal.component';
import {EffectsModule} from '@ngrx/effects';
import {RoomEffects} from './store/effects/room.effects';
import {RoomsEffects} from './store/effects/rooms.effects';
import {UserEffects} from './store/effects/user.effects';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    InputComponent,
    ButtonComponent,
    JokesBackgroundComponent,
    DashboardComponent,
    RoomComponent,
    CardComponent,
    PlayerComponent,
    DropdownComponent,
    ModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    StoreModule.forRoot({
      user: userReducer,
      rooms: roomsReducer,
      room: roomReducer,
    }),
    EffectsModule.forRoot([RoomEffects, RoomsEffects, UserEffects])
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
