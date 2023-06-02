export const environment = {
  production: false,

  source: 'RUB',
  currencies: ['USD', 'EUR', 'GBP', 'CNY', 'JPY', 'TRY'],

  API_KEY:  'AKIu6YLorsRocwxRPgnotKb6q2faUqtq', /* if the limit is exhausted, use one of these keys
   'BAJZ4EMREqfRR8ZS6Rh9y2eYLHdkm4h5', '6uKpZlswZ7hQ7HsFk0khiJaAkvUoCbGp', 'AKIu6YLorsRocwxRPgnotKb6q2faUqtq',
   'ug3rjhXnBpJ2VrUs45eMGFVz0U8xBv9G', 'PmCLpxqNLflJzC2JKBCauFNaAD1Liud4', 'HTr64up3sABnlg5DPQTlw0Z2i5JrY3w6'
  */

  get API_URL(): string {
    const source = encodeURIComponent(this.source)
    const currencies = this.currencies.map(currency => encodeURIComponent(currency)).join(',')
    return `https://api.apilayer.com/currency_data/live?source=${source}&currencies=${currencies}`
  }
}
