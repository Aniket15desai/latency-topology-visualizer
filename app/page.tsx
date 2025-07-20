'use client'

import { useState } from 'react'
import { exchangeServers } from '@/lib/servers'
import { latencyConnections } from '@/lib/latency'
import { simulatedTradeFlow } from '@/lib/flow'
import dynamic from 'next/dynamic'
import ThemeToggle from '@/components/ThemeToggle'

const GlobeCanvas = dynamic(() => import('@/components/GlobeCanvas'), { ssr: false })

export default function HomePage() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')

  return (
    <main className="w-full h-screen bg-black">
      <ThemeToggle theme={theme} setTheme={setTheme} />
      <GlobeCanvas
        theme={theme}
        servers={exchangeServers}
        connections={latencyConnections}
        flows={simulatedTradeFlow}
      />
    </main>
  )
}
