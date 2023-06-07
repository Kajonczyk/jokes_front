import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';
import {Login, Register, User} from '../types/user';
import {environment} from '../../../environments';
import {tap} from 'rxjs';


@Injectable({
	providedIn: "root"
})
export class UserService {

	constructor(private httpService: HttpClient){
	}

	getUserInfo(id: string){
		return this.httpService.get<User>(`${environment.apiUrl}/users/user`).pipe(
			tap(data => {
				console.log("DATUWAAAAA")
				// this.router.navigate(["/dashboard"])
				// this.setJWTToken(token)
			})
		)
	}


}
