import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { RxState } from '@rx-angular/state';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { GlobalState, GLOBAL_RX_STATE } from '../../../global-state';
import { DispatchCardActionService } from '../../../services/dispatch-card-action/dispatch-card-action.service';

@Component({
  selector: 'digimon-card-app-security-area',
  templateUrl: './security-area.component.html',
  styleUrls: ['./security-area.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState],
})
export class SecurityAreaComponent implements OnInit {
  readonly securityArea$ = this.globalState.select('playState', 'securityArea');

  readonly onSetSecurity$ = new Subject<void>();

  constructor(
    @Inject(GLOBAL_RX_STATE) private globalState: RxState<GlobalState>,
    private state: RxState<Record<string, never>>,
    private dispatchCardActionService: DispatchCardActionService
  ) {}

  ngOnInit(): void {
    this.state.hold(
      this.onSetSecurity$.pipe(
        tap(() => {
          new Array(5).fill(1).forEach(() => {
            this.dispatchCardActionService.dispatch({
              type: 'recovery',
              area: 'stack',
            });
          });
        })
      )
    );
  }
}
