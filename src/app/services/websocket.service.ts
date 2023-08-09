import {Injectable} from '@angular/core';
import {io, Socket} from 'socket.io-client';
import {AppState} from '../types/appState';
import {Store} from '@ngrx/store';
import {
	addRoomUser,
	removeRoomUser,
	startRoomGame,
	updateRoomGameTurn,
	updateRoomGameUserVotePoints,
	updateRoomJoke
} from '../store/actions/room.action';

@Injectable({
	providedIn: 'root'
})
export class WebSocketService {
	//@ts-ignore
	private socket: Socket;

	constructor(private store: Store<AppState>) {
	}

	connect(): void {
		this.socket = io('http://localhost:3000');

		this.socket.on('joinedRoom', (user) => {
			this.store.dispatch(addRoomUser({user}));
		});

		this.socket.on('roomleft', (userId) => {
			this.store.dispatch(removeRoomUser({id: userId}));
		});

		this.socket.on('jokeTold', (joke) => {
			this.store.dispatch(updateRoomJoke({joke}));
		});

		this.socket.on('startGame', (game) => {
			this.store.dispatch(startRoomGame({game}));
		});

		this.socket.on('nextTurn', (turns) => {
			this.store.dispatch(updateRoomGameTurn({turns}));
		});

		this.socket.on('addScore', ({userId, amount}) => {
			this.store.dispatch(updateRoomGameUserVotePoints({userId, amount}));
		});
	}

	emitTestEvent() {
		//LEFT ON PURPOSE
		this.socket.emit('testowa', {message: 'Hello World'});
	}

	joinRoom(roomId: string, userId: string) {
		const payload = {
			roomId: roomId,
			userId: userId
		};

		this.socket.emit('onRoomJoined', JSON.stringify(payload));
	}

	leaveRoom(roomId: string, userId: string) {
		const payload = {
			roomId: roomId,
			userId: userId
		};

		this.socket.emit('onRoomLeft', JSON.stringify(payload));
	}

	startGame(roomId: string, rounds: number, userId: string) {
		const payload = {
			roomId,
			rounds,
			userId
		};

		this.socket.emit('onGameStarted', JSON.stringify(payload));
	}

	tellJoke(gameId: string, content: string, userId: string) {
		const payload = {
			gameId,
			content,
			userId
		};

		this.socket.emit('onJokeTold', JSON.stringify(payload));
	}

	addGamePoints(roomId: string, gameId: string, userId: string, amount: number, turnId: string) {
		const payload = {
			gameId,
			roomId,
			userId,
			amount,
			turnId
		};
		this.socket.emit('onScoreAdded', JSON.stringify(payload));
	}

	nextTurn(gameId: string, userId: string, roomId: string) {
		const payload = {
			gameId,
			userId,
			roomId
		};

		this.socket.emit('onNextTurn', JSON.stringify(payload));
	}

	disconnect(): void {
		this.socket.disconnect();
	}
}
