import { createReducer, on } from '@ngrx/store';
import { AppState } from '../model/sudoku.types';
import { sudokuActions } from './sudoku.action';

const initialState: AppState = {
	gameMode: undefined,
	difficulty: undefined,
	initialBoardOne: [],
	initialBoardTwo: [],
	inGameBoardOne: [],
	inGameBoardTwo: [],
};

export const AppReducer = createReducer(
	initialState,
	on(sudokuActions.submitGameDetailsSuccess, (_state, { startState }): AppState => startState),
	on(sudokuActions.generateExtraBoard, (state, { board }): AppState => {
		return {
			...state,
			initialBoardTwo: board,
			inGameBoardTwo: board,
		};
	}),
);
