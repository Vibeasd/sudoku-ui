export type Difficulty = 'easy' | 'medium' | 'hard' | 'random';
export type GameMode = 'single' | 'multi';
export type Board = Array<Array<number>>;

export type BoardResponse = { board: Board };

export type SudokuRequest = { board: Board };

export type SolveResponse = { difficulty: Difficulty; solution: Board; status: 'solved' | 'broken' | 'unsolvable' };
export type ValidateResponse = { status: 'solved' | 'broken' };

export const MOCK_BOARD: Board = [
	[0, 0, 0, 0, 0, 0, 0, 0, 7],
	[1, 2, 0, 4, 7, 0, 0, 0, 9],
	[0, 0, 0, 0, 5, 0, 2, 0, 0],
	[0, 1, 4, 0, 3, 7, 6, 0, 0],
	[0, 0, 0, 0, 8, 0, 4, 0, 0],
	[8, 0, 0, 6, 1, 4, 3, 0, 0],
	[0, 0, 2, 0, 0, 1, 0, 8, 0],
	[6, 0, 0, 9, 0, 5, 0, 4, 3],
	[0, 4, 0, 8, 0, 3, 0, 5, 2],
];

export interface AppState {
	gameMode: GameMode | undefined;
	difficulty: Difficulty | undefined;
	initialBoardOne: Board;
	initialBoardTwo: Board;
	inGameBoardOne: Board;
	inGameBoardTwo: Board;
	isSolved: boolean;
	isValid: boolean;
}
