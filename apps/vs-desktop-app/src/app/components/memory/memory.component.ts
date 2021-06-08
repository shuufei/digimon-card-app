import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { RxState } from '@rx-angular/state';
import { merge, Observable, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { GlobalState, GLOBAL_RX_STATE } from '../../global-state';
import { DispatchMemoryService } from '../../services/dispatch-memory.service';
import { MemoryCount, Side } from '../../types';

@Component({
  selector: 'digimon-card-app-memory',
  templateUrl: './memory.component.html',
  styleUrls: ['./memory.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState],
})
export class MemoryComponent implements OnInit {
  readonly selfSideMemoryList: MemoryCount[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  readonly otherSideMemoryList: MemoryCount[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  readonly zero: MemoryCount = 0;

  readonly memory$ = this.globalState.select('memory');

  readonly onClickOtherSideMemory$ = new Subject<MemoryCount>();
  readonly onClickSelfSideMemory$ = new Subject<MemoryCount>();
  readonly onClickedZero$ = new Subject<MemoryCount>();
  private readonly onMemoryClick$: Observable<GlobalState['memory']> = merge(
    this.onClickOtherSideMemory$.pipe(
      map((count) => ({
        side: 'other' as Side,
        count: count,
      }))
    ),
    this.onClickSelfSideMemory$.pipe(
      map((count) => ({
        side: 'self' as Side,
        count: count,
      }))
    ),
    this.onClickedZero$.pipe(
      map((count) => ({
        side: 'unknown' as Side,
        count: count,
      }))
    )
  );

  constructor(
    @Inject(GLOBAL_RX_STATE) private globalState: RxState<GlobalState>,
    private state: RxState<Record<string, never>>,
    private dispatchMemoryService: DispatchMemoryService
  ) {}

  ngOnInit(): void {
    this.state.hold(
      this.onMemoryClick$.pipe(
        tap((event) =>
          this.dispatchMemoryService.dispatch(event.side, event.count)
        )
      )
    );
  }
}
