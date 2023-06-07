import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Login, Register, User} from '../types/user';
import {environment} from '../../../environments';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {map, mergeMap, tap} from 'rxjs';
import {Store} from '@ngrx/store';
import {AppState} from '../types/appState';
import jwt_decode from 'jwt-decode';
import {UserService} from './user.service';
import * as UserActions from "../store/actions/user.action"
@Injectable({
	providedIn: "root"
})
export class AuthService {

	constructor(private httpService: HttpClient, private cookiesService: CookieService, private router: Router, private store: Store<AppState>, private userService: UserService){
	}

	setJWTToken(token: string){
		this.cookiesService.set("jwt", token)
	}

	register(data: Register){
		const {confirmPassword, ...dataToSend} = data
		return this.httpService.post<string>(`${environment.apiUrl}/auth/register`, dataToSend).pipe(
			tap(token => {
				this.router.navigate(["/dashboard"])
				this.setJWTToken(token)
			})
		)
	}

	login(data: Login){
		return this.httpService.post<string>(`${environment.apiUrl}/auth/login`, data).pipe(
			map( token => {
				const decodedToken = jwt_decode(token) as User
				this.setJWTToken(token)
				return decodedToken
			}),
			mergeMap((decodedToken: any) => this.userService.getUserInfo(decodedToken.id)),
			tap((data) => {
				this.store.dispatch(UserActions.setUserData({user: data}))
				this.router.navigate(["/dashboard"])

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
