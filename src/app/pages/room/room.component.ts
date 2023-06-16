import { Component, OnInit } from '@angular/core';
import { RoomsService } from '../../services/rooms.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomService } from '../../services/room.service';
import { RoomInfo } from '../../types/room';
import { Observable } from 'rxjs';
import { User } from '../../types/user';
import { AppState } from '../../types/appState';
import { select, Store } from '@ngrx/store';
import { getRoomInfo } from '../../store/selectors/room.selectors';
import {FETCH_ROOM_INFO, fetchRoomInfo} from '../../store/actions/room.action';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss'],
})
export class RoomComponent implements OnInit {
  roomInfo$: Observable<RoomInfo | undefined> = this.store.pipe(select(getRoomInfo));

  constructor(
    private roomService: RoomService,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const roomId = params.get('id');
      if (!roomId) {
        this.router.navigate(['/dashboard']);
      }

      this.store.dispatch(fetchRoomInfo({roomId: roomId!}))
    });
  }
}
