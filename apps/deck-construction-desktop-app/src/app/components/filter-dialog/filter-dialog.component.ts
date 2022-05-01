import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { GlobalState, GLOBAL_RX_STATE } from '../../global-state';
import { RxState } from '@rx-angular/state';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'digimon-card-app-filter-dialog',
  templateUrl: './filter-dialog.component.html',
  styleUrls: ['./filter-dialog.component.scss'],
})
export class FilterDialogComponent implements OnInit {
  colorList = ['red', 'blue', 'yellow', 'green', 'black', 'purple'];

  readonly filter;

  constructor(
    private fb: FormBuilder,
    @Inject(GLOBAL_RX_STATE) private globalState: RxState<GlobalState>
  ) {
    this.filter = this.fb.group({
      color: [],
    });
  }

  ngOnInit(): void {
    this.filter.valueChanges
      .pipe(
        tap((values) => {
          console.log(values);
          // this.globalState.set('filter', () => {
          //   return {
          //     colorList: values.color
          //   }
          // })
        })
      )
      .subscribe();
  }
}
