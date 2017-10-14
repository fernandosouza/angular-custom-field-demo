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
    <br>
    <label>
      <input type="checkbox" [(ngModel)]="required" />
      <b>Make it required</b>
    </label>
    <form #form="ngForm" novalidate>
      <app-custom-field
        [required]=required
        name="counter"
        [disabled]="disabled"
        #field="ngModel"
        [ngModel]="['a', 'b']">
      </app-custom-field>
    </form>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  disabled = false;
  required = false;
}
