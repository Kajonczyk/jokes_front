import {CanActivate, Router} from '@angular/router';
import {AuthService} from './auth.service';
import {Injectable} from '@angular/core';

@Injectable()
export class GuestGuardService implements CanActivate {

	constructor(private authService: AuthService, private router: Router) {
	}

	canActivate() {
		return !this.authService.isLoggedIn()
	}
}
