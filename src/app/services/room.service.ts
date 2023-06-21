import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Game, GamePoint, Joke, RoomInfo} from '../types/room';
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
					),
					this.httpService.get<Joke>(
						`game/${roomInfo.gameId}/joke`
					)
				]).pipe(
					map(([points, pastJokes, joke]) => ({points, pastJokes, joke, roomInfo}))
				);
			})
		);
	}

	tellJoke(gameId: string, content: string){
		return this.httpService.post(`game/${gameId}/joke`, {content})
	}

	finishTurn(gameId: string, roomId: string){
		return this.httpService.post(`game/${gameId}/turns`, {roomId})
	}

}

