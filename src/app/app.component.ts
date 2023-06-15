import {Component, OnInit} from '@angular/core';
import {AppState} from './types/appState';
import {Store} from '@ngrx/store';
import * as UserActions from './store/actions/user.action';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
	title = 'front';

	constructor(private store: Store<AppState>) {
	}

	ngOnInit() {
		const user = localStorage.getItem('userInfo');

		if (user) {
			this.store.dispatch(UserActions.setUserData({user: JSON.parse(user)}));
		}

	}
}
