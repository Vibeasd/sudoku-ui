import './polyfills.server.mjs';
import {
  ɵɵdefineDirective,
  ɵɵlistener
} from "./chunk-2FAXEUMQ.mjs";
import "./chunk-24VIC3GD.mjs";

// src/app/utils/input-validator.directive.ts
var _InputValidatorDirective = class _InputValidatorDirective {
  constructor() {
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onInput(event) {
    const input = event.target;
    const inputValue = input.value;
    if (inputValue == 0) {
      input.value = "";
      event.preventDefault();
    }
    if (inputValue.length > 1) {
      input.value = inputValue.slice(0, 1);
      event.preventDefault();
    }
  }
};
_InputValidatorDirective.\u0275fac = function InputValidatorDirective_Factory(t) {
  return new (t || _InputValidatorDirective)();
};
_InputValidatorDirective.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({ type: _InputValidatorDirective, selectors: [["", "appInputValidator", ""]], hostBindings: function InputValidatorDirective_HostBindings(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275listener("input", function InputValidatorDirective_input_HostBindingHandler($event) {
      return ctx.onInput($event);
    });
  }
}, standalone: true });
var InputValidatorDirective = _InputValidatorDirective;
export {
  InputValidatorDirective
};
//# sourceMappingURL=chunk-MELX6S77.mjs.map
