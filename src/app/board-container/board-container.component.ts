import { CommonModule, NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { BoardComponent } from '../board/board.component';
import { AppState, Board, Difficulty } from '../model/sudoku.types';
import { sudokuActions } from '../sudoku-sdk/sudoku.action';
import {
	selectBoardOneInitial,
	selectBoardTwoInitial,
	selectDifficulty,
	selectIsSingleMode,
	selectIsSolved,
	selectIsValid,
} from '../sudoku-sdk/sudoku.selector';

@Component({
	selector: 'app-board-container',
	standalone: true,
	imports: [BoardComponent, RouterLink, CommonModule, NgClass],
	templateUrl: './board-container.component.html',
	styleUrl: './board-container.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardContainerComponent {
	readonly difficulty$: Observable<Difficulty | undefined> = this.store.select(selectDifficulty);
	readonly isSingle$: Observable<boolean> = this.store.select(selectIsSingleMode);
	readonly boardOne$: Observable<Board> = this.store.select(selectBoardOneInitial);
	readonly boardTwo$: Observable<Board> = this.store.select(selectBoardTwoInitial);
	readonly isValid$: Observable<boolean> = this.store.select(selectIsValid);
	readonly isSolved$: Observable<boolean> = this.store.select(selectIsSolved);

	constructor(private store: Store<AppState>) {}

	solveBoardOne() {
		this.store.dispatch(sudokuActions.solveBoardOne());
	}

	solveBoardTwo() {
		this.store.dispatch(sudokuActions.solveBoardTwo());
	}

	solveValidateOne() {
		this.store.dispatch(sudokuActions.validateBoardOne());
	}

	solveValidateTwo() {
		this.store.dispatch(sudokuActions.validateBoardTwo());
	}

	solvedConfirmed() {
		this.store.dispatch(sudokuActions.solvingConfirmed());
	}

	validityConfirmed() {
		this.store.dispatch(sudokuActions.validityConfirmed());
	}

	restartGame() {
		this.store.dispatch(sudokuActions.restartGame());
	}
}
