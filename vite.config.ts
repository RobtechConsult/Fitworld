import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

// GitHub Pages serves this project site under /<repo-name>/.
// Repo: RobtechConsult/Fitworld  ->  base '/Fitworld/'
const BASE = '/Fitworld/'

export default defineConfig({
  base: BASE,
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icons/icon.svg', 'icons/apple-touch-icon.png'],
      manifest: {
        name: 'ForgeFit',
        short_name: 'ForgeFit',
        description: 'Deine eigene Trainings-App – Übungen, Pläne, Tracking, Fortschritt.',
        theme_color: '#0b0b12',
        background_color: '#0b0b12',
        display: 'standalone',
        orientation: 'portrait',
        start_url: BASE,
        scope: BASE,
        icons: [
          { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png' },
          {
            src: 'icons/icon-512-maskable.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,woff2}'],
        // Übungsfotos (jpg) nicht vorab bündeln (zu groß), sondern beim
        // ersten Ansehen cachen -> danach offline verfügbar.
        runtimeCaching: [
          {
            urlPattern: ({ url }) => url.pathname.includes('/exercise-images/'),
            handler: 'CacheFirst',
            options: {
              cacheName: 'forgefit-exercise-images',
              expiration: { maxEntries: 120, maxAgeSeconds: 60 * 60 * 24 * 90 },
            },
          },
        ],
      },
    }),
  ],
})
