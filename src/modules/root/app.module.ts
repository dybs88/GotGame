import { MainBoardModule } from './../mainBoard/mainBoard.module';
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    MainBoardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
