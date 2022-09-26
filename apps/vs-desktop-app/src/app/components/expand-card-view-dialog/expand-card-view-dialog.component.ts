import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RxState } from '@rx-angular/state';
import { merge, Subject } from 'rxjs';
import { filter, map, startWith, tap } from 'rxjs/operators';
import { Digimon } from '../../domain/digimon';
import { GlobalState, GLOBAL_RX_STATE } from '../../global-state';
import { DispatchCardActionService } from '../../services/dispatch-card-action/dispatch-card-action.service';
import { Card } from '../../types';
import { CardActionEvent, CardActionItem } from '../card/card.component';

@Component({
  selector: 'digimon-card-app-expand-card-view-dialog',
  templateUrl: './expand-card-view-dialog.component.html',
  styleUrls: ['./expand-card-view-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState],
})
export class ExpandCardViewDialogComponent implements OnInit, AfterViewInit {
  @ViewChild('cardImg') cardImgEl?: ElementRef;

  /**
   * Constants
   */
  readonly evolutionOriginActionList: CardActionItem[] = [
    {
      action: 'trash',
      displayText: '破棄',
    },
    {
      action: 'draw',
      displayText: '手札に戻す',
    },
    {
      action: 'save',
      displayText: 'セーブ',
    },
  ];

  readonly evolutionOriginCardListSelfSide$ = this.globalState
    .select('playState')
    .pipe(
      map((playState) => {
        const digimon =
          playState.battleArea.digimonList.find(
            (v) => v.card.id === this.dialogData.cardId
          ) ??
          (playState.standbyArea.digimon?.card.id === this.dialogData.cardId
            ? playState.standbyArea.digimon
            : undefined);
        console.log('self side digimon: ', digimon);
        return digimon;
      }),
      filter((digimon): digimon is Digimon => digimon != null),
      map((v) => v.evolutionOiriginCardList)
    );
  readonly evolutionOriginCardListOtherSide$ = this.globalState
    .select('otherSidePlayState')
    .pipe(
      map((playState) => {
        const digimon =
          playState.battleArea.digimonList.find(
            (v) => v.card.id === this.dialogData.cardId
          ) ??
          (playState.standbyArea.digimon?.card.id === this.dialogData.cardId
            ? playState.standbyArea.digimon
            : undefined);
        console.log(' other side digimon: ', digimon);
        return digimon;
      }),
      filter((digimon): digimon is Digimon => digimon != null),
      map((v) => v.evolutionOiriginCardList)
    );
  readonly evolutionOriginCardList$ = merge(
    this.evolutionOriginCardListSelfSide$,
    this.evolutionOriginCardListOtherSide$
  ).pipe(startWith([]));

  readonly onAction$ = new Subject<CardActionEvent>();

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public dialogData: { src: string; cardId: Card['id'] },
    @Inject(GLOBAL_RX_STATE) private globalState: RxState<GlobalState>,
    private readonly state: RxState<Record<string, never>>,
    readonly dispatchCardActionService: DispatchCardActionService
  ) {}

  ngOnInit(): void {
    this.state.hold(
      this.onAction$.pipe(
        tap((event) => {
          this.dispatchCardActionService.dispatch({
            type: event.action,
            card: event.card,
            area: 'evolutionOrigin',
          });
        })
      )
    );
  }

  ngAfterViewInit() {
    if (this.cardImgEl?.nativeElement == null) {
      return;
    }
    (this.cardImgEl.nativeElement as HTMLElement).style.width = `400px`;
  }
}
