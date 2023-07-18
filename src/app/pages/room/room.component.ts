import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {RoomService} from '../../services/room.service';
import {RoomInfo, TurnStatus} from '../../types/room';
import {
	filter,
	first,
	forkJoin,
	map,
	mergeMap,
	Observable,
	of,
	Subject,
	Subscription,
	switchMap,
	take,
	takeUntil,
	takeWhile,
	withLatestFrom
} from 'rxjs';
import {AppState} from '../../types/appState';
import {select, Store} from '@ngrx/store';
import {getRoomInfo, getUsersVotedPoints} from '../../store/selectors/room.selectors';
import {fetchRoomInfo} from '../../store/actions/room.action';
import {getUserId} from '../../store/selectors/user.selectors';
import {WebSocketService} from '../../services/websocket.service';
import {tap} from 'rxjs/operators';

@Component({
	selector: 'app-room',
	templateUrl: './room.component.html',
	styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {
	roomInfo$: Observable<RoomInfo | undefined> = this.store.pipe(select(getRoomInfo));
	currentUserId$ = this.store.select(getUserId);
	isTellJokeModalDisplayed = false;
	votedPoints$ = this.currentUserId$.pipe(
		switchMap((userId) => this.store.select(getUsersVotedPoints(userId)))
	)

	canFinishTurn$ = this.currentUserId$.pipe(
		mergeMap(userId => this.roomInfo$.pipe(
			map(roomInfo => {
				const isUsersTurn = roomInfo?.game?.turns.find(turn => turn.turnUserId === userId && turn.status === TurnStatus.ACTIVE);
				return isUsersTurn && roomInfo?.joke;
			})
		))
	);

	canStartGame = this.currentUserId$.pipe(
		mergeMap(userId => this.roomInfo$.pipe(
			map(roomInfo => {
				return userId === roomInfo?.ownerId && !roomInfo.game
			})
		))
	)

	canTellJoke$ = this.currentUserId$.pipe(
		mergeMap(userId => this.roomInfo$.pipe(
			map(roomInfo => {
				const isUsersTurn = roomInfo?.game?.turns.find(turn => turn.turnUserId === userId && turn.status === TurnStatus.ACTIVE);
				return isUsersTurn && !roomInfo?.joke;
			})
		))
	);

	canVote$ = this.currentUserId$.pipe(
		mergeMap(userId => this.roomInfo$.pipe(
			map(roomInfo => {
				const isUsersTurn = roomInfo?.game?.turns.find(turn => turn.turnUserId === userId && turn.status === TurnStatus.ACTIVE);
				const hasAlreadyVoted = roomInfo?.users.find(user => user.id === userId)?.votePoints
				return !isUsersTurn && roomInfo?.joke && !hasAlreadyVoted;
			})
		))
	);

	finishTurn() {
		this.roomInfo$.pipe(
			first(),
			withLatestFrom(this.currentUserId$)
		).subscribe(([roomInfo,userId]) => {
			this.webSocketService.nextTurn(roomInfo!.gameId, userId, roomInfo!.id)
		})
	}

	constructor(
		private roomService: RoomService,
		private route: ActivatedRoute,
		private router: Router,
		private store: Store<AppState>,
		private webSocketService: WebSocketService
	) {

	}

	ngOnInit() {
		this.webSocketService.connect()
		this.roomInfo$.pipe(
			filter(room => !!room?.id),
			first(),
			withLatestFrom(this.currentUserId$),
		).subscribe(([roomInfo,userId]) => {
			this.webSocketService.joinRoom(roomInfo!.id, userId)
		})

		this.route.paramMap.subscribe((params) => {
			const roomId = params.get('id');
			if (!roomId) {
				this.router.navigate(['/dashboard']);
			}

			this.store.dispatch(fetchRoomInfo({roomId: roomId!}));
		});

		console.log("HALO")

		this.roomInfo$.subscribe((data) => {
			if (Object.keys(data || {}).length) {
				console.log({data}, ' DATA');
			}
		});
		this.currentUserId$.subscribe((d) => console.log(d));

	}

	sendTestEvent(): void {
		this.webSocketService.emitTestEvent();
	}

	ngOnDestroy(): void {
		this.roomInfo$.pipe(
			first(),
			withLatestFrom(this.currentUserId$),
		).subscribe(([roomInfo,userId]) => {
			this.webSocketService.leaveRoom(roomInfo!.id, userId)
		})
	}

	vote(e: any){
		this.roomInfo$.pipe(
			first(),
			withLatestFrom(this.currentUserId$)
		).subscribe(([roomInfo, userId]) => {
			this.webSocketService.addGamePoints(roomInfo!.id,roomInfo!.gameId, userId, Number(e.target.textContent), roomInfo!.game.turns[0].id)
		})
	}


	startGame(){
		this.roomInfo$.pipe(
			first(),
			withLatestFrom(this.currentUserId$),
		).subscribe(([roomInfo,userId]) => {
			this.webSocketService.startGame(roomInfo!.id, 5, userId)
		})
	}

	test() {
		this.roomInfo$.pipe(
			withLatestFrom(this.currentUserId$),
			withLatestFrom(this.votedPoints$),
		).subscribe((x) => {
			console.log(x);
		});
	}

	onJokeToldClick() {
		this.isTellJokeModalDisplayed = true;
	}

	onJokeToldModalCancelled() {
		this.isTellJokeModalDisplayed = false;

	}

	onJokeToldModalConfirmed(joke: string) {
		console.log(joke);

		this.roomInfo$.pipe(
			first(),
			withLatestFrom(this.currentUserId$),
		).subscribe(([roomInfo, userId]) => {
			this.webSocketService.tellJoke(roomInfo!.gameId, joke, userId)
			this.isTellJokeModalDisplayed = false;
		});


	}

}
