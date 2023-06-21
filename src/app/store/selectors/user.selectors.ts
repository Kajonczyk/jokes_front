import { AppState } from '../../types/appState';

export const getUser = (state: AppState) => state.user;
export const getUserId = (state: AppState) => state.user!.id;
