import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {RoomComponent} from './room.component';
import {LoggedUserGuardService} from '../../guards/logged-user-guard.service';


const routes: Routes = [
	{
		path: '',
		component: RoomComponent,
		canActivate: [LoggedUserGuardService]
	}
];

@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		RouterModule.forChild(routes)
	]
})
export class RoomModule {
}
