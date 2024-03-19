import { Routes } from '@angular/router';
import { BoardContainerComponent } from './board-container/board-container.component';
import { MenuComponent } from './menu/menu.component';
import { gameGuard } from './utils/game.guard';

export const routes: Routes = [
	{ path: 'board', component: BoardContainerComponent, canActivate: [gameGuard] },
	{ path: '**', component: MenuComponent },
];
