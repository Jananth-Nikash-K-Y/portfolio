import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    proxy: {
      '/api': {
        target: process.env.NODE_ENV === 'production' 
          ? 'https://cbe607c9-3188-4a86-a94e-294d3725463d-00-3invf2ruu5pe9.pike.replit.dev'  // Production: Replit
          : 'http://localhost:8000', // Development: Local server
        changeOrigin: true,
        secure: false,
        ws: true
      }
    }
  }
})