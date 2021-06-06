import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { RxState } from '@rx-angular/state';
import { GlobalState, GLOBAL_RX_STATE } from '../../../global-state';

@Component({
  selector: 'digimon-card-app-tamer-area',
  templateUrl: './tamer-area.component.html',
  styleUrls: ['./tamer-area.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TamerAreaComponent implements OnInit {
  readonly tamerArea$ = this.globalState.select('playState', 'tamerArea');

  constructor(
    @Inject(GLOBAL_RX_STATE) private globalState: RxState<GlobalState>
  ) {}

  ngOnInit(): void {
    return;
  }
}
