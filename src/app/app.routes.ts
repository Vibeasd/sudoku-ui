import { Routes } from '@angular/router';
import { BoardContainerComponent } from './board-container/board-container.component';
import { MenuComponent } from './menu/menu.component';

export const routes: Routes = [
	{ path: 'board', component: BoardContainerComponent },
	{ path: '**', component: MenuComponent },
];
