import { createReducer, on } from '@ngrx/store';
import * as RoomActions from '../actions/room.action';
import { RoomInfo } from '../../types/room';
import {updateRoomGameUserVotePoints} from '../actions/room.action';

const initialState: Partial<RoomInfo> = {};

export const roomReducer = createReducer(
  initialState,
  on(RoomActions.setRoomInfo, (state, action) => ({
    ...action.roomInfo,
    users: action.roomInfo.users.map(user => ({...user, votePoints: 0})),
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
  }),
  on(RoomActions.addRoomUser, (state, action) => {
    if(!state.users!.find(u => u.id === action.user.id)) {
      return { ...state, users: [...state.users!, {...action.user, votePoints: 0}]};
    }

    return state
  }),
  on(RoomActions.removeRoomUser, (state, action) => {
    return { ...state, users: state.users!.filter(user => user.id !== action.id)};
  }),
  on(RoomActions.updateRoomJoke, (state, action) => {
    return { ...state, joke: action.joke, jokes: [...state.jokes!, action.joke]};
  }),
  on(RoomActions.startRoomGame, (state, action) => {
    return { ...state, game: action.game};
  }),
  on(RoomActions.updateRoomGameTurn, (state, action) => {
    return { ...state, game: {...state.game!, turns: [action.turns]}, joke: undefined, users: state.users!.map(user => ({...user, votePoints: 0}))};
  }),
  on(RoomActions.updateRoomGameUserVotePoints, (state, action) => {
    return { ...state, users: state.users!.map(i => i.id === action.userId ? {...i, votePoints: action.amount} : i)};
  }),
);
