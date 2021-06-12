import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Input,
  OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RxState } from '@rx-angular/state';
import * as _ from 'lodash';
import { BehaviorSubject, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { GlobalState, GLOBAL_RX_STATE, PlayState } from '../../../global-state';
import { Side } from '../../../types';
import { TrashConfirmDialogComponent } from '../../trash-confirm-dialog/trash-confirm-dialog.component';

@Component({
  selector: 'digimon-card-app-trash-area',
  templateUrl: './trash-area.component.html',
  styleUrls: ['./trash-area.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState],
})
export class TrashAreaComponent implements OnInit {
  @Input()
  set trashArea(value: PlayState['trashArea']) {
    this.trashArea$.next(value);
  }
  @Input() side!: Side;
  readonly trashArea$ = new BehaviorSubject<PlayState['trashArea']>({
    cardList: [],
  });
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
    if (this.side == null) {
      throw new Error('side is required!');
    }
    if (this.side === 'other') return;
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
