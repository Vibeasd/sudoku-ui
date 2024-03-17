import { createActionGroup, props } from '@ngrx/store';
import { AppState, Board, Difficulty, GameMode } from '../model/sudoku.types';

export const sudokuActions = createActionGroup({
	source: 'Sudoku API',
	events: {
		'Submit Game Details': props<{ gameMode: GameMode; gameDifficulty: Difficulty }>(),
		'Submit Game Details Success': props<{ startState: AppState }>(),
		'Submit Game Details Failure': (error: Error) => ({ error }),

		'Generate Extra Board': props<{ board: Board }>(),
	},
});
