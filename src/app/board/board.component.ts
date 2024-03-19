import { CommonModule, NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subscription, debounceTime, distinctUntilChanged } from 'rxjs';
import { Board } from '../model/sudoku.types';
import { sudokuActions } from '../sudoku-sdk/sudoku.action';
import { InputValidatorDirective } from '../utils/input-validator.directive';

/**
 * Generic sudoku board component for any user.
 */
@Component({
	selector: 'app-board',
	standalone: true,
	imports: [CommonModule, NgClass, ReactiveFormsModule, InputValidatorDirective],
	templateUrl: './board.component.html',
	styleUrl: './board.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardComponent implements OnDestroy, OnInit {
	/**
	 * It contains all information about the sudoku board.
	 */
	@Input()
	boardConfig$!: Observable<Board>;

	@Input()
	isPlayerOne!: boolean;

	@Input()
	isMultiMode!: boolean;

	/**
	 * This form handles the interaction between the user and the board.
	 */
	boardForm: FormGroup = new FormGroup({});

	/**
	 * This board is presented to the user.
	 */
	flattenedBoard = signal<number[]>([]);
	private subscriptions$$: Subscription = new Subscription();
	private store: Store = inject(Store);

	ngOnInit(): void {
		const initBoard$ = this.boardConfig$.subscribe((board) => {
			this.flattenedBoard.set(board ? this.flattenBoard(board) : []);
			this.boardForm = new FormGroup({});
			for (let i = 0; i < this.flattenedBoard().length; i++) {
				const formControlName = 'inputControl' + i;
				this.boardForm.addControl(
					formControlName,
					new FormControl(this.flattenedBoard()[i] === 0 ? '' : this.flattenedBoard()[i]),
				);
			}
		});

		this.subscriptions$$.add(initBoard$);

		const formValueChanges$ = this.boardForm.valueChanges
			.pipe(debounceTime(200), distinctUntilChanged())
			.subscribe((formState) => {
				const inputValues: Board = this.arrayToBoard(
					Object.values(formState).map((value) => (value === '' ? 0 : value)) as number[],
				);
				if (this.isPlayerOne) {
					this.store.dispatch(sudokuActions.updateBoardOne({ board: inputValues }));
				} else {
					this.store.dispatch(sudokuActions.updateBoardTwo({ board: inputValues }));
				}
			});

		this.subscriptions$$.add(formValueChanges$);
	}
	ngOnDestroy(): void {
		this.subscriptions$$.unsubscribe();
	}

	private flattenBoard(board: Board): number[] {
		return ([] as number[]).concat(...board);
	}

	private arrayToBoard(flattenedBoard: number[]): Board {
		const board = [];
		let index = 0;

		for (let i = 0; i < 9; i++) {
			const row: number[] = [];
			for (let j = 0; j < 9; j++) {
				row.push(flattenedBoard[index]);
				index++;
			}
			board.push(row);
		}
		return board;
	}
}
