import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PopupContentModule } from './components/popup-content/popup-content.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    PopupContentModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
