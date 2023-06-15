import { createAction, props } from '@ngrx/store';
import { User } from '../../types/user';

const SET_USER_DATA = '[User] Set user data';

export const setUserData = createAction(SET_USER_DATA, props<{ user: User }>());
