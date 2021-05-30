import { Component, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from './service/api.service';

@Component({
  selector: 'digimon-card-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'deck-construction-desktop-app';

  private readonly bt01Cards$ = this.apiService.listCardInfo('BT01');
  private readonly bt02Cards$ = this.apiService.listCardInfo('BT02');
  private readonly bt03Cards$ = this.apiService.listCardInfo('BT03');
  private readonly bt04Cards$ = this.apiService.listCardInfo('BT04');
  private readonly bt05Cards$ = this.apiService.listCardInfo('BT05');
  private readonly bt06Cards$ = this.apiService.listCardInfo('BT06');
  private readonly st01Cards$ = this.apiService.listCardInfo('ST01');
  private readonly st02Cards$ = this.apiService.listCardInfo('ST02');
  private readonly st03Cards$ = this.apiService.listCardInfo('ST03');
  private readonly st04Cards$ = this.apiService.listCardInfo('ST04');
  private readonly st05Cards$ = this.apiService.listCardInfo('ST05');
  private readonly st06Cards$ = this.apiService.listCardInfo('ST06');
  private readonly st07Cards$ = this.apiService.listCardInfo('ST07');
  private readonly st08Cards$ = this.apiService.listCardInfo('ST08');

  readonly cards$ = combineLatest([
    this.bt01Cards$,
    this.bt02Cards$,
    this.bt03Cards$,
    this.bt04Cards$,
    this.bt05Cards$,
    this.bt06Cards$,
    this.st01Cards$,
    this.st02Cards$,
    this.st03Cards$,
    this.st04Cards$,
    this.st05Cards$,
    this.st06Cards$,
    this.st07Cards$,
    this.st08Cards$,
  ]).pipe(
    map((response) => {
      return response.flat();
    })
  );

  constructor(private readonly apiService: ApiService) {}
}
