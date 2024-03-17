import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Difficulty } from '../model/sudoku.types';
import { sudokuActions } from '../sudoku-sdk/sudoku.action';

@Component({
	selector: 'app-menu',
	standalone: true,
	imports: [ReactiveFormsModule, CommonModule],
	templateUrl: './menu.component.html',
	styleUrl: './menu.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuComponent {
	private store: Store = inject(Store);

	menuForm: FormGroup = new FormGroup({
		gameMode: new FormControl('single', Validators.required),
		gameDifficulty: new FormControl('easy', Validators.required),
	});

	difficulties: Difficulty[] = ['easy', 'medium', 'hard', 'random'];

	onSubmit() {
		this.store.dispatch(
			sudokuActions.submitGameDetails({
				gameMode: this.menuForm.get('gameMode')?.value,
				gameDifficulty: this.menuForm.get('gameDifficulty')?.value,
			}),
		);
	}
}
