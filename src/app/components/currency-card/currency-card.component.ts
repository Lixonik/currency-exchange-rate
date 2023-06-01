import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CurrencyService } from '../../services/currency.service';
import { environment } from "../../../environments/environment";

@Component({
  selector: 'app-currency-card',
  templateUrl: './currency-card.component.html',
  styleUrls: ['./currency-card.component.css']
})
export class CurrencyCardComponent implements OnInit, OnDestroy {
  @Input() currency: string

  currentRate: number = 0
  difference: number = 0

  private readonly source: string = ''
  private subscription: Subscription = new Subscription()

  constructor(private currencyService: CurrencyService) {
    this.source = environment.source
  }

  ngOnInit() {
    this.subscription = this.currencyService
      .getCurrencyData()
      .subscribe((data) => {
        const key = `${this.source}${this.currency}`
        const newRate = 1 / Number(data?.quotes[key])
        this.difference = this.currentRate ? newRate - this.currentRate : 0
        this.currentRate = newRate
      })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}
