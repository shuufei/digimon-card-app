import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { RxState } from '@rx-angular/state';
import * as _ from 'lodash';
import { map } from 'rxjs/operators';
import { GlobalState, GLOBAL_RX_STATE } from '../../../global-state';

@Component({
  selector: 'digimon-card-app-trash-area',
  templateUrl: './trash-area.component.html',
  styleUrls: ['./trash-area.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrashAreaComponent implements OnInit {
  readonly trashArea$ = this.globalState.select('playState', 'trashArea');
  readonly latestTrashCard$ = this.trashArea$.pipe(
    map((trashArea) => {
      return _.last(trashArea.cardList);
    })
  );

  constructor(
    @Inject(GLOBAL_RX_STATE) private globalState: RxState<GlobalState>
  ) {}

  ngOnInit(): void {
    return;
  }
}
