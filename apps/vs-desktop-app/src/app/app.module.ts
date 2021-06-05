import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { RxState } from '@rx-angular/state';
import { AngularMaterialModule } from './angular-material.module';
import { AppComponent } from './app.component';
import { CardComponent } from './components/card/card.component';
import { ExpandCardViewDialogComponent } from './components/expand-card-view-dialog/expand-card-view-dialog.component';
import { CustomMenueTriggerDirective } from './custom-menu-trigger.directive';
import { GlobalState, GLOBAL_RX_STATE } from './global-state';
import { DigimonComponent } from './components/digimon/digimon.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomMenueTriggerDirective,
    CardComponent,
    ExpandCardViewDialogComponent,
    DigimonComponent,
  ],
  imports: [
    AngularMaterialModule,
    BrowserModule,
    RouterModule.forRoot([], { initialNavigation: 'enabled' }),
  ],
  providers: [
    {
      provide: GLOBAL_RX_STATE,
      useFactory: () => new RxState<GlobalState>(),
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
