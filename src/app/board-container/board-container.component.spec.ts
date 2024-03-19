import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { EMPTY } from 'rxjs';
import { BoardContainerComponent } from './board-container.component';

describe('BoardContainerComponent', () => {
	let component: BoardContainerComponent;
	let fixture: ComponentFixture<BoardContainerComponent>;
	const mockStore = {
		select: () => EMPTY,
	};

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [BoardContainerComponent],
			providers: [
				{ provide: Store, useValue: mockStore },
				{ provide: ActivatedRoute, useValue: {} },
			],
		}).compileComponents();

		fixture = TestBed.createComponent(BoardContainerComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('creates component', () => {
		expect(component).toBeTruthy();
	});
});
