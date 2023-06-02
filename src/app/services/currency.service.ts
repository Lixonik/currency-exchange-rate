import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, timer } from 'rxjs';
import { environment } from "../../environments/environment";
import { ICurrencyData } from "../models/currency-data";

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private apiKey = environment.API_KEY
  private apiUrl = environment.API_URL
  private headers = { 'apikey': this.apiKey }

  private dataSubject: Subject<ICurrencyData> = new Subject<ICurrencyData>()
  private errorMessageSubject: Subject<string> = new Subject<string>()

  constructor(private http: HttpClient) {
    this.startDataRefresh()
  }

  private startDataRefresh(): void {
    timer(0, 5000).subscribe(() => this.refreshData())
  }

  private refreshData(): void {
    this.http.get<ICurrencyData>(this.apiUrl, { headers: this.headers }).subscribe(data => {
      this.dataSubject.next(data)
      console.log(data)
      this.errorMessageSubject.next('')
    }, error => {
      console.error('Error fetching currency data:', error)
      this.errorMessageSubject.next(error?.error?.message || 'An error occurred while fetching currency data.')
    })
  }

  getCurrencyData(): Observable<ICurrencyData> {
    return this.dataSubject.asObservable()
  }

  getErrorMessage$(): Observable<string> {
    return this.errorMessageSubject.asObservable()
  }
}
