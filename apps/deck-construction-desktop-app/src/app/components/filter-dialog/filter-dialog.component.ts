import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'digimon-card-app-filter-dialog',
  templateUrl: './filter-dialog.component.html',
  styleUrls: ['./filter-dialog.component.scss'],
})
export class FilterDialogComponent {
  items = ['red', 'blue', 'green'];

  readonly testForm = new FormGroup({
    testValue: new FormControl(),
  });
}
