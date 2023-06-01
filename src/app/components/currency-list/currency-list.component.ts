import { Component, OnInit, OnDestroy } from '@angular/core';
import { CurrencyService } from '../../services/currency.service';
import { Subscription } from 'rxjs';
import { environment } from "../../../environments/environment";

@Component({
  selector: 'app-currency-list',
  templateUrl: './currency-list.component.html',
  styleUrls: ['./currency-list.component.css']
})
export class CurrencyListComponent implements OnInit, OnDestroy {
  showMore = false
  currencies = environment.currencies
  visibleCurrencies: string[] = []
  currentDateTime: Date
  errorMessage: string = ''

  private subscription: Subscription = new Subscription()

  constructor(private currencyService: CurrencyService) {
    this.currentDateTime = new Date()
    setInterval(() => {
      this.currentDateTime = new Date()
    }, 1000)
  }

  ngOnInit() {
    this.updateVisibleCurrencies()
    this.subscription = this.currencyService.getCurrencyData().subscribe(
      (data) => {
        this.errorMessage = ''
      },
      (error) => {
        console.error('Error fetching currency data:', error)
        this.errorMessage = error?.error?.message
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

  toggleShowMore() {
    this.showMore = !this.showMore
    this.updateVisibleCurrencies()
  }

  updateVisibleCurrencies() {
    this.visibleCurrencies = this.showMore ? this.currencies : this.currencies.slice(0, 3)
  }
}
