import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: "root"
})
export class LoggedUserGuardService implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate() {
    console.log("IS AKTIWEJT", this.authService.isLoggedIn())
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['login']);
      return false;
    } else {
      return true;
    }
  }
}
