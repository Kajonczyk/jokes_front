import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Login, Register, User} from '../types/user';
import jwt_decode from 'jwt-decode';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	constructor(private httpService: HttpClient) {
	}

	register(data: Register) {
		const {confirmPassword, ...dataToSend} = data;
		return this.httpService.post<string>(`auth/register`, dataToSend);
	}

	decodeJWT(token: string) {
		const user = jwt_decode(token) as User;
		localStorage.setItem('userInfo', JSON.stringify(user));
		return user;
	}

	login(data: Login) {
		return this.httpService.post<string>(`auth/login`, data);
	}

	isLoggedIn() {
		return !!localStorage.getItem('userInfo');
	}

	logout() {
		return this.httpService.get(`auth/logout`);
	}
}
