import {createAction, props} from '@ngrx/store';
import {User} from '../../types/user';
import {Game, GamePoint, Joke, RoomInfo, RoomUser, Turn} from '../../types/room';

export const SET_ROOM_INFO = '[Room] Set room info';
export const SET_ROOM_JOKE = '[Room] Set room joke';
export const SET_ROOM_POINTS = '[Room] Set room points';
export const SET_ROOM_PAST_JOKES = '[Room] Set room past jokes';
export const FETCH_ROOM_INFO = '[Room] Fetch room info';
export const FETCH_ROOM_JOKE = '[Room] Fetch room joke';
export const ADD_ROOM_USER = '[Room] Add room user';
export const REMOVE_ROOM_USER = '[Room] Remove room user';
export const UPDATE_ROOM_JOKE = '[Room] Update room joke';
export const START_ROOM_GAME = '[Room] Start room game';
export const UPDATE_ROOM_GAME_TURN = '[Room] Update room game turns';
export const UPDATE_ROOM_GAME_USER_VOTE_POINTS = '[Room] Update room game vote points';

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

export const addRoomUser = createAction(
	ADD_ROOM_USER,
	props<{ user: RoomUser }>()
);

export const removeRoomUser = createAction(
	REMOVE_ROOM_USER,
	props<{ id: string }>()
);

export const updateRoomJoke = createAction(
	UPDATE_ROOM_JOKE,
	props<{ joke: Joke }>()
);

export const startRoomGame = createAction(
	START_ROOM_GAME,
	props<{ game: Game }>()
);

export const updateRoomGameTurn = createAction(
	UPDATE_ROOM_GAME_TURN,
	props<{ turns: Turn }>()
);

export const updateRoomGameUserVotePoints = createAction(
	UPDATE_ROOM_GAME_USER_VOTE_POINTS,
	props<{ userId: string, amount: number }>()
);
