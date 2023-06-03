import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { environment } from "../../../environments/environment";

@Component({
  selector: 'app-currency-card',
  templateUrl: './currency-card.component.html',
  styleUrls: ['./currency-card.component.css']
})
export class CurrencyCardComponent implements OnChanges, OnInit {
  @Input() currency: string
  @Input() rate: number

  previousRate: number = 0
  difference: number = 0

  private readonly source: string = ''

  constructor() {
    this.source = environment.source
  }

  ngOnInit() {
    this.previousRate = 0
    this.difference = 0
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.rate) {
      this.difference = this.previousRate !== 0 ? this.rate - this.previousRate : 0
      this.previousRate = this.rate
    }
  }
}
