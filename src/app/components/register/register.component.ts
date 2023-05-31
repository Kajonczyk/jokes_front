import { Component } from '@angular/core';
import {FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  registerForm = new FormGroup({
    userName: new FormControl("", [Validators.required, Validators.minLength(3)]),
    password: new FormControl("", [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl("", [Validators.required, Validators.minLength(6)])
  }, [this.arePasswordsEqual()])

  arePasswordsEqual(): ValidatorFn {
    return (formGroup) => {
      const passwordControl = formGroup?.get('password');
      const repeatPasswordControl = formGroup?.get('confirmPassword');
      const doPasswordsMismatch = passwordControl?.value !== repeatPasswordControl?.value;

      passwordControl?.setErrors(doPasswordsMismatch ? {pwdMismatch: true} : null);
      repeatPasswordControl?.setErrors(doPasswordsMismatch ? {pwdMismatch: true} : null);

      return null;
    };
  }

  isFieldValidatedCorrectly(fieldName: "userName" | "password" | "confirmPassword") {
    return !!this.registerForm.controls[fieldName].errors && this.registerForm.controls[fieldName].touched;
  }

  onSubmit(e: Event){
    e.preventDefault()
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
    }
    //@TODO SEND REQUEST
    console.log(this.registerForm.get('userName')?.errors)
    console.log(this.registerForm.get('password')?.errors)
    console.log(this.registerForm.get('confirmPassword')?.errors)

    console.log("VALIDA")
  }
}
