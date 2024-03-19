import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, map, tap } from 'rxjs';
import { selectDifficulty } from '../sudoku-sdk/sudoku.selector';

export const gameGuard: CanActivateFn = (): Observable<boolean> => {
	const store = inject(Store);
	const router = inject(Router);
	return store.select(selectDifficulty).pipe(
		map((gameMode) => !!gameMode),
		tap((isGameMode) => {
			if (!isGameMode) {
				router.navigateByUrl('');
			}
		}),
	);
};
