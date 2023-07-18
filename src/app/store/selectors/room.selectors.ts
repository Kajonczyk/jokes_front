import { AppState } from '../../types/appState';
import {createSelector} from '@ngrx/store';
import {RoomUser, TurnStatus} from '../../types/room';
import {getUserId} from './user.selectors';

export const getRoomInfo = (state: AppState) => state.room;
export const getRoomUsers = (state: AppState) => state.room.users;

export const getUsersVotedPoints = (userId: string) => createSelector(
	getRoomUsers,
	(users: RoomUser[]) => users.find(user => user.id === userId)!.votePoints
)

export const canUserTellJoke = createSelector(
	getUserId,
	getRoomInfo,
	(userId, roomInfo) => {
		const isUsersTurn = roomInfo?.game?.turns.find(turn => turn.turnUserId === userId && turn.status === TurnStatus.ACTIVE);
		return isUsersTurn && !roomInfo?.joke;
	}
)

export const canUserVote = createSelector(
	getUserId,
	getRoomInfo,
	(userId, roomInfo) => {
		const isUsersTurn = roomInfo?.game?.turns.find(turn => turn.turnUserId === userId && turn.status === TurnStatus.ACTIVE);
		const hasAlreadyVoted = roomInfo?.users?.find(user => user.id === userId)?.votePoints
		return !isUsersTurn && roomInfo?.joke && !hasAlreadyVoted;
	}
)

export const canFinishTurn = createSelector(
	getUserId,
	getRoomInfo,
	(userId, roomInfo) => {
		const isUsersTurn = roomInfo?.game?.turns.find(turn => turn.turnUserId === userId && turn.status === TurnStatus.ACTIVE);
		return isUsersTurn && roomInfo?.joke;
	}
)

export const canStartGame = createSelector(
	getUserId,
	getRoomInfo,
	(userId, roomInfo) => {
		return userId === roomInfo?.ownerId && !roomInfo.game
	}
)
