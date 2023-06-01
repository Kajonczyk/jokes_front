import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import { Observable } from 'rxjs';
import {CookieService} from 'ngx-cookie-service';


@Injectable({
	providedIn: "root"
})
export class RequestInterceptor implements HttpInterceptor {
	constructor(private cookiesService: CookieService) {}

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		request = request.clone({
			headers: request.headers.set("Authorization", 'Bearer ' + this.cookiesService.get('jwt'))
		});
		return next.handle(request);
	}
}
