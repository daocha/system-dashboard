import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Monitor, RefreshCcw, Wifi, WifiOff, Clock, ArrowUpRight, Activity, Server, Database, Globe, Cpu, Shield, HardDrive, Link2, Terminal, Cloud, Zap } from 'lucide-react'

interface SystemStatus {
    name: string;
    url: string;
    link?: string;
    description?: string;
    status: 'up' | 'down' | 'warning';
    latency: number;
    lastChecked: string;
    isChecking?: boolean;
    icon?: string;
}

const ICON_MAP: Record<string, any> = {
    server: Server,
    database: Database,
    globe: Globe,
    cpu: Cpu,
    shield: Shield,
    harddrive: HardDrive,
    link: Link2,
    terminal: Terminal,
    cloud: Cloud,
    activity: Activity,
    zap: Zap,
    monitor: Monitor
}

const FANCY_COLORS = [
    '#2C8CF4', // Muted Blue
    '#34C759', // Muted Green
    '#FF3B30', // Muted Red
    '#FF9500', // Muted Orange
    '#AF52DE', // Muted Purple
    '#FF2D55', // Muted Pink
    '#5856D6', // Muted Indigo
    '#5AC8FA', // Muted Teal
    '#FFCC00', // Muted Yellow
]

function App() {
    const [systems, setSystems] = useState<SystemStatus[]>([])
    const [loading, setLoading] = useState(true)

    const fetchConfig = async () => {
        try {
            const response = await fetch('/config.json')
            const data = await response.json()
            setSystems(data.map((item: any) => ({
                ...item,
                status: 'up',
                latency: 0,
                lastChecked: 'Init...',
                isChecking: false
            })))
            setLoading(false)
        } catch (error) {
            console.error('Failed to load config.json:', error)
            setLoading(false)
        }
    }

    const checkStatus = async (system: SystemStatus) => {
        // Set individual checking state
        setSystems(prev => prev.map(s => s.url === system.url ? { ...s, isChecking: true } : s))

        const start = performance.now()
        try {
            // We use 'no-cors' to allow monitoring cross-origin sites.
            // Note: status will be 0 (opaque) but failure to connect will throw.
            await fetch(system.url, { mode: 'no-cors' })
            const latency = Math.round(performance.now() - start)

            const updated = {
                ...system,
                status: 'up',
                latency,
                lastChecked: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                isChecking: false
            } as SystemStatus
            setSystems(prev => prev.map(s => s.url === system.url ? updated : s))
            return updated
        } catch (error) {
            const updated = {
                ...system,
                status: 'down',
                latency: 0,
                lastChecked: 'Error',
                isChecking: false
            } as SystemStatus
            setSystems(prev => prev.map(s => s.url === system.url ? updated : s))
            return updated
        }
    }

    const refreshAll = async () => {
        // Batch refresh but handled individually for "Checking" state visibility
        await Promise.all(systems.map(checkStatus))
    }

    useEffect(() => {
        fetchConfig()
    }, [])

    useEffect(() => {
        if (systems.length > 0) {
            refreshAll()
            const interval = setInterval(refreshAll, 15000)
            return () => clearInterval(interval)
        }
    }, [loading])

    if (loading) {
        return (
            <div className="apple-container flex items-center justify-center min-h-[50vh]">
                <RefreshCcw className="animate-spin text-apple-blue" size={32} />
            </div>
        )
    }

    const SystemIcon = ({ name, className }: { name?: string, className?: string }) => {
        const Icon = (name && ICON_MAP[name.toLowerCase()]) || Activity
        return <Icon className={className} size={18} />
    }

    return (
        <div className="apple-container">
            <div className="header-meta">
                <div className="flex items-center gap-1.5">
                    <Monitor size={12} className="opacity-60" />
                    <span>&nbsp; &nbsp;System Dashboard</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5">
                        <div className="w-1 h-1 rounded-full bg-apple-blue animate-pulse" />
                        <span>Live Updates Active</span>
                    </div>
                </div>
            </div>

            <header className="apple-header">
                <div className="header-left">
                    <div className="title-row">
                        <h1 className="apple-title">System Monitoring</h1>
                        <button
                            onClick={refreshAll}
                            className="refresh-button"
                            aria-label="Refresh Status"
                        >
                            <RefreshCcw size={18} />
                        </button>
                    </div>
                    <p className="apple-subtitle">Real-time infrastructure health.</p>
                </div>

                <div className="global-status">
                    <div className="health-visual">
                        {systems.map((system, i) => (
                            <div
                                key={`dot-${i}`}
                                className={`health-dot ${system.status}`}
                            />
                        ))}
                    </div>
                    <div className="status-summary">
                        <span className="summary-value">
                            {Math.round((systems.filter(s => s.status === 'up').length / systems.length) * 100)}%
                        </span>
                        <span className="summary-label">System Health</span>
                    </div>
                </div>
            </header>

            <main className="apple-grid">
                <AnimatePresence mode="popLayout">
                    {systems.map((system, index) => (
                        <motion.div
                            key={system.url}
                            layout
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                            className="apple-block group"
                            style={{ '--accent-color': FANCY_COLORS[index % FANCY_COLORS.length] } as any}
                        >
                            <div className="block-header">
                                <div className="max-w-[80%]">
                                    <a
                                        href={system.link || system.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block-name group-hover:opacity-70 transition-opacity flex items-center"
                                    >
                                        <SystemIcon name={system.icon} className="flex-shrink-0 mr-8 transform translate-y-[-0.5px]" />
                                        <span className="truncate">&nbsp;{system.name}</span>
                                        <ArrowUpRight size={14} className="flex-shrink-0 ml-1.5 opacity-0 group-hover:opacity-100 transition-all" />
                                    </a>
                                    <p className="block-url">{new URL(system.link || system.url).hostname}</p>
                                </div>

                                <div className="flex flex-col items-end">
                                    <div className={`status-pill pill-${system.status}`}>
                                        <div className={`status-dot dot-${system.status}`} />
                                        {system.status}
                                    </div>
                                </div>
                            </div>

                            {system.description && (
                                <p className="description-text">
                                    {system.description}
                                </p>
                            )}

                            <div className="latency-display">
                                <div className="flex items-center gap-3">
                                    <div className="flex items-baseline gap-1">
                                        <span className="latency-value">{system.status !== 'down' ? system.latency : '--'}</span>
                                        <span className="latency-unit">ms</span>
                                    </div>
                                    <span className={`checking-indicator ${system.isChecking ? 'visible' : ''}`}>Checking...</span>
                                </div>
                            </div>

                            <div className="last-checked">
                                <Clock size={10} />
                                <span>Verified {system.lastChecked}</span>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </main>
        </div>
    )
}

export default App
