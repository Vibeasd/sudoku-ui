import { Routes } from '@angular/router';
import { BoardContainerComponent } from './board-container/board-container.component';
import { MenuComponent } from './menu/menu.component';

export const routes: Routes = [
	{ path: '', component: MenuComponent }, //TODO route guard here, only with chosen set up
	{ path: 'board', component: BoardContainerComponent },
];
