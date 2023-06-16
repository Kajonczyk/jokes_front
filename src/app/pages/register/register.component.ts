import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Register } from '../../types/user';
import {Router} from '@angular/router';
import {tap} from 'rxjs/operators';
import {fetchUserData} from '../../store/actions/user.action';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  constructor(private authService: AuthService, private router: Router, private store: Store) {}

  registerForm = new FormGroup(
    {
      userName: new FormControl('kajonczykowaty', [
        Validators.required,
        Validators.minLength(3),
      ]),
      password: new FormControl('kajonczykowaty', [
        Validators.required,
        Validators.minLength(6),
      ]),
      confirmPassword: new FormControl('kajonczykowaty', [
        Validators.required,
        Validators.minLength(6),
      ]),
    },
    [this.arePasswordsEqual()]
  );

  arePasswordsEqual(): ValidatorFn {
    return (formGroup) => {
      const passwordControl = formGroup?.get('password');
      const repeatPasswordControl = formGroup?.get('confirmPassword');
      const doPasswordsMismatch =
        passwordControl?.value !== repeatPasswordControl?.value;

      passwordControl?.setErrors(
        doPasswordsMismatch ? { pwdMismatch: true } : null
      );
      repeatPasswordControl?.setErrors(
        doPasswordsMismatch ? { pwdMismatch: true } : null
      );

      return null;
    };
  }

  isFieldValidatedCorrectly(
    fieldName: 'userName' | 'password' | 'confirmPassword'
  ) {
    return (
      !!this.registerForm.controls[fieldName].errors &&
      this.registerForm.controls[fieldName].touched
    );
  }

  onSubmit(e: Event) {
    e.preventDefault();
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
    }

    this.authService.register(this.registerForm.value as Register).pipe(
      tap(() => this.store.dispatch(fetchUserData()))
    ).subscribe();
  }
}
