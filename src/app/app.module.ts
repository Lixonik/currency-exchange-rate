import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from "@angular/material/icon";
import { CurrencyCardComponent } from "./components/currency-card/currency-card.component";
import { CurrencyListComponent } from "./components/currency-list/currency-list.component";
import { HttpClientModule } from "@angular/common/http";
import { MatButtonModule } from "@angular/material/button";
import { RoundAndStringifyPipe } from './pipes/round-and-stringify.pipe';
import { SignPrefixPipe } from './pipes/sign-prefix.pipe';

@NgModule({
  declarations: [
    AppComponent,
    CurrencyCardComponent,
    CurrencyListComponent,
    RoundAndStringifyPipe,
    SignPrefixPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
