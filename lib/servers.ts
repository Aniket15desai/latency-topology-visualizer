import { ExchangeServer } from '@/types/exchange'

export const exchangeServers: ExchangeServer[] = [
  {
    id: 'aws-ny',
    name: 'AWS New York',
    provider: 'AWS',
    exchange: 'Coinbase',
    region: 'us-east-1',
    coordinates: [-74.006, 40.7128],
  },
  {
    id: 'gcp-tokyo',
    name: 'GCP Tokyo',
    provider: 'GCP',
    exchange: 'Binance',
    region: 'asia-northeast1',
    coordinates: [139.6917, 35.6895],
  },
  {
    id: 'azure-london',
    name: 'Azure London',
    provider: 'Azure',
    exchange: 'Kraken',
    region: 'uk-south',
    coordinates: [-0.1276, 51.5072],
  },
]
