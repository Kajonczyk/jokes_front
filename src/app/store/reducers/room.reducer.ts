import { createReducer, on } from '@ngrx/store';
import * as RoomActions from '../actions/room.action';
import { RoomInfo } from '../../types/room';

const initialState = {};

export const roomReducer = createReducer(
  initialState as RoomInfo,
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
  })
);
