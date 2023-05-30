import { Component } from '@angular/core';
import { CurrencyService } from '../../services/currency.service';

@Component({
  selector: 'app-currency-list',
  templateUrl: './currency-list.component.html',
  styleUrls: ['./currency-list.component.css']
})
export class CurrencyListComponent {
  showMore = false
  currencies = ['USD', 'EUR', 'GBP', 'CNY', 'JPY', 'TRY']
  visibleCurrencies: string[] = []
  currentDateTime: Date
  errorMessage: string = ''

  constructor(private currencyService: CurrencyService) {
    this.updateVisibleCurrencies()
    this.currentDateTime = new Date()
    setInterval(() => {
      this.currentDateTime = new Date()
    }, 1000)

    this.currencyService.getCurrencyData().subscribe(
      (data) => {
        this.errorMessage = ''
      },
      (error) => {
        console.error('Error fetching currency data:', error)
        this.errorMessage = error?.error?.message
      }
    )
  }

  toggleShowMore() {
    this.showMore = !this.showMore
    this.updateVisibleCurrencies()
  }

  updateVisibleCurrencies() {
    this.visibleCurrencies = this.showMore ? this.currencies : this.currencies.slice(0, 3)
  }
}
