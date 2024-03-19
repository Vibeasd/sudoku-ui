import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { Difficulty } from '../model/sudoku.types';
import { MenuComponent } from './menu.component';

describe('MenuComponent', () => {
	let component: MenuComponent;
	let fixture: ComponentFixture<MenuComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [MenuComponent],
			providers: [{ provide: Store, useValue: {} }],
		}).compileComponents();

		fixture = TestBed.createComponent(MenuComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('creates component', () => {
		expect(component).toBeTruthy();
	});

	it('has the right difficulties', () => {
		const DIFFICULTIES_MOCK: Difficulty[] = ['easy', 'medium', 'hard', 'random'];
		expect(component.difficulties).toEqual(DIFFICULTIES_MOCK);
	});

	it('has the right default game mode', () => {
		expect(component.menuForm.get('gameMode')?.value).toEqual('single');
	});
});
