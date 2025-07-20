'use client'

import { useEffect, useRef } from 'react'
import { ExchangeServer } from '@/types/exchange'
import { LatencyConnection } from '@/types/latency'
import { TradeFlow } from '@/types/flow'

type Props = {
    servers: ExchangeServer[]
    connections: LatencyConnection[]
    flows: TradeFlow[]
    theme: 'dark' | 'light'
}


export default function GlobeCanvas({ servers, connections, theme, flows }: Props) {
    const globeRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        let globeInstance: any
        let isMounted = true

        const init = async () => {
            const Globe = (await import('globe.gl')).default
            const THREE = await import('three')

            // Clear previous globe
            if (globeRef.current) {
                globeRef.current.innerHTML = ''
            }

            globeInstance = Globe()(globeRef.current!)
                .globeImageUrl(`/earth-${theme}.png`)
                .backgroundColor('#000000')
                .showAtmosphere(true)
                .atmosphereColor('#00ffff')
                .atmosphereAltitude(0.15)
                .pointOfView({ lat: 20, lng: 0, altitude: 2 })

            const controls = globeInstance.controls()
            if (controls) {
                controls.autoRotate = true
                controls.autoRotateSpeed = 0.3
            }

            const markers = servers.map(s => ({
                lat: s.coordinates[1],
                lng: s.coordinates[0],
                size: 0.6,
                color: '#00ffff',
                label: `${s.exchange} (${s.region})`,
            }))

            globeInstance
                .pointsData(markers)
                .pointAltitude('size')
                .pointColor('color')
                .pointLabel('label')

            const arcs = connections
                .map(c => {
                    const from = servers.find(s => s.id === c.from)
                    const to = servers.find(s => s.id === c.to)
                    if (!from || !to) return null
                    return {
                        startLat: from.coordinates[1],
                        startLng: from.coordinates[0],
                        endLat: to.coordinates[1],
                        endLng: to.coordinates[0],
                        color: '#ffffff',
                        stroke: 1,
                        altitude: 0.3,
                    }
                })
                .filter(Boolean)

            const tradeArcs = flows.map((flow) => {
                const from = servers.find((s) => s.id === flow.from)
                const to = servers.find((s) => s.id === flow.to)
                if (!from || !to) return null
                const intensity = Math.min(flow.volume / 10000, 1)
                return {
                    startLat: from.coordinates[1],
                    startLng: from.coordinates[0],
                    endLat: to.coordinates[1],
                    endLng: to.coordinates[0],
                    color: flow.volume > 10000 ? '#ff6b6b' : '#00ff99',
                    stroke: 1 + intensity * 3,
                    altitude: 0.2 + intensity * 0.4,
                }
            }).filter(Boolean)

            globeInstance
                .arcsData([...arcs, ...tradeArcs] as any)
                .arcColor((d: any) => [d.color, d.color])
                .arcStroke((d: any) => d.stroke)
                .arcAltitude((d: any) => d.altitude)
                .arcDashLength(0.4)
                .arcDashGap(2)
                .arcDashInitialGap(() => Math.random() * 5)
                .arcDashAnimateTime(1000)
                .arcsTransitionDuration(1000)

            // Starfield
            const starGeometry = new THREE.BufferGeometry()
            const starMaterial = new THREE.PointsMaterial({
                color: 0xffffff,
                size: 0.6,
                sizeAttenuation: true,
            })

            const starCount = 2000
            const positions = new Float32Array(starCount * 3)
            for (let i = 0; i < starCount; i++) {
                const radius = 1200 + Math.random() * 400
                const theta = Math.random() * 2 * Math.PI
                const phi = Math.acos(2 * Math.random() - 1)
                const x = radius * Math.sin(phi) * Math.cos(theta)
                const y = radius * Math.sin(phi) * Math.sin(theta)
                const z = radius * Math.cos(phi)
                positions.set([x, y, z], i * 3)
            }

            starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
            const stars = new THREE.Points(starGeometry, starMaterial)

            if (isMounted) {
                globeInstance.scene().add(stars)
            }
        }

        init()

        return () => {
            isMounted = false
            if (globeRef.current) {
                globeRef.current.innerHTML = ''
            }
        }
    }, [theme, servers, connections, flows])

    return <div ref={globeRef} className="w-full h-screen bg-black" />

}
