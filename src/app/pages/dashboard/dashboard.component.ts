import {Component, OnInit} from '@angular/core';
import {Room} from '../../types/room';
import {RoomsService} from '../../services/rooms.service';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{

  constructor(private roomsService: RoomsService, private authService: AuthService, private router: Router) {
  }

  roomsList: Room[] = [
    {
      name: "Open room 1",
      id: "123",
      ownerId: "123",
      membersCount: 4,
      membersLimit: 10
    },
    {
      name: "Open room 2",
      id: "1234",
      ownerId: "1234",
      membersCount: 2,
      membersLimit: 5
    }
  ]

  ngOnInit() {


    const dupa = this.roomsService.getRooms().subscribe((data) => {
      console.log("DATA", data)
    })
  }


  logout(){
    this.authService.logout()
    this.router.navigate(["/login"])
  }

  // getRooms
}
