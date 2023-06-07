import {createAction, props} from '@ngrx/store';
import {User} from '../../types/user';
import {Room} from '../../types/room';


const SET_ROOMS_DATA = "SET_ROOMS_DATA"


export const setRoomsData = createAction(
	SET_ROOMS_DATA,
	props<{rooms: Room[]}>()
)
