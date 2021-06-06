import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { RxState } from '@rx-angular/state';
import { GlobalState, GLOBAL_RX_STATE } from '../../../global-state';

@Component({
  selector: 'digimon-card-app-option-area',
  templateUrl: './option-area.component.html',
  styleUrls: ['./option-area.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OptionAreaComponent implements OnInit {
  readonly optionArea$ = this.globalState.select('playState', 'optionArea');

  constructor(
    @Inject(GLOBAL_RX_STATE) private globalState: RxState<GlobalState>
  ) {}

  ngOnInit(): void {
    return;
  }
}
