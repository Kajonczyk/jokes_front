import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import {environment} from '../../../environments';

@Injectable({
  providedIn: 'root',
})
export class RequestInterceptor implements HttpInterceptor {
  constructor(
    private cookiesService: CookieService,
    private authService: AuthService,
    private router: Router
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    request = request.clone({
      headers: request.headers.set(
        'Authorization',
        'Bearer ' + this.cookiesService.get('jwt')
      ),
      withCredentials: true,
      url: `${environment.apiUrl}/${request.url}`
    });

    return next.handle(request).pipe(
      catchError((err: any) => {
        if (err.status === 401 || err.status === 403) {
          this.authService.logout().subscribe();
          this.router.navigate(['/login']);
          localStorage.removeItem('userInfo');
        }

        return throwError(err);
      })
    );
  }
}
