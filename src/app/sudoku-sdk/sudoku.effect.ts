import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { filter, map, switchMap, tap, withLatestFrom } from 'rxjs';
import { AppState } from '../model/sudoku.types';
import { sudokuActions } from './sudoku.action';
import { selectBoardOneInGame, selectBoardTwoInGame } from './sudoku.selector';
import { SudokuService } from './sudoku.service';

@Injectable()
export class SudokuEffect {
	submitGameDetails$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(sudokuActions.submitGameDetails),
			switchMap((payload) =>
				this.sudokuService.generateSudokuBoard(payload.gameDifficulty).pipe(
					map((boardResponse) => {
						const startState: AppState = {
							gameMode: payload.gameMode,
							difficulty: payload.gameDifficulty,
							initialBoardOne: boardResponse.board,
							initialBoardTwo: [],
							inGameBoardOne: boardResponse.board,
							inGameBoardTwo: [],
							isSolved: false,
							isValid: true,
						};
						return sudokuActions.submitGameDetailsSuccess({ startState });
					}),
				),
			),
		);
	});

	submitGameDetailsSuccess$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(sudokuActions.submitGameDetailsSuccess),
			tap((payload) => {
				if (payload.startState.gameMode === 'single') {
					this.router.navigate(['/board']);
				}
			}),
			filter((payload) => payload.startState.gameMode === 'multi'),
			switchMap((payload) =>
				this.sudokuService.generateSudokuBoard(payload.startState.difficulty!).pipe(
					map((boardResponse) => {
						return sudokuActions.generateExtraBoard({ board: boardResponse.board });
					}),
				),
			),
		);
	});

	generateExtraBoard$ = createEffect(
		() => {
			return this.actions$.pipe(
				ofType(sudokuActions.generateExtraBoard),
				tap(() => this.router.navigate(['/board'])),
			);
		},
		{ dispatch: false },
	);

	solveBoardOne$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(sudokuActions.solveBoardOne),
			withLatestFrom(this.store.select(selectBoardOneInGame)),
			switchMap(([, inGameBoard]) => {
				return this.sudokuService.solveSudokuBoard(inGameBoard).pipe(
					map((response) => {
						if (response.status === 'solved') {
							return sudokuActions.solveBoardOneSuccess({ board: response.solution });
						} else {
							return sudokuActions.solveBoardOneFailure();
						}
					}),
				);
			}),
		);
	});

	solveBoardTwo$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(sudokuActions.solveBoardTwo),
			withLatestFrom(this.store.select(selectBoardTwoInGame)),
			switchMap(([, inGameBoard]) => {
				return this.sudokuService.solveSudokuBoard(inGameBoard).pipe(
					map((response) => {
						if (response.status === 'solved') {
							return sudokuActions.solveBoardTwoSuccess({ board: response.solution });
						} else {
							return sudokuActions.solveBoardTwoFailure();
						}
					}),
				);
			}),
		);
	});

	validateBoardOne$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(sudokuActions.validateBoardOne),
			withLatestFrom(this.store.select(selectBoardOneInGame)),
			switchMap(([, inGameBoard]) => {
				return this.sudokuService.validateSudokuBoard(inGameBoard).pipe(
					map((response) => {
						if (response.status === 'solved') {
							return sudokuActions.validateBoardOneSuccess();
						} else {
							return sudokuActions.validateBoardOneFailure();
						}
					}),
				);
			}),
		);
	});

	validateBoardTwo$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(sudokuActions.validateBoardTwo),
			withLatestFrom(this.store.select(selectBoardTwoInGame)),
			switchMap(([, inGameBoard]) => {
				return this.sudokuService.validateSudokuBoard(inGameBoard).pipe(
					map((response) => {
						if (response.status === 'solved') {
							return sudokuActions.validateBoardTwoSuccess();
						} else {
							return sudokuActions.validateBoardTwoFailure();
						}
					}),
				);
			}),
		);
	});

	constructor(
		private actions$: Actions,
		private sudokuService: SudokuService,
		private router: Router,
		private store: Store,
	) {}
}
