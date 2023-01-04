import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { RxState } from '@rx-angular/state';
import { Subject } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { CustomMenueTriggerDirective } from '../../custom-menu-trigger.directive';
import { Card, CardAction } from '../../types';
import { ExpandCardViewDialogComponent } from '../expand-card-view-dialog/expand-card-view-dialog.component';

@Component({
  selector: 'digimon-card-app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState],
})
export class CardComponent implements OnInit {
  @Input() card!: Card;
  @Input() actionList: CardActionItem[] = [];
  @Input() disableClick = false;
  @Output() action = new EventEmitter<CardActionEvent>();
  @ViewChild(CustomMenueTriggerDirective) trigger?: CustomMenueTriggerDirective;

  readonly onContextMenu$ = new Subject<Event>();
  readonly onClick$ = new Subject<void>();
  readonly onAction$ = new Subject<CardActionItem>();

  constructor(
    private readonly state: RxState<Record<string, never>>,
    private readonly dialog: MatDialog
  ) {}

  ngOnInit(): void {
    if (this.card == null) {
      throw new Error('card is required');
    }
    this.state.hold(
      this.onContextMenu$.pipe(
        tap((v) => {
          v.preventDefault();
          this.trigger?.openMenu();
        })
      )
    );
    this.state.hold(
      this.onClick$.pipe(
        filter(() => !this.disableClick),
        tap(() => {
          this.dialog.open(ExpandCardViewDialogComponent, {
            width: '448px',
            height: `${559 + 48}px`,
            data: {
              src: this.card.imgSrc,
            },
          });
        })
      )
    );
    this.state.hold(
      this.onAction$.pipe(
        tap((event) => this.action.emit({ ...event, card: this.card }))
      )
    );
  }
}

export type CardActionItem = {
  action: CardAction;
  displayText: string;
};

export type CardActionEvent = CardActionItem & {
  card: Card;
};
