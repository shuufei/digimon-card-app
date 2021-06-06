import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RxState } from '@rx-angular/state';
import * as _ from 'lodash';
import { Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { GlobalState, GLOBAL_RX_STATE } from '../../../global-state';
import { TrashConfirmDialogComponent } from '../../trash-confirm-dialog/trash-confirm-dialog.component';

@Component({
  selector: 'digimon-card-app-trash-area',
  templateUrl: './trash-area.component.html',
  styleUrls: ['./trash-area.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState],
})
export class TrashAreaComponent implements OnInit {
  readonly trashArea$ = this.globalState.select('playState', 'trashArea');
  readonly latestTrashCard$ = this.trashArea$.pipe(
    map((trashArea) => {
      return _.last(trashArea.cardList);
    })
  );

  /**
   * Events
   */
  readonly onClick$ = new Subject<void>();

  constructor(
    @Inject(GLOBAL_RX_STATE) private globalState: RxState<GlobalState>,
    private readonly dialog: MatDialog,
    private readonly state: RxState<Record<string, never>>
  ) {}

  ngOnInit(): void {
    this.state.hold(
      this.onClick$.pipe(
        tap(() => {
          this.dialog.open(TrashConfirmDialogComponent, {
            width: '70%',
            height: '80%',
          });
        })
      )
    );
  }
}
