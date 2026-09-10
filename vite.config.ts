import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        VitePWA({
            registerType: 'autoUpdate',
            includeAssets: ['favicon.png', 'apple-touch-icon.png'],
            manifest: {
                name: 'System Dashboard',
                short_name: 'SysDash',
                description: 'Real-time infrastructure monitoring dashboard.',
                theme_color: '#000000',
                background_color: '#000000',
                display: 'standalone',
                start_url: './',
                scope: './',
                icons: [
                    {
                        src: 'pwa-192x192.png',
                        sizes: '192x192',
                        type: 'image/png'
                    },
                    {
                        src: 'pwa-512x512.png',
                        sizes: '512x512',
                        type: 'image/png'
                    },
                    {
                        src: 'pwa-512x512.png',
                        sizes: '512x512',
                        type: 'image/png',
                        purpose: 'maskable'
                    }
                ]
            },
            workbox: {
                // Never precache/serve the user's private, git-ignored config.json from
                // the cache — it must always be fetched fresh from the network.
                globIgnores: ['**/config.json']
            }
        })
    ],
    base: './'
})
