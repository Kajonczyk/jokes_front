import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';
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

	constructor(private store: Store<AppState>) { }

	connect(): void {
		this.socket = io('http://localhost:3000');

		// console.log(userId, roomId)/

		// Nasłuchuj zdarzenia 'test'
		this.socket.on('test', (data) => {
			console.log('Odebrano zdarzenie "test":', data);
		});

		// Nasłuchuj zdarzenia 'joinedRoom'
		this.socket.on('joinedRoom', (user) => {
			this.store.dispatch(addRoomUser({user}))
			console.log('Odebrano zdarzenie "joinedRoom":', user);
		});

		// Nasłuchuj zdarzenia 'joinedRoom'
		this.socket.on('onRoomJoined', (data) => {
			console.log('Odebrano zdarzenie "joinedRoom":', data);
		});

		// Nasłuchuj zdarzenia 'roomleft'
		this.socket.on('roomleft', (userId) => {
			console.log()
			this.store.dispatch(removeRoomUser({id: userId}))
			console.log('Odebrano zdarzenie "roomleft":', userId);
		});

		// Nasłuchuj zdarzenia 'jokeTold'
		this.socket.on('jokeTold', (joke) => {
			this.store.dispatch(updateRoomJoke({joke}))
			console.log('Odebrano zdarzenie "jokeTold":', joke);
		});

		// Nasłuchuj zdarzenia 'jokeTold'
		this.socket.on('startGame', (game) => {
			this.store.dispatch(startRoomGame({game}))
			console.log('Odebrano zdarzenie "startGame":', game);
		});

		// Nasłuchuj zdarzenia 'nextTurn'
		this.socket.on('nextTurn', (turns) => {
			this.store.dispatch(updateRoomGameTurn({turns}))
			console.log("JEST NEXT TURN")

			console.log('Odebrano zdarzenie "nextTurn":', turns);
		});

		// Nasłuchuj zdarzenia 'nextTurn'
		this.socket.on('addScore', ({userId, amount}) => {

			console.log("ADD SCORE", userId, amount)
			this.store.dispatch(updateRoomGameUserVotePoints({userId, amount}))
			// console.log("JEST NEXT TURN")
			//
			// console.log('Odebrano zdarzenie "nextTurn":', turns);
		});
	}

	emitTestEvent(): void {
		this.socket.emit('testowa', { message: 'Hello World' });
	}

	joinRoom(roomId: string, userId: string) {
		const payload = {
			roomId: roomId,
			userId: userId
		};

		console.log("ON ROOM JOINED")
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
			userId,
		}

		this.socket.emit("onGameStarted", JSON.stringify(payload))
	}

	tellJoke(gameId: string, content: string, userId: string) {
		const payload = {
			gameId,
			content,
			userId
		};

		this.socket.emit('onJokeTold', JSON.stringify(payload));
	}

	addGamePoints(roomId: string,gameId: string, userId: string, amount: number, turnId: string){
		const payload = {
			gameId,
			roomId,
			userId,
			amount,
			turnId
		}
		console.log("JAZDA Z PUNKTAMI")

		this.socket.emit("onScoreAdded", JSON.stringify(payload))
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
