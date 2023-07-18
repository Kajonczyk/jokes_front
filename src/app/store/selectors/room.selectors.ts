import { AppState } from '../../types/appState';
import {createSelector} from '@ngrx/store';
import {RoomUser} from '../../types/room';

export const getRoomInfo = (state: AppState) => state.room;
export const getRoomUsers = (state: AppState) => state.room.users;

export const getUsersVotedPoints = (userId: string) => createSelector(
	getRoomUsers,
	(users: RoomUser[]) => users.find(user => user.id === userId)!.votePoints
)
