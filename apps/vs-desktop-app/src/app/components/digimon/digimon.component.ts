import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostListener,
  Inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RxState } from '@rx-angular/state';
import { Digimon } from '../../domain/digimon';
import { GlobalState, GLOBAL_RX_STATE } from '../../global-state';
import { CardActionEvent, CardActionItem } from '../card/card.component';
import { ExpandCardViewDialogComponent } from '../expand-card-view-dialog/expand-card-view-dialog.component';

@Component({
  selector: 'digimon-card-app-digimon',
  templateUrl: './digimon.component.html',
  styleUrls: ['./digimon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DigimonComponent implements OnInit {
  @Input() digimon!: Digimon;
  @Input() actionList: CardActionItem[] = [];
  @Output() selected = new EventEmitter<void>();
  @Output() action = new EventEmitter<CardActionEvent>();

  /**
   * State
   */
  readonly gs$ = this.globalState.select();

  constructor(
    @Inject(GLOBAL_RX_STATE) private readonly globalState: RxState<GlobalState>,
    private readonly dialog: MatDialog
  ) {}

  @HostListener('click', ['$event'])
  clicked() {
    this.dialog.open(ExpandCardViewDialogComponent, {
      width: '448px',
      height: `${559 + 48}px`,
      data: {
        cardId: this.digimon.card.id,
        src: this.digimon.card.imgSrc,
      },
    });
  }

  ngOnInit(): void {
    if (this.digimon == null) {
      throw new Error('digimon is required');
    }
  }
}
