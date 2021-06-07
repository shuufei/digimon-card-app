import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RxState } from '@rx-angular/state';
import { Subject } from 'rxjs';
import { tap, withLatestFrom } from 'rxjs/operators';
import { Digimon } from '../../domain/digimon';
import { GlobalState, GLOBAL_RX_STATE } from '../../global-state';
import { DispatchCardActionService } from '../../services/dispatch-card-action/dispatch-card-action.service';
import { Card } from '../../types';

@Component({
  selector: 'digimon-card-app-add-evolution-origin-dialog',
  templateUrl: './add-evolution-origin-dialog.component.html',
  styleUrls: ['./add-evolution-origin-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState],
})
export class AddEvolutionOriginDialogComponent implements OnInit {
  readonly onAdd$ = new Subject<Card>();
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public dialogData: { digimon: Digimon },
    private readonly state: RxState<Record<string, never>>,
    @Inject(GLOBAL_RX_STATE) private globalState: RxState<GlobalState>,
    private dispatchCardActionService: DispatchCardActionService
  ) {}

  ngOnInit(): void {
    this.state.hold(
      this.onAdd$.pipe(
        withLatestFrom(this.globalState.select('ui')),
        tap(([card, ui]) => {
          if (ui.modeState?.trigger?.area == null) {
            return;
          }
          const addIndex =
            card.id === this.dialogData.digimon.card.id
              ? this.dialogData.digimon.evolutionOiriginCardList.length
              : this.dialogData.digimon.evolutionOiriginCardList.findIndex(
                  (v) => v.id === card.id
                );
          if (addIndex === -1) {
            return;
          }
          this.dispatchCardActionService.dispatch({
            type: 'addToEvolutionOrigin',
            card: ui.modeState?.trigger?.card,
            area: ui.modeState?.trigger?.area,
            target: {
              area: 'battleArea',
              digimon: this.dialogData.digimon,
              addIndex,
            },
          });
          this.globalState.set('ui', (state) => ({
            ...state.ui,
            modeState: undefined,
          }));
        })
      )
    );
  }
}
