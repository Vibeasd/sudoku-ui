/* eslint-disable @ngrx/no-typed-global-store */
import { CommonModule, NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { BoardComponent } from '../board/board.component';
import { AppState, Board, Difficulty } from '../model/sudoku.types';
import { sudokuActions } from '../sudoku-sdk/sudoku.action';
import {
	selectBoardOneInitial,
	selectBoardTwoInitial,
	selectDifficulty,
	selectGameMode,
	selectIsSolved,
	selectIsValid,
} from '../sudoku-sdk/sudoku.selector';

/**
 * Container for sudoku game board. This is a smart component which handles the game events.
 */
@Component({
	selector: 'app-board-container',
	standalone: true,
	imports: [BoardComponent, RouterLink, CommonModule, NgClass],
	templateUrl: './board-container.component.html',
	styleUrl: './board-container.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardContainerComponent {
	/**
	 * Contains the current game difficulty setting.
	 */
	readonly difficulty$: Observable<Difficulty | undefined> = this.store.select(selectDifficulty);

	/**
	 * It contains the game mode setting.
	 */
	readonly isSingle$: Observable<boolean> = this.store
		.select(selectGameMode)
		.pipe(map((gameMode) => gameMode === 'single'));

	/**
	 * It holds every information about the player one's game board.
	 */
	readonly boardOne$: Observable<Board> = this.store.select(selectBoardOneInitial);

	/**
	 * It holds every information about the player two's game board.
	 */
	readonly boardTwo$: Observable<Board> = this.store.select(selectBoardTwoInitial);

	/**
	 * If there was a sudoku validation, this prop holds the result of that validation.
	 */
	readonly isValid$: Observable<boolean> = this.store.select(selectIsValid);

	/**
	 * If a sudoku board was solved this prop holds about that information.
	 */
	readonly isSolved$: Observable<boolean> = this.store.select(selectIsSolved);

	constructor(private store: Store<AppState>) {}

	/**
	 * This method triggers the solving of the player one's board at its current state.
	 */
	solveBoardOne() {
		this.store.dispatch(sudokuActions.solveBoardOne());
	}

	/**
	 * This method triggers the solving of the player two's board at its current state.
	 */
	solveBoardTwo() {
		this.store.dispatch(sudokuActions.solveBoardTwo());
	}

	/**
	 * This method triggers validation on the player one's board at its current state.
	 */
	validateBoardOne() {
		this.store.dispatch(sudokuActions.validateBoardOne());
	}

	/**
	 * This method triggers validation on the player two's board at its current state.
	 */
	validateBoardTwo() {
		this.store.dispatch(sudokuActions.validateBoardTwo());
	}

	/**
	 * It triggers a popup which contains information about the board solving was successful or not.
	 */
	solvedConfirmed() {
		this.store.dispatch(sudokuActions.solvingConfirmed());
	}

	/**
	 * It triggers a popup which contains information about the board was valid or not.
	 */
	validityConfirmed() {
		this.store.dispatch(sudokuActions.validityConfirmed());
	}

	/**
	 * If the game is not yet solved then we can start it from the initial state by calling this method.
	 */
	restartGame() {
		this.store.dispatch(sudokuActions.restartGame());
	}
}
