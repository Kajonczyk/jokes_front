import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, EMPTY, switchMap} from 'rxjs';
import {mergeMap} from 'rxjs/operators';
import {RoomService} from '../../services/room.service';
import * as RoomActions from '../actions/room.action';
import {FETCH_ROOM_INFO} from '../actions/room.action';


@Injectable()
export class RoomEffects {
	constructor(
		private actions$: Actions,
		private roomService: RoomService
	) {
	}

	fetchRoom$ = createEffect(() => this.actions$.pipe(
			ofType(FETCH_ROOM_INFO),
			mergeMap((action: { roomId: string }) => this.roomService.getRoomInfo(action.roomId)
				.pipe(
					switchMap(({roomInfo, pastJokes, points, joke}) => {
						return [
							RoomActions.setRoomInfo({roomInfo}),
							RoomActions.setRoomPastJokes({pastJokes}),
							RoomActions.setRoomPoints({points}),
							RoomActions.setRoomJoke({joke})
						];
					}),
					catchError(() => EMPTY)
				))
		)
	);


}
