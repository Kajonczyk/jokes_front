import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Room } from '../types/room';
import { environment } from '../../../environments';
import { Store } from '@ngrx/store';
import { AppState } from '../types/appState';
import { tap } from 'rxjs';
import * as RoomsActions from '../store/actions/rooms.action';

@Injectable({
  providedIn: 'root',
})
export class RoomsService {
  constructor(
    private httpService: HttpClient,
    private store: Store<AppState>
  ) {}

  getRooms() {
    return this.httpService.get<Room[]>(`room`);
  }
}
