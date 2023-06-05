import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Room} from '../types/room';
import {environment} from '../../../environments';

@Injectable({
	providedIn: "root"
})
export class RoomsService {

	constructor(private httpService: HttpClient){
	}

	getRooms(){
		return this.httpService.get<Room[]>(`${environment.apiUrl}/room`)
	}
}
