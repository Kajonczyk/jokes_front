import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
import { RoomsService } from './services/rooms.service';
import { AppState } from './types/appState';
import { Store } from '@ngrx/store';
import { AuthService } from './services/auth.service';
import * as UserActions from './store/actions/user.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'front';

  constructor(
    private userService: UserService,
    private roomsService: RoomsService,
    private authService: AuthService,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    const user = localStorage.getItem('userInfo');

    if (!user) {
      return;
    }

    this.store.dispatch(UserActions.setUserData({ user: JSON.parse(user) }));
  }
}
