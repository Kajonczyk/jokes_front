import { createReducer, on } from '@ngrx/store';
import { User } from '../../types/user';
import * as UserActions from '../actions/user.action';

const initialState: Partial<User> = {};

export const userReducer = createReducer(
  initialState,
  on(UserActions.setUserData, (state, action) => action.user)
);
