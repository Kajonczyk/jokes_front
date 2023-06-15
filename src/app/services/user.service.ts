import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../types/user';
import { environment } from '../../../environments';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpService: HttpClient) {}

  getUserInfo(): Observable<User> {
    return this.httpService.get<User>(`users/user`);
  }
}
