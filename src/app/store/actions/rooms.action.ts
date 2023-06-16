import { createAction, props } from '@ngrx/store';
import { User } from '../../types/user';
import { Room } from '../../types/room';

export const SET_ROOMS_DATA = '[Rooms] Set rooms data';
export const FETCH_ROOMS_DATA = '[Rooms] Fetch rooms data';

export const setRoomsData = createAction(
  SET_ROOMS_DATA,
  props<{ rooms: Room[] }>()
);

export const fetchRoomsData = createAction(
	FETCH_ROOMS_DATA,
);
