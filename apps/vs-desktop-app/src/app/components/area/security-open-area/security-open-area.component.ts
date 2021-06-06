import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { RxState } from '@rx-angular/state';
import { GlobalState, GLOBAL_RX_STATE } from '../../../global-state';

@Component({
  selector: 'digimon-card-app-security-open-area',
  templateUrl: './security-open-area.component.html',
  styleUrls: ['./security-open-area.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SecurityOpenAreaComponent implements OnInit {
  readonly securityOpenArea$ = this.globalState.select(
    'playState',
    'securityOpenArea'
  );

  constructor(
    @Inject(GLOBAL_RX_STATE) private globalState: RxState<GlobalState>
  ) {}

  ngOnInit(): void {
    return;
  }
}
