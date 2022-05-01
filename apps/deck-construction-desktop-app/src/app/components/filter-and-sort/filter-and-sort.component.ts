import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { GLOBAL_RX_STATE, GlobalState } from '../../global-state';
import { RxState } from '@rx-angular/state';
import { tap } from 'rxjs/operators';
import { COLOR, CARD_TYPE, LV, CATEGORY } from '../../types';

@Component({
  selector: 'digimon-card-app-filter-and-sort',
  templateUrl: './filter-and-sort.component.html',
  styleUrls: ['./filter-and-sort.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterAndSortComponent implements OnInit {
  colorList = Object.keys(COLOR);
  cardTypeList = Object.keys(CARD_TYPE);
  lvList = Object.keys(LV);
  categoryList = Object.keys(CATEGORY);
  readonly filter;

  constructor(
    private fb: FormBuilder,
    @Inject(GLOBAL_RX_STATE) private globalState: RxState<GlobalState>
  ) {
    this.filter = this.fb.group({
      color: [],
      cardtype: [],
      lv: [],
      category: [],
      includeParallel: [],
    });
  }

  ngOnInit(): void {
    this.filter.valueChanges
      .pipe(
        tap((values) => {
          this.globalState.set('filter', () => {
            return {
              colorList: values.color,
              cardTypeList: values.cardtype,
              lvList: values.lv,
              categoryList: values.category,
              includeParallel: values.includeParallel,
            };
          });
        })
      )
      .subscribe();
    this.globalState
      .select('filter')
      .pipe(
        tap((values) => {
          this.filter.setValue(
            {
              color: values.colorList,
              cardtype: values.cardTypeList,
              lv: values.lvList,
              category: values.categoryList,
              includeParallel: values.includeParallel,
            },
            {
              emitEvent: false,
            }
          );
        })
      )
      .subscribe();
  }
}
