import { Component, Input, forwardRef, OnChanges } from '@angular/core';
import { ControlValueAccessor, Validator, NG_VALUE_ACCESSOR, NG_VALIDATORS, FormControl } from '@angular/forms';

export function allRequired(arr = []) {
  if (arr.find(value => value === '') !== undefined) {
    return {
      requiredError: {
        given: arr
      }
    };
  }
  return null;
}

export function createCounterRangeValidator(required) {
  return function validateCounterRange(c: FormControl) {
    if (c.value === null) {
      return null;
    }
    const err = required ? allRequired(c.value) : null;
    return (c.value && err) ? err : null;
  };
}

@Component({
  selector: 'app-custom-field',
  template: `
    <button (click)="addNewitem()">+</button>
    <div *ngFor="let item of items; let i = index; trackBy: identify">
      <input
        type="text"
        [ngModel]="items[i]"
        [disabled]="disabled"
        (blur)="propagateTouched()"
        (keyup)="keyup($event, i)"
        name="name{{i}}" />
      <button (click)="remove(i)">-</button>
    </div>
  `,
  styleUrls: [],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomFieldComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => CustomFieldComponent),
      multi: true
    }
  ]
})
export class CustomFieldComponent implements ControlValueAccessor, Validator, OnChanges {
  items = [];

  @Input() required;
  validateFn: Function;
  disabled: boolean;
  propagateChange = (_: any) => {};
  propagateTouched = (_: any) => {};

  ngOnChanges() {
    this.validateFn = createCounterRangeValidator(this.required);
  }

  identify(index, item) {
    return index;
  }

  validate(c: FormControl) {
    return this.validateFn(c);
  }

  writeValue(value: any): void {
    if (value) {
      this.items = value;
    }
  }

  keyup($event, i) {
    this.items[i] = $event.target.value;
    this.propagateChange(this.items);
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.propagateTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  addNewitem() {
    this.items.push('');
    this.propagateChange(this.items);
  }

  remove(i) {
    this.items.splice(i, 1);
    this.propagateChange(this.items);
  }
}
