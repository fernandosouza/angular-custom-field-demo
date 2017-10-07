import { Component, OnInit, Input, forwardRef, OnChanges } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, FormControl } from '@angular/forms';

export function createCounterRangeValidator(max = 10, min = 0) {
  return function validateCounterRange(c: FormControl) {
    const err = {
      rangeError: {
        given: c.value,
        max: max,
        min: min
      }
    };
    return (c.value > +max || c.value < +min) ? err : null;
  };
}

@Component({
  selector: 'app-counter-input',
  template: `
    <h6>Counter Value</h6>
    <button (click)="decrement()">-</button>
    {{counterValue}}
    <button (click)="increment()">+</button>
  `,
  styleUrls: [],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CounterInputComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => CounterInputComponent),
      multi: true
    }
  ]
})
export class CounterInputComponent implements OnInit, ControlValueAccessor, OnChanges {
  @Input() _counterValue = 0;
  @Input() max;
  @Input() min;

  validateFn: Function;

  constructor() { }

  ngOnInit() {
  }

  propagateChange = (_: any) => {};

  ngOnChanges(changes) {
    if (changes.min || changes.max) {
      this.validateFn = createCounterRangeValidator(this.max, this.min);
    }
  }

  validate(c: FormControl) {
    return this.validateFn(c);
  }

  writeValue(value: any): void {
    if (value !== undefined) {
      this.counterValue = value;
    }
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {}

  setDisabledState?(isDisabled: boolean): void {}

  get counterValue(): number {
    return this._counterValue;
  }

  set counterValue(value: number) {
    this._counterValue = value;
    this.propagateChange(this._counterValue);
  }

  increment() {
    this.counterValue++;
  }

  decrement() {
    this.counterValue--;
  }
}
