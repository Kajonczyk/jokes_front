import { createAction, props } from '@ngrx/store';
import { User } from '../../types/user';
import { Room } from '../../types/room';

const SET_ROOMS_DATA = '[Rooms] Set rooms data';

export const setRoomsData = createAction(
  SET_ROOMS_DATA,
  props<{ rooms: Room[] }>()
);
