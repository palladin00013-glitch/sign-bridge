import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,mp4}'],
        maximumFileSizeToCacheInBytes: 15 * 1024 * 1024, // videos are heavy
        runtimeCaching: [
          {
            urlPattern: /\/videos\/.*\.mp4$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'sign-videos',
              expiration: { maxEntries: 60, maxAgeSeconds: 60 * 60 * 24 * 30 },
            },
          },
        ],
      },
      manifest: {
        name: 'SignBridge',
        short_name: 'SignBridge',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#1e88e5',
        icons: [
          { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
        ],
      },
    }),
  ],
})