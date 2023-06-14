import { Component, Input } from '@angular/core';
import { User } from '../../types/user';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent {
  @Input() user!: User;
  isVoting = false;

  variant = Math.random() > 0.5 ? 1 : 2; //v1 only
}
