import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173
  },
  build: {
    rollupOptions: {
      output: {
        format: 'es',
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]'
      }
    },
    target: 'esnext',
    modulePreload: {
      polyfill: false
    }
  },
  define: {
    'process.env.VITE_API_URL': JSON.stringify('https://cbe607c9-3188-4a86-a94e-294d3725463d-00-3invf2ruu5pe9.pike.replit.dev:8000/')
  }
})