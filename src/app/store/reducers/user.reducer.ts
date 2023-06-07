import {createReducer, on} from '@ngrx/store';
import {User} from '../../types/user';
import * as UserActions from "../actions/user.action"

const initialState: User | undefined = undefined

export const userReducer = createReducer(
	initialState,
	//@ts-ignore
	on(UserActions.setUserData, (state, action) => action.user)
);
