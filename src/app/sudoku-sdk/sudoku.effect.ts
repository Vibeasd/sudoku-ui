import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { filter, map, switchMap, tap } from 'rxjs';
import { AppState } from '../model/sudoku.types';
import { sudokuActions } from './sudoku.action';
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

	constructor(
		private actions$: Actions,
		private sudokuService: SudokuService,
		private router: Router,
	) {}
}
