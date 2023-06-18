import {Component, OnInit} from '@angular/core';
import {Room} from '../../types/room';
import {RoomsService} from '../../services/rooms.service';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {User} from '../../types/user';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../types/appState';
import {getUser} from '../../store/selectors/user.selectors';
import {Observable} from 'rxjs';
import {getRooms} from '../../store/selectors/rooms.selectors';
import {fetchRoomsData} from '../../store/actions/rooms.action';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
	constructor(
		private roomsService: RoomsService,
		private authService: AuthService,
		private router: Router,
		private store: Store<AppState>
	) {
		this.user$ = this.store.pipe(select(getUser));
		this.rooms$ = this.store.pipe(select(getRooms));
	}

	//TEST PURPOSES ONLY
	testRoomsList: Room[] = [
		{
			name: 'Open room 1',
			id: '123',
			ownerId: '123',
			membersCount: 4,
			membersLimit: 10
		},
		{
			name: 'Open room 2',
			id: '1234',
			ownerId: '1234',
			membersCount: 2,
			membersLimit: 5
		}
	];

	user$: Observable<User | undefined>;
	rooms$: Observable<Room[]>;
	roomToJoinId = '';

	ngOnInit() {
		this.store.dispatch(fetchRoomsData());
	}

	logout() {
		this.authService.logout().subscribe(() => {
			localStorage.removeItem('userInfo');
			this.router.navigate(['/login']);
		});
	}

	onJoinRoomModalCancel() {
		this.roomToJoinId = '';
	}

	onJoinRoomModalConfirm() {
		this.router.navigate([`/room/${this.roomToJoinId}`]);
	}
}
