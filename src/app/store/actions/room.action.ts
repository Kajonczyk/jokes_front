import { createAction, props } from '@ngrx/store';
import { User } from '../../types/user';
import { GamePoint, Joke, Room, RoomInfo } from '../../types/room';

export const SET_ROOM_INFO = '[Room] Set room info';
export const SET_ROOM_JOKE = '[Room] Set room joke';
export const SET_ROOM_POINTS = '[Room] Set room points';
export const SET_ROOM_PAST_JOKES = '[Room] Set room past jokes';
export const FETCH_ROOM_INFO = '[Room] Fetch room info';
export const FETCH_ROOM_JOKE = '[Room] Fetch room joke';

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

export const setRoomJoke = createAction(
	SET_ROOM_JOKE,
	props<{ joke: Joke }>()
);
export const fetchRoomJoke = createAction(
	FETCH_ROOM_JOKE,
	props<{ gameId: string }>()
);
