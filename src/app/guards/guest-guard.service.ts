import { CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: "root"
})
export class GuestGuardService implements CanActivate {
  constructor(private authService: AuthService) {}

  canActivate() {
    return !this.authService.isLoggedIn();
  }
}
