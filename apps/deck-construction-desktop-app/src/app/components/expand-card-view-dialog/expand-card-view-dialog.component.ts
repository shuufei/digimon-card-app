import {
  Component,
  Inject,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';

@Component({
  selector: 'digimon-card-app-expand-card-view-dialog',
  templateUrl: './expand-card-view-dialog.component.html',
  styleUrls: ['./expand-card-view-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpandCardViewDialogComponent implements AfterViewInit {
  @ViewChild('cardImg') cardImgEl?: ElementRef;
  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: { src: string }) {}

  ngAfterViewInit() {
    if (this.cardImgEl?.nativeElement == null) {
      return;
    }
    (this.cardImgEl.nativeElement as HTMLElement).style.width = `400px`;
  }
}
