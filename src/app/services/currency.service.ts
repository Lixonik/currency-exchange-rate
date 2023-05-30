import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, timer, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private apiKey = environment.API_KEY
  private apiUrl = environment.API_URL
  private headers = { 'apikey': this.apiKey }

  private lastUpdate: number
  private cachedData: any

  constructor(private httpClient: HttpClient) { }

  getCurrencyData(): Observable<any> {
    if (this.cachedData && this.lastUpdate && Date.now() - this.lastUpdate < 5000) {
      return of(this.cachedData)
    } else {
      return timer(0, 5000).pipe(
        switchMap(() => this.httpClient.get(this.apiUrl, { headers: this.headers }))
      )
    }
  }
}
