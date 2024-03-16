import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Board, MOCK_BOARD } from '../model/sudoku.types';

@Component({
	selector: 'app-board',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './board.component.html',
	styleUrl: './board.component.scss',
})
export class BoardComponent {
	mockBoard: Board = MOCK_BOARD;
}
