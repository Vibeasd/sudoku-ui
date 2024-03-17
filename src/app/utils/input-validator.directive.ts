import { Directive, HostListener } from '@angular/core';

@Directive({
	selector: '[appInputValidator]',
	standalone: true,
})
export class InputValidatorDirective {
	constructor() {}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	@HostListener('input', ['$event']) onInput(event: any) {
		const input = event.target;
		const inputValue = input.value;
		if (inputValue == 0) {
			input.value = '';
			event.preventDefault();
		}
		if (inputValue.length > 1) {
			input.value = inputValue.slice(0, 1);
			event.preventDefault();
		}
	}
}
