import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { BoardComponent } from '../board/board.component';
import { AppState } from '../model/sudoku.types';
import { selectGameMode, selectSudokuState } from '../sudoku-sdk/sudoku.selector';

@Component({
	selector: 'app-board-container',
	standalone: true,
	imports: [BoardComponent],
	templateUrl: './board-container.component.html',
	styleUrl: './board-container.component.scss',
})
export class BoardContainerComponent {
	constructor(private store: Store<AppState>) {
		// eslint-disable-next-line @ngrx/no-store-subscription
		this.store.select(selectGameMode).subscribe((state) => {
			console.log(state);
		});
		// eslint-disable-next-line @ngrx/no-store-subscription
		this.store.select(selectSudokuState).subscribe((state) => {
			console.log(state);
		});
	}
}
