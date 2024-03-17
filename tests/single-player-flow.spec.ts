import { expect, test } from '@playwright/test';

test.describe('Single player flow', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('http://localhost:4200/');
	});

	test('we are on the menu page and can start a game', async ({ page }) => {
		await expect(page).toHaveTitle(/SudokuUi/);

		await expect(page.getByTestId('game-title')).toBeVisible();

		await page.getByTestId('game-mode-selector').selectOption('single');

		await page.getByTestId('difficulty-selector').selectOption('easy');

		await page.getByTestId('start-cta').click();

		await expect(page.getByTestId('difficulty-level')).toBeVisible();
	});

	test('can validate our board and we get an error', async ({ page }) => {
		await page.getByTestId('game-mode-selector').selectOption('single');
		await page.getByTestId('difficulty-selector').selectOption('easy');
		await page.getByTestId('start-cta').click();

		await page.getByTestId('validate-player-one').click();
		await expect(page.getByTestId('validation-ok')).toBeVisible();
		await page.getByTestId('validation-ok').click();
		await expect(page.getByTestId('validation-ok')).toBeHidden();
	});
	test('can solve our board and get a success message', async ({ page }) => {
		await page.getByTestId('game-mode-selector').selectOption('single');
		await page.getByTestId('difficulty-selector').selectOption('easy');
		await page.getByTestId('start-cta').click();

		await page.getByTestId('solve-player-one').click();
		await expect(page.getByTestId('solving-ok')).toBeVisible();
		await page.getByTestId('solving-ok').click();
		await expect(page.getByTestId('solving-ok')).toBeHidden();
	});
});

test.describe('Multi player flow', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('http://localhost:4200/');
	});

	test('we are on the menu page and can start a game', async ({ page }) => {
		await expect(page).toHaveTitle(/SudokuUi/);

		await expect(page.getByTestId('game-title')).toBeVisible();

		await page.getByTestId('game-mode-selector').selectOption('multi');

		await page.getByTestId('difficulty-selector').selectOption('easy');

		await page.getByTestId('start-cta').click();

		await expect(page.getByTestId('difficulty-level')).toBeVisible();
	});

	test('both boards are visible', async ({ page }) => {
		await page.getByTestId('game-mode-selector').selectOption('multi');
		await page.getByTestId('difficulty-selector').selectOption('easy');
		await page.getByTestId('start-cta').click();

		await expect(page.getByTestId('player-one-board')).toBeVisible();
		await expect(page.getByTestId('player-two-board')).toBeVisible();
	});

	test('can validate our board and we get an error with a second player', async ({ page }) => {
		await page.getByTestId('game-mode-selector').selectOption('multi');
		await page.getByTestId('difficulty-selector').selectOption('easy');
		await page.getByTestId('start-cta').click();

		await page.getByTestId('validate-player-two').click();
		await expect(page.getByTestId('validation-ok')).toBeVisible();
		await page.getByTestId('validation-ok').click();
		await expect(page.getByTestId('validation-ok')).toBeHidden();
	});
	test('can solve our board and get a success message with a second player', async ({ page }) => {
		await page.getByTestId('game-mode-selector').selectOption('multi');
		await page.getByTestId('difficulty-selector').selectOption('easy');
		await page.getByTestId('start-cta').click();

		await page.getByTestId('solve-player-two').click();
		await expect(page.getByTestId('solving-ok')).toBeVisible();
		await page.getByTestId('solving-ok').click();
		await expect(page.getByTestId('solving-ok')).toBeHidden();
	});
});
