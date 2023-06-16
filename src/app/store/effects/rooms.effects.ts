import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, EMPTY, switchMap} from 'rxjs';
import {mergeMap} from 'rxjs/operators';
import * as RoomsActions from '../actions/rooms.action';
import {FETCH_ROOMS_DATA, SET_ROOMS_DATA} from '../actions/rooms.action';
import {RoomsService} from '../../services/rooms.service';

@Injectable()
export class RoomsEffects {
	constructor(
		private actions$: Actions,
		private roomsService: RoomsService
	) {
	}

	fetchRooms$ = createEffect(() => this.actions$.pipe(
			ofType(FETCH_ROOMS_DATA),
			mergeMap((action) => this.roomsService.getRooms()
				.pipe(
					mergeMap((rooms) => {
						return [RoomsActions.setRoomsData({rooms})];
					}),
					catchError(() => EMPTY)
				))
		)
	);


}
