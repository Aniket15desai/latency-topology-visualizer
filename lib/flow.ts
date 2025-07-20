import { TradeFlow } from '@/types/flow'

export const simulatedTradeFlow: TradeFlow[] = [
  {
    from: 'aws-ny',
    to: 'gcp-tokyo',
    volume: 8000,
    timestamp: new Date().toISOString(),
  },
  {
    from: 'gcp-tokyo',
    to: 'azure-london',
    volume: 1200,
    timestamp: new Date().toISOString(),
  },
  {
    from: 'azure-london',
    to: 'aws-ny',
    volume: 25000,
    timestamp: new Date().toISOString(),
  },
]
