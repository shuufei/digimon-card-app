import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { RxState } from '@rx-angular/state';
import { Digimon } from '../../domain/digimon';
import { GlobalState, GLOBAL_RX_STATE } from '../../global-state';

@Component({
  selector: 'digimon-card-app-digimon',
  templateUrl: './digimon.component.html',
  styleUrls: ['./digimon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DigimonComponent implements OnInit {
  @Input() digimon!: Digimon;
  @Output() selected = new EventEmitter<void>();

  /**
   * State
   */
  readonly gs$ = this.globalState.select();

  constructor(
    @Inject(GLOBAL_RX_STATE) private readonly globalState: RxState<GlobalState>
  ) {}

  ngOnInit(): void {
    if (this.digimon == null) {
      throw new Error('digimon is required');
    }
  }
}
