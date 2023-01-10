import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
import { RxState } from '@rx-angular/state';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { GlobalState, GLOBAL_RX_STATE } from '../../global-state';
import { DispatchCardActionService } from '../../services/dispatch-card-action/dispatch-card-action.service';
import { DispatchDeckService } from '../../services/dispatch-deck.service';

@Component({
  selector: 'digimon-card-app-deck-import-dialog',
  templateUrl: './deck-import-dialog.component.html',
  styleUrls: ['./deck-import-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState],
})
export class DeckImportDialogComponent implements OnInit {
  @ViewChild('fileInput') fileInputEl?: ElementRef;
  readonly onClickedImport$ = new Subject<void>();
  readonly onChangedFile$ = new Subject<Event>();

  constructor(
    private readonly state: RxState<Record<string, never>>,
    @Inject(GLOBAL_RX_STATE) private readonly globalState: RxState<GlobalState>,
    private readonly dispatchDeckService: DispatchDeckService,
    private readonly dispatchCardActionService: DispatchCardActionService,
    private dialogRef: MatDialogRef<DeckImportDialogComponent>
  ) {}

  ngOnInit(): void {
    this.state.hold(
      this.onClickedImport$.pipe(
        tap(() => {
          if (this.fileInputEl?.nativeElement == null) return;
          (this.fileInputEl.nativeElement as HTMLElement).click();
        })
      )
    );
    this.state.hold(
      this.onChangedFile$.pipe(
        tap((event) => {
          const reader = new FileReader();
          reader.onload = (loadEvent: Event) => {
            const data = JSON.parse((loadEvent.target as any).result);
            this.dispatchDeckService.dispatch(data);
            this.dispatchCardActionService.dispatch({
              type: 'reset',
              area: 'whole',
            });
            this.dialogRef.close();
          };
          reader.readAsText((event.target as any).files[0]);
        })
      )
    );
  }
}
