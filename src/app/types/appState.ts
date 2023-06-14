import { User } from './user';
import { Room, RoomInfo } from './room';

export interface AppState {
  user: User | undefined;
  rooms: Room[];
  room: RoomInfo;
}
