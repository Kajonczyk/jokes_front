import {User} from './user';
import {Room} from './room';

export interface AppState {
	user: User | undefined
	rooms: Room[]
}
