import { createAction, props } from '@ngrx/store';
import { User } from '../../types/user';
import { GamePoint, Joke, Room, RoomInfo } from '../../types/room';

const SET_ROOM_INFO = 'SET_ROOM_INFO';
const SET_ROOM_POINTS = 'SET_ROOM_POINTS';
const SET_ROOM_PAST_JOKES = 'SET_ROOM_PAST_JOKES';

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
