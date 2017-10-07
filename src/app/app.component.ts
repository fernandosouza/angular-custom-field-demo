import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <form #form="ngForm" novalidade>
      <app-counter-input name="counter" [max]="10" [min]="5" ngModel></app-counter-input>
    </form>
    {{ form.valid }}
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
}
