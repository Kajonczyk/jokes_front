import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GamePoint, Joke, RoomInfo } from '../types/room';
import { environment } from '../../../environments';
import { Store } from '@ngrx/store';
import { AppState } from '../types/appState';
import { forkJoin, mergeMap, of, tap } from 'rxjs';
import * as RoomActions from '../store/actions/room.action';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  constructor(
    private httpService: HttpClient,
    private store: Store<AppState>
  ) {}

  getRoomInfo(roomId: string) {
    return of(1).pipe(
      mergeMap(() =>
        this.httpService.get<RoomInfo>(`${environment.apiUrl}/room/${roomId}`)
      ),
      tap((roomInfo) => {
        this.store.dispatch(RoomActions.setRoomInfo({ roomInfo }));
        return roomInfo;
      }),
      mergeMap((res) => {
        return forkJoin([
          this.httpService.get<GamePoint[]>(
            `${environment.apiUrl}/game/${res.gameId}/points`
          ),
          this.httpService.get<Joke[]>(
            `${environment.apiUrl}/game/${res.gameId}/joke?all=true`
          ),
        ]);
      }),
      tap(([points, pastJokes]) => {
        this.store.dispatch(RoomActions.setRoomPastJokes({ pastJokes }));
        this.store.dispatch(RoomActions.setRoomPoints({ points }));
      })
    );
  }
}
