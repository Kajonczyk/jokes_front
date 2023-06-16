import { createAction, props } from '@ngrx/store';
import { User } from '../../types/user';

export const SET_USER_DATA = '[User] Set user data';
export const FETCH_USER_DATA = '[User] Fetch user data';

export const setUserData = createAction(SET_USER_DATA, props<{ user: User }>());
export const fetchUserData = createAction(FETCH_USER_DATA);
