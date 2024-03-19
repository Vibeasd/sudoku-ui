export type Difficulty = 'easy' | 'medium' | 'hard' | 'random';
export type GameMode = 'single' | 'multi';
export type Board = Array<Array<number>>;

export type BoardResponse = { board: Board };

export type SudokuRequest = { board: Board };

export type SolveResponse = { difficulty: Difficulty; solution: Board; status: 'solved' | 'broken' | 'unsolvable' };
export type ValidateResponse = { status: 'solved' | 'broken' };

export interface AppState {
	gameMode: GameMode | undefined;
	difficulty: Difficulty | undefined;
	initialBoardOne: Board;
	initialBoardTwo: Board;
	inGameBoardOne: Board;
	inGameBoardTwo: Board;
	isSolved: boolean;
	isValid: boolean;
	isGameInProgress: boolean;
}
