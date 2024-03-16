import { Component } from '@angular/core';
import { BoardComponent } from '../board/board.component';

@Component({
	selector: 'app-board-container',
	standalone: true,
	imports: [BoardComponent],
	templateUrl: './board-container.component.html',
	styleUrl: './board-container.component.scss',
})
export class BoardContainerComponent {}
