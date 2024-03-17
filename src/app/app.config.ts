import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideClientHydration } from '@angular/platform-browser';
import { provideEffects } from '@ngrx/effects';
import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { routes } from './app.routes';
import { SudokuEffect } from './sudoku-sdk/sudoku.effect';
import { AppReducer } from './sudoku-sdk/sudoku.reducer';

export const appConfig: ApplicationConfig = {
	providers: [
		provideRouter(routes),
		provideClientHydration(),
		provideStore(),
		provideState({ name: 'sudoku', reducer: AppReducer }),
		provideEffects(SudokuEffect),
		provideHttpClient(withFetch()),
		provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
	],
};
