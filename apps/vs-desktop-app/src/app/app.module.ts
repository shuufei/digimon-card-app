import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { RxState } from '@rx-angular/state';
import { AngularMaterialModule } from './angular-material.module';
import { AppComponent } from './app.component';
import { CardComponent } from './components/card/card.component';
import { DigimonComponent } from './components/digimon/digimon.component';
import { ExpandCardViewDialogComponent } from './components/expand-card-view-dialog/expand-card-view-dialog.component';
import { CustomMenueTriggerDirective } from './custom-menu-trigger.directive';
import { GlobalState, GLOBAL_RX_STATE } from './global-state';
import { ArrayReversePipe } from './pipes/array-reverse.pipe';
import { StackComponent } from './components/area/stack/stack.component';
import { BattleAreaComponent } from './components/area/battle-area/battle-area.component';
import { HandComponent } from './components/area/hand/hand.component';
import { OptionAreaComponent } from './components/area/option-area/option-area.component';
import { TamerAreaComponent } from './components/area/tamer-area/tamer-area.component';
import { TrashAreaComponent } from './components/area/trash-area/trash-area.component';
import { SecurityAreaComponent } from './components/area/security-area/security-area.component';
import { RaisingAreaComponent } from './components/area/raising-area/raising-area.component';
import { SecurityOpenAreaComponent } from './components/area/security-open-area/security-open-area.component';
import { StackOpenAreaComponent } from './components/area/stack-open-area/stack-open-area.component';
import { SecurityCheckAreaComponent } from './components/area/security-check-area/security-check-area.component';
import { TrashConfirmDialogComponent } from './components/trash-confirm-dialog/trash-confirm-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomMenueTriggerDirective,
    CardComponent,
    ExpandCardViewDialogComponent,
    DigimonComponent,
    ArrayReversePipe,
    StackComponent,
    BattleAreaComponent,
    HandComponent,
    OptionAreaComponent,
    TamerAreaComponent,
    TrashAreaComponent,
    SecurityAreaComponent,
    RaisingAreaComponent,
    SecurityOpenAreaComponent,
    StackOpenAreaComponent,
    SecurityCheckAreaComponent,
    TrashConfirmDialogComponent,
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
