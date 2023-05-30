import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CurrencyService } from '../../services/currency.service';

@Component({
  selector: 'app-currency-card',
  templateUrl: './currency-card.component.html',
  styleUrls: ['./currency-card.component.css']
})
export class CurrencyCardComponent implements OnInit, OnDestroy {
  @Input() currency: string

  currentRate: number = 0
  difference: number = 0

  private subscription: Subscription
  private unsubscribe$ = new Subject<void>()

  constructor(private currencyService: CurrencyService) {
  }

  ngOnInit() {
    this.subscription = this.currencyService
      .getCurrencyData()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        const newRate = 1 / Number(data?.quotes[`RUB${this.currency}`])
        this.difference = this.currentRate ? newRate - this.currentRate : 0
        this.currentRate = newRate
      })
  }

  ngOnDestroy() {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }
}
