import { Component, OnDestroy, OnInit } from '@angular/core';
import { CurrencyService } from '../../services/currency.service';
import { Subscription, timer } from 'rxjs';
import { environment } from "../../../environments/environment";

@Component({
  selector: 'app-currency-list',
  templateUrl: './currency-list.component.html',
  styleUrls: ['./currency-list.component.css']
})
export class CurrencyListComponent implements OnInit, OnDestroy {
  showMore = false
  source = environment.source

  currencies = environment.currencies
  visibleCurrencies: string[] = []
  rates: { [currency: string]: number } = {}

  currentDateTime: Date
  errorMessage: string = ''

  private dataSubscription: Subscription = new Subscription()
  private errorSubscription: Subscription = new Subscription()

  constructor(private currencyService: CurrencyService) {
    timer(0, 1000).subscribe(() => this.currentDateTime = new Date())
  }

  ngOnInit() {
    this.updateVisibleCurrencies()
    this.dataSubscription = this.currencyService.getCurrencyData().subscribe(data => {
      const quotes = data?.quotes
      for (const currency of this.currencies) {
        const key = `${this.source}${currency}`
        this.rates[currency] = 1 / Number(quotes[key])
      }
    })
    this.errorSubscription = this.currencyService.getErrorMessage$().subscribe(errorMessage => this.errorMessage = errorMessage)
  }

  ngOnDestroy() {
    this.dataSubscription.unsubscribe()
    this.errorSubscription.unsubscribe()
  }

  toggleShowMore() {
    this.showMore = !this.showMore
    this.updateVisibleCurrencies()
  }

  updateVisibleCurrencies() {
    this.visibleCurrencies = this.showMore ? this.currencies : this.currencies.slice(0, 3)
  }
}
