import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CardInfo } from '../../types';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FilterDialogComponent } from '../filter-dialog/filter-dialog.component';
import { ExpandCardViewDialogComponent } from '../expand-card-view-dialog/expand-card-view-dialog.component';

type Size = 's' | 'm';

@Component({
  selector: 'digimon-card-app-card-img',
  templateUrl: './card-img.component.html',
  styleUrls: ['./card-img.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardImgComponent {
  @Input() src: CardInfo['imgSrc'] = '';
  @Input() size: Size = 'm';

  constructor(private readonly dialog: MatDialog) {}

  expandView() {
    this.dialog.open(ExpandCardViewDialogComponent, {
      width: '448px',
      height: `${559 + 48}px`,
      data: {
        src: this.src,
      },
    });
  }
}
