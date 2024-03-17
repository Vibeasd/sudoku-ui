import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { AppState, Board, Difficulty, GameMode } from '../model/sudoku.types';

export const sudokuActions = createActionGroup({
	source: 'Sudoku API',
	events: {
		'Submit Game Details': props<{ gameMode: GameMode; gameDifficulty: Difficulty }>(),
		'Submit Game Details Success': props<{ startState: AppState }>(),
		'Submit Game Details Failure': (error: Error) => ({ error }),

		'Generate Extra Board': props<{ board: Board }>(),

		'Update Board One': props<{ board: Board }>(),
		'Update Board Two': props<{ board: Board }>(),

		'Solve Board One': emptyProps(),
		'Solve Board Two': emptyProps(),

		'Solve Board One Success': props<{ board: Board }>(),
		'Solve Board Two Success': props<{ board: Board }>(),
		'Solve Board One Failure': emptyProps(),
		'Solve Board Two Failure': emptyProps(),

		'Validate Board One': emptyProps(),
		'Validate Board Two': emptyProps(),
		'Validate Board One Success': emptyProps(),
		'Validate Board Two Success': emptyProps(),
		'Validate Board One Failure': emptyProps(),
		'Validate Board Two Failure': emptyProps(),

		'Solving Confirmed': emptyProps(),
		'Validity Confirmed': emptyProps(),

		'Restart Game': emptyProps(),
	},
});
