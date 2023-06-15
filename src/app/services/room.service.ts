import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GamePoint, Joke, RoomInfo} from '../types/room';
import {forkJoin, map, mergeMap} from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class RoomService {
	constructor(
		private httpService: HttpClient
	) {
	}

	getRoomInfo(roomId: string) {
		return this.httpService.get<RoomInfo>(`room/${roomId}`).pipe(
			mergeMap((roomInfo) => {
				return forkJoin([
					this.httpService.get<GamePoint[]>(
						`game/${roomInfo.gameId}/points`
					),
					this.httpService.get<Joke[]>(
						`game/${roomInfo.gameId}/joke?all=true`
					)
				]).pipe(
					map(([points, pastJokes]) => ({points, pastJokes, roomInfo}))
				);
			})
		);
	}
}
