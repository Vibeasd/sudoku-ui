import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { EMPTY } from 'rxjs';
import { BoardComponent } from './board.component';

describe('BoardComponent', () => {
	let component: BoardComponent;
	let fixture: ComponentFixture<BoardComponent>;
	const mockStore = {
		select: () => EMPTY,
	};

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [BoardComponent],
			providers: [
				{ provide: Store, useValue: mockStore },
				{ provide: ActivatedRoute, useValue: {} },
			],
		}).compileComponents();

		fixture = TestBed.createComponent(BoardComponent);
		component = fixture.componentInstance;
		component.boardConfig$ = EMPTY;
		fixture.detectChanges();
	});

	it('creates component', () => {
		expect(component).toBeTruthy();
	});
});
