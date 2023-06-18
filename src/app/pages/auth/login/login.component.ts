import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {map, mergeMap, tap } from 'rxjs/operators';
import { AuthService } from '../../../services/auth.service';
import { Login } from '../../../types/user';
import {UserService} from '../../../services/user.service';
import {Store} from '@ngrx/store';
import {AppState} from '../../../types/appState';
import {fetchUserData} from '../../../store/actions/user.action';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(private authService: AuthService, private userService: UserService, private store: Store<AppState>, private router: Router) {}

  loginForm = new FormGroup({
    userName: new FormControl('kajonczykowaty', [
      Validators.required,
      Validators.minLength(3),
    ]),
    password: new FormControl('kajonczykowaty', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  isFieldValidatedCorrectly(fieldName: 'userName' | 'password') {
    return (
      !!this.loginForm.controls[fieldName].errors &&
      this.loginForm.controls[fieldName].touched
    );
  }

  onSubmit(e: Event) {
    e.preventDefault();
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
    }

    this.authService.login(this.loginForm.value as Login).pipe(
      tap(() => this.store.dispatch(fetchUserData()))
    ).subscribe()
  }
}
