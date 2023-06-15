import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login, Register, User } from '../types/user';
import { environment } from '../../../environments';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { map, mergeMap, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../types/appState';
import jwt_decode from 'jwt-decode';
import { UserService } from './user.service';
import * as UserActions from '../store/actions/user.action';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private httpService: HttpClient,
    private cookiesService: CookieService,
    private router: Router,
    private store: Store<AppState>,
    private userService: UserService
  ) {}

  register(data: Register) {
    const { confirmPassword, ...dataToSend } = data;
    return this.httpService
      .post<string>(`auth/register`, dataToSend)
      .pipe(
        tap((token) => {
          this.router.navigate(['/']);
        })
      );
  }

  decodeJWT(token: string) {
    const user = jwt_decode(token) as User;
    localStorage.setItem('userInfo', JSON.stringify(user));
    return user;
  }

  login(data: Login) {
    return this.httpService
      .post<string>(`auth/login`, data)
      .pipe(
        map((token) => this.decodeJWT(token)),
        mergeMap(() => this.userService.getUserInfo()),
        tap((data) => {
          this.store.dispatch(UserActions.setUserData({ user: data }));
          this.router.navigate(['/']);
        })
      );
  }

  isLoggedIn() {
    return !!localStorage.getItem('userInfo');
  }

  logout() {
    localStorage.removeItem('userInfo');
  }
}
