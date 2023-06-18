import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Room} from '../types/room';

@Injectable({
	providedIn: 'root'
})
export class RoomsService {
	constructor(private httpService: HttpClient) {
	}

	getRooms() {
		return this.httpService.get<Room[]>(`room`);
	}
}
