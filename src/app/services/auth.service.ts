import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Login, Register} from '../types/user';
import {environment} from '../../../environments';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {tap} from 'rxjs';

@Injectable({
	providedIn: "root"
})
export class AuthService {

	constructor(private httpService: HttpClient, private cookiesService: CookieService, private router: Router){
	}

	setJWTToken(token: string){
		this.cookiesService.set("jwt", token)
	}

	register(data: Register){
		const {confirmPassword, ...dataToSend} = data
		return this.httpService.post<string>(`${environment.apiUrl}/auth/register`, dataToSend).pipe(
			tap(token => {
				this.router.navigate([""])
				this.setJWTToken(token)
			})
		)
	}

	login(data: Login){
		return this.httpService.post<string>(`${environment.apiUrl}/auth/login`, data).pipe(
			tap(token => {
				this.router.navigate([""])
				this.setJWTToken(token)
			})
		)
	}


	isLoggedIn(){
		return !!this.cookiesService.get("jwt")
	}

	logout(){
		this.cookiesService.delete("jwt")
	}


}
