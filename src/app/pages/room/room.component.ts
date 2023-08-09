import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {RoomService} from '../../services/room.service';
import {filter, first, mergeMap, withLatestFrom} from 'rxjs';
import {AppState} from '../../types/appState';
import {select, Store} from '@ngrx/store';
import {
	canFinishTurn,
	canStartGame,
	canUserTellJoke,
	canUserVote,
	getRoomInfo,
	getUsersVotedPoints
} from '../../store/selectors/room.selectors';
import {fetchRoomInfo} from '../../store/actions/room.action';
import {getUserId} from '../../store/selectors/user.selectors';
import {WebSocketService} from '../../services/websocket.service';

@Component({
	selector: 'app-room',
	templateUrl: './room.component.html',
	styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {
	roomInfo$ = this.store.pipe(select(getRoomInfo));
	currentUserId$ = this.store.select(getUserId);
	canFinishTurn$ = this.store.pipe(select(canFinishTurn));
	canStartGame = this.store.pipe(select(canStartGame));
	canTellJoke$ = this.store.pipe(select(canUserTellJoke));
	canVote$ = this.store.pipe(select(canUserVote));
	votedPoints$ = this.currentUserId$.pipe(
		mergeMap((userId) => this.store.select(getUsersVotedPoints(userId)))
	);
	isTellJokeModalDisplayed = false;

	roomInfoWithUserId$ = this.roomInfo$.pipe(
		first(),
		withLatestFrom(this.currentUserId$)
	)

	constructor(
		private roomService: RoomService,
		private route: ActivatedRoute,
		private router: Router,
		private store: Store<AppState>,
		private webSocketService: WebSocketService
	) {
	}

	ngOnInit() {
		this.webSocketService.connect();
		this.joinRoom();

		this.route.paramMap.subscribe((params) => {
			const roomId = params.get('id');
			this.store.dispatch(fetchRoomInfo({roomId: roomId!}));
		});
	}

	joinRoom() {
		this.roomInfo$.pipe(
			filter(room => !!room?.id),
			first(),
			withLatestFrom(this.currentUserId$)
		).subscribe(([roomInfo, userId]) => {
			this.webSocketService.joinRoom(roomInfo!.id, userId);
		});
	}

	finishTurn() {
		this.roomInfoWithUserId$.subscribe(([roomInfo, userId]) => {
			this.webSocketService.nextTurn(roomInfo!.gameId, userId, roomInfo!.id);
		});
	}

	ngOnDestroy() {
		this.roomInfoWithUserId$.subscribe(([roomInfo, userId]) => {
			this.webSocketService.leaveRoom(roomInfo!.id, userId);
		});
	}

	vote(e: MouseEvent) {
		this.roomInfoWithUserId$.subscribe(([roomInfo, userId]) => {
			this.webSocketService.addGamePoints(roomInfo!.id, roomInfo!.gameId, userId, Number((e.target as HTMLDivElement).textContent), roomInfo!.game.turns[0].id);
		});
	}


	startGame() {
		this.roomInfoWithUserId$.subscribe(([roomInfo, userId]) => {
			this.webSocketService.startGame(roomInfo!.id, 5, userId);
		});
	}

	//LEFT ON PURPOSE IN CASE SOMETHING FUCKS UP :)))))
	test() {
		this.roomInfo$.pipe(
			withLatestFrom(this.canVote$)
		).subscribe(([a, canVote]) => {
			console.log({a}, {canVote});
		});
	}

	toggleJokeModal() {
		this.isTellJokeModalDisplayed = !this.isTellJokeModalDisplayed;
	}

	onJokeToldModalConfirmed(joke: string) {
		this.roomInfoWithUserId$.subscribe(([roomInfo, userId]) => {
			this.webSocketService.tellJoke(roomInfo!.gameId, joke, userId);
			this.isTellJokeModalDisplayed = false;
		});
	}

}
