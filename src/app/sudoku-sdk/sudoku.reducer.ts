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
	isSolved: false,
	isValid: true,
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
	on(sudokuActions.updateBoardOne, (state, { board }): AppState => {
		return {
			...state,
			inGameBoardOne: board,
		};
	}),
	on(sudokuActions.updateBoardTwo, (state, { board }): AppState => {
		return {
			...state,
			inGameBoardTwo: board,
		};
	}),
	on(sudokuActions.solveBoardOneSuccess, (state, { board }): AppState => {
		return {
			...state,
			initialBoardOne: board,
			inGameBoardOne: board,
			isSolved: true,
		};
	}),
	on(sudokuActions.solveBoardTwoSuccess, (state, { board }): AppState => {
		return {
			...state,
			initialBoardTwo: board,
			inGameBoardTwo: board,
			isSolved: true,
		};
	}),
	on(sudokuActions.solveBoardOneFailure, (state): AppState => {
		return {
			...state,
			isValid: false,
		};
	}),
	on(sudokuActions.solveBoardTwoFailure, (state): AppState => {
		return {
			...state,
			isValid: false,
		};
	}),
	on(sudokuActions.validateBoardOneSuccess, (state): AppState => {
		return {
			...state,
			isSolved: true,
		};
	}),
	on(sudokuActions.validateBoardTwoSuccess, (state): AppState => {
		return {
			...state,
			isSolved: true,
		};
	}),
	on(sudokuActions.validateBoardOneFailure, (state): AppState => {
		return {
			...state,
			isValid: false,
		};
	}),
	on(sudokuActions.validateBoardTwoFailure, (state): AppState => {
		return {
			...state,
			isValid: false,
		};
	}),
	on(sudokuActions.solvingConfirmed, (state): AppState => {
		return {
			...state,
			isSolved: false,
		};
	}),
	on(sudokuActions.validityConfirmed, (state): AppState => {
		return {
			...state,
			isValid: true,
		};
	}),
	on(sudokuActions.restartGame, (state): AppState => {
		return {
			...state,
			initialBoardOne: [...state.initialBoardOne],
			inGameBoardOne: state.initialBoardOne,
			initialBoardTwo: [...state.initialBoardTwo],
			inGameBoardTwo: state.initialBoardTwo,
			isValid: true,
			isSolved: false,
		};
	}),
);
