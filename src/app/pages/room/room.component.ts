import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {RoomService} from '../../services/room.service';
import {RoomInfo, TurnStatus} from '../../types/room';
import {map, mergeMap, Observable} from 'rxjs';
import {AppState} from '../../types/appState';
import {select, Store} from '@ngrx/store';
import {getRoomInfo} from '../../store/selectors/room.selectors';
import {fetchRoomInfo} from '../../store/actions/room.action';
import {getUserId} from '../../store/selectors/user.selectors';

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

	constructor(
		private roomService: RoomService,
		private route: ActivatedRoute,
		private router: Router,
		private store: Store<AppState>
	) {

	}

	ngOnInit() {
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

	test() {
		this.canTellJoke$.subscribe((c) => {
			console.log(c);
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
			mergeMap(roomInfo => this.roomService.tellJoke(roomInfo!.gameId, joke))
		).subscribe((a) => {
			console.log(a);
			this.isTellJokeModalDisplayed = false;

		});


	}

}
