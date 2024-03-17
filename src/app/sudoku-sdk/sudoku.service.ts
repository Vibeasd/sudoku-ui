import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { EMPTY, Observable, catchError, of } from 'rxjs';
import {
	Board,
	BoardResponse,
	Difficulty,
	SolveResponse,
	SudokuRequest,
	ValidateResponse,
} from '../model/sudoku.types';

const GET_BOARD = 'https://sugoku.onrender.com/board';
const VALIDATE_BOARD = 'https://sugoku.onrender.com/validate';
const SOLVE_BOARD = 'https://sugoku.onrender.com/solve';

@Injectable({
	providedIn: 'root',
})
export class SudokuService {
	private httpClient: HttpClient = inject(HttpClient);

	generateSudokuBoard(difficulty: Difficulty): Observable<BoardResponse> {
		return this.httpClient
			.get<BoardResponse>(GET_BOARD, { params: { difficulty } })
			.pipe(catchError(() => of({ board: [[]] })));
	}

	validateSudokuBoard(board: Board): Observable<ValidateResponse> {
		const sudokuRequest: SudokuRequest = {
			board,
		};
		return this.httpClient.post<ValidateResponse>(VALIDATE_BOARD, sudokuRequest).pipe(catchError(() => EMPTY));
	}

	solveSudokuBoard(board: Board): Observable<SolveResponse> {
		const sudokuRequest: SudokuRequest = {
			board,
		};
		return this.httpClient.post<SolveResponse>(SOLVE_BOARD, sudokuRequest).pipe(catchError(() => EMPTY));
	}
}
