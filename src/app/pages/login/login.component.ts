import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Login} from '../../types/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {


  constructor(private authService: AuthService) {
  }

  loginForm = new FormGroup({
    userName: new FormControl("kajonczykowaty", [Validators.required,Validators.minLength(3)]),
    password: new FormControl("kajonczykowaty", [Validators.required,Validators.minLength(6)])
  })


  isFieldValidatedCorrectly(fieldName: "userName" | "password") {
    return !!this.loginForm.controls[fieldName].errors && this.loginForm.controls[fieldName].touched;
  }

  onSubmit(e: Event){
    e.preventDefault()
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
    }
    this.authService.login(this.loginForm.value as Login).subscribe((data) => {console.log("jest kox", data)}, (err) => {console.log("jebło", err)})
  }

}
