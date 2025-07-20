export interface ExchangeServer {
    id: string
    name: string
    provider: 'AWS' | 'GCP' | 'Azure'
    exchange: 'Binance' | 'Coinbase' | 'Kraken'
    coordinates: [number, number] // [lng, lat]
    region: string
  }
  