import { Component, Input } from '@angular/core';
import { User } from '../../types/user';
import {getUserId} from '../../store/selectors/user.selectors';
import {switchMap} from 'rxjs';
import {getUsersVotedPoints} from '../../store/selectors/room.selectors';
import {AppState} from '../../types/appState';
import {Store} from '@ngrx/store';
import {RoomUser} from '../../types/room';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent {
  @Input() user!: RoomUser;
  votedPoints = this.user?.votePoints

  variant = Math.random() > 0.5 ? 1 : 1; //v1 only
}
