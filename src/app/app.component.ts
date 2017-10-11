import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <span>is the form valid? <b>{{ form.valid }}</b></span>
    <br>
    <span>is the field touched? <b>{{ field.touched | json }}</b></span>
    <br>
    <label>
      <input type="checkbox" [(ngModel)]="disabled" />
      <b>Disable the custom form control</b>
    </label>
    <form #form="ngForm" novalidade>
      <app-counter-input name="counter" [disabled]="disabled" #field="ngModel" [ngModel]="['a', 'b']"></app-counter-input>
    </form>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  disabled = false;
}
