import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, timer, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { environment } from "../../environments/environment";
import { ICurrenciesData } from "../models/currencies-data";

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private apiKey = environment.API_KEY
  private apiUrl = environment.API_URL
  private headers = { 'apikey': this.apiKey }

  private lastUpdate: number
  private cachedData: ICurrenciesData

  constructor(private http: HttpClient) { }

  getCurrencyData(): Observable<ICurrenciesData> {
    if (this.cachedData && this.lastUpdate && Date.now() - this.lastUpdate < 5000) {
      return of(this.cachedData)
    } else {
      return timer(0, 5000).pipe(
        switchMap(() => this.http.get<ICurrenciesData>(this.apiUrl, { headers: this.headers })),
        tap((data) => {
          this.lastUpdate = data?.timestamp || Date.now()
          this.cachedData = data
        })
      )
    }
  }
}
