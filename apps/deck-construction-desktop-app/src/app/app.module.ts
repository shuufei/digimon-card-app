import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { CardComponent } from './components/card/card.component';
import { LogoComponent } from './components/logo/logo.component';
import { FilterAndSortComponent } from './components/filter-and-sort/filter-and-sort.component';
import { FilterDialogComponent } from './components/filter-dialog/filter-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    LogoComponent,
    FilterAndSortComponent,
    FilterDialogComponent,
  ],
  imports: [BrowserModule, BrowserAnimationsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [FilterDialogComponent],
})
export class AppModule {}
