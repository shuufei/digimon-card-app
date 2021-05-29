import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TuiButtonModule, TuiRootModule } from '@taiga-ui/core';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    TuiRootModule,
    TuiButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
