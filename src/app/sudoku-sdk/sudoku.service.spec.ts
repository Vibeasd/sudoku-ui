import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Board, BoardResponse, SolveResponse, ValidateResponse } from '../model/sudoku.types';
import { SudokuService } from './sudoku.service';

describe('SudokuService', () => {
	let sudokuService: SudokuService;
	let httpTestingController: HttpTestingController;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule],
			providers: [SudokuService],
		});

		sudokuService = TestBed.inject(SudokuService);
		httpTestingController = TestBed.inject(HttpTestingController);
	});

	afterEach(() => {
		httpTestingController.verify();
	});

	it('creates service', () => {
		expect(sudokuService).toBeTruthy();
	});

	describe('generateSudokuBoard', () => {
		it('should return a board', (done) => {
			const BOARD_RESPONSE_MOCK: BoardResponse = {
				board: [[]],
			};

			let board: BoardResponse | undefined;
			sudokuService.generateSudokuBoard('easy').subscribe((response) => {
				board = response;
				done();
			});
			const req = httpTestingController.expectOne('https://sugoku.onrender.com/board?difficulty=easy');
			req.flush(BOARD_RESPONSE_MOCK);
			expect(board).toEqual(BOARD_RESPONSE_MOCK);
		});
	});
	describe('validateSudokuBoard', () => {
		it('should validate a board', (done) => {
			const VALIDATION_RESPONSE_MOCK: ValidateResponse = {
				status: 'solved',
			};

			const REQUEST_MOCK: Board = [[]];

			let validationResponse: ValidateResponse | undefined;
			sudokuService.validateSudokuBoard(REQUEST_MOCK).subscribe((response) => {
				validationResponse = response;
				done();
			});
			const req = httpTestingController.expectOne('https://sugoku.onrender.com/validate');
			req.flush(VALIDATION_RESPONSE_MOCK);
			expect(validationResponse).toEqual(VALIDATION_RESPONSE_MOCK);
		});
	});
	describe('solveSudokuBoard', () => {
		it('should solve a board', (done) => {
			const BOARD_RESPONSE_MOCK: SolveResponse = {
				difficulty: 'easy',
				solution: [[]],
				status: 'solved',
			};

			const REQUEST_MOCK: Board = [[]];

			let board: SolveResponse | undefined;
			sudokuService.solveSudokuBoard(REQUEST_MOCK).subscribe((response) => {
				board = response;
				done();
			});
			const req = httpTestingController.expectOne('https://sugoku.onrender.com/solve');
			req.flush(BOARD_RESPONSE_MOCK);
			expect(board).toEqual(BOARD_RESPONSE_MOCK);
		});
	});
});
