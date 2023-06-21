import { createReducer, on } from '@ngrx/store';
import * as RoomActions from '../actions/room.action';
import { RoomInfo } from '../../types/room';

const initialState: Partial<RoomInfo> = {};

export const roomReducer = createReducer(
  initialState,
  on(RoomActions.setRoomInfo, (state, action) => ({
    ...action.roomInfo,
    score: [],
    jokes: [],
  })),
  on(RoomActions.setRoomPoints, (state, action) => {
    return { ...state, score: action.points };
  }),
  on(RoomActions.setRoomPastJokes, (state, action) => {
    return { ...state, jokes: action.pastJokes };
  }),
  on(RoomActions.setRoomJoke, (state, action) => {
    return { ...state, joke: action.joke };
  })
);
