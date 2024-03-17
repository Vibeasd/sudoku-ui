import { CommonModule, NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { BoardComponent } from '../board/board.component';
import { AppState, Board, Difficulty, GameMode } from '../model/sudoku.types';
import { sudokuActions } from '../sudoku-sdk/sudoku.action';
import {
	selectBoardOneInitial,
	selectBoardTwoInitial,
	selectDifficulty,
	selectGameMode,
	selectIsSolved,
	selectIsValid,
	selectSudokuState,
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
	readonly isSingle$: Observable<boolean> = this.store
		.select(selectGameMode)
		.pipe(map((gameMode) => gameMode === 'single'));
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
