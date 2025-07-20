import { LatencyConnection } from '@/types/latency'

export const latencyConnections: LatencyConnection[] = [
  {
    from: 'aws-ny',
    to: 'gcp-tokyo',
    latencyMs: 240,
    timestamp: new Date().toISOString(),
  },
  {
    from: 'aws-ny',
    to: 'azure-london',
    latencyMs: 95,
    timestamp: new Date().toISOString(),
  },
  {
    from: 'azure-london',
    to: 'gcp-tokyo',
    latencyMs: 210,
    timestamp: new Date().toISOString(),
  },
]
