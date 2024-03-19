import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../model/sudoku.types';

const selectSudokuAppState = createFeatureSelector<AppState>('sudoku');

export const selectSudokuState = createSelector(selectSudokuAppState, (state) => state);
export const selectIsSingleMode = createSelector(selectSudokuAppState, (state) => state.gameMode === 'single');
export const selectDifficulty = createSelector(selectSudokuAppState, (state) => state.difficulty);
export const selectIsGameInProgress = createSelector(selectSudokuAppState, (state) => state.isGameInProgress);

export const selectBoardOneInGame = createSelector(selectSudokuAppState, (state) => state.inGameBoardOne);
export const selectBoardTwoInGame = createSelector(selectSudokuAppState, (state) => state.inGameBoardTwo);

export const selectBoardOneInitial = createSelector(selectSudokuAppState, (state) => state.initialBoardOne);
export const selectBoardTwoInitial = createSelector(selectSudokuAppState, (state) => state.initialBoardTwo);

export const selectIsValid = createSelector(selectSudokuAppState, (state) => state.isValid);
export const selectIsSolved = createSelector(selectSudokuAppState, (state) => state.isSolved);
