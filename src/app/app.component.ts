import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <span>is the form valid? <b>{{ form.valid }}</b></span>
    <br>
    <span>is the field touched? <b>{{ field.touched | json }}</b></span>
    <form #form="ngForm" novalidade>
      <app-counter-input name="counter" #field="ngModel" [ngModel]="['a', 'b']"></app-counter-input>
    </form>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
}
