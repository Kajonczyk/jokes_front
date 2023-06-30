import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {RoomService} from '../../services/room.service';
import {RoomInfo, TurnStatus} from '../../types/room';
import {map, mergeMap, Observable, Subscription} from 'rxjs';
import {AppState} from '../../types/appState';
import {select, Store} from '@ngrx/store';
import {getRoomInfo} from '../../store/selectors/room.selectors';
import {fetchRoomInfo} from '../../store/actions/room.action';
import {getUserId} from '../../store/selectors/user.selectors';
import {WebSocketService} from '../../services/websocket.service';

@Component({
	selector: 'app-room',
	templateUrl: './room.component.html',
	styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {
	roomInfo$: Observable<RoomInfo | undefined> = this.store.pipe(select(getRoomInfo));
	currentUserId$ = this.store.select(getUserId);
	isTellJokeModalDisplayed = false;
	hasVotedInThisTurn = false;

	canFinishTurn$ = this.currentUserId$.pipe(
		mergeMap(userId => this.roomInfo$.pipe(
			map(roomInfo => {
				const isUsersTurn = roomInfo?.game?.turns.find(turn => turn.turnUserId === userId && turn.status === TurnStatus.ACTIVE);
				return isUsersTurn && roomInfo?.joke;
			})
		))
	);

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
				return !isUsersTurn && roomInfo?.joke && !this.hasVotedInThisTurn;
			})
		))
	);

	finishTurn() {
		this.roomInfo$.pipe(
			mergeMap(roomInfo => this.roomService.finishTurn(roomInfo!.gameId, roomInfo!.id))
		).subscribe();
	}

	//@ts-ignore
	private socketSubscription: Subscription;
	constructor(
		private roomService: RoomService,
		private route: ActivatedRoute,
		private router: Router,
		private store: Store<AppState>,
		private webSocketService: WebSocketService
	) {

	}

	ngOnInit() {
		this.socketSubscription = this.webSocketService.connectToWebSocket().subscribe(
			(event) => {
				if (event.type === 'open') {
					console.log('WebSocket connected');
				} else if (event.type === 'message') {
					console.log('WebSocket message received:', event.data);
				}
			},
			(error) => {
				console.error('WebSocket error:', error);
			},
			() => {
				console.log('WebSocket connection closed');
			}
		);
		this.route.paramMap.subscribe((params) => {
			const roomId = params.get('id');
			if (!roomId) {
				this.router.navigate(['/dashboard']);
			}

			this.store.dispatch(fetchRoomInfo({roomId: roomId!}));
		});

		this.roomInfo$.subscribe((data) => {
			if (Object.keys(data || {}).length) {
				console.log({data}, ' DATA');
			}
		});
		this.currentUserId$.subscribe((d) => console.log(d));

	}

	ngOnDestroy(): void {
		if (this.socketSubscription) {
			this.socketSubscription.unsubscribe();
		}
	}

	sendMessage(): void {
		this.webSocketService.sendMessage('Hello WebSocket!');
	}

	test() {
		// this.canTellJoke$.subscribe((c) => {
		// 	console.log(c);
		// });
		const message = 'Hello, WebSocket!';
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
			mergeMap(roomInfo => this.roomService.tellJoke(roomInfo!.gameId, joke))
		).subscribe((a) => {
			console.log(a);
			this.isTellJokeModalDisplayed = false;

		});


	}

}
