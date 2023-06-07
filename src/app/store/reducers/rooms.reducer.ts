import {createReducer, on} from '@ngrx/store';
import {User} from '../../types/user';
import * as RoomsActions from "../actions/rooms.action"
import {Room} from '../../types/room';

const initialState: Room[] = []

export const roomsReducer = createReducer(
	initialState,
	on(RoomsActions.setRoomsData, (state, action) => action.rooms)
);
