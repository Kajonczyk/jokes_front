import { createAction, props } from '@ngrx/store';
import { User } from '../../types/user';

const SET_USER_DATA = 'SET_USER_DATA';

export const setUserData = createAction(SET_USER_DATA, props<{ user: User }>());
