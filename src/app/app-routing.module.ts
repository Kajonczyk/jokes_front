import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoggedUserGuardService} from './guards/logged-user-guard.service';

const routes: Routes = [
	{
		path: '',
		loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule)
	},
	{
		path: '',
		loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule)
	},
	{
		path: 'room/:id',
		loadChildren: () => import('./pages/room/room.module').then(m => m.RoomModule),
		canActivate: [LoggedUserGuardService]
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {
}
