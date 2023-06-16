import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, EMPTY, switchMap, tap} from 'rxjs';
import {mergeMap} from 'rxjs/operators';
import * as UserActions from '../actions/user.action';
import {FETCH_USER_DATA} from '../actions/user.action';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';


@Injectable()
export class UserEffects {
	constructor(
		private actions$: Actions,
		private userService: UserService,
		private router: Router
	) {
	}

	fetchUser$ = createEffect(() => this.actions$.pipe(
			ofType(FETCH_USER_DATA),
			mergeMap(() => this.userService.getUserInfo()
				.pipe(
					switchMap((user) => {
						localStorage.setItem('userInfo', JSON.stringify(user))
						this.router.navigate(["/"])
						return [UserActions.setUserData({user})];
					}),
					catchError(() => EMPTY)
				))
		)
	);


}
