import { createAction, props } from '@ngrx/store';
import { User } from '../../types/user';
import { GamePoint, Joke, Room, RoomInfo } from '../../types/room';

export const SET_ROOM_INFO = '[Room] Set room info';
export const SET_ROOM_POINTS = '[Room] Set room points';
export const SET_ROOM_PAST_JOKES = '[Room] Set room past jokes';
export const FETCH_ROOM_INFO = '[Room] Fetch room info';

export const setRoomInfo = createAction(
  SET_ROOM_INFO,
  props<{ roomInfo: RoomInfo }>()
);

export const setRoomPoints = createAction(
  SET_ROOM_POINTS,
  props<{ points: GamePoint[] }>()
);

export const setRoomPastJokes = createAction(
  SET_ROOM_PAST_JOKES,
  props<{ pastJokes: Joke[] }>()
);

export const fetchRoomInfo = createAction(
	FETCH_ROOM_INFO,
	props<{ roomId: string }>()

);
