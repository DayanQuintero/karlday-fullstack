import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Redirige las peticiones locales /api a tu backend en el puerto 10000
      '/api': {
        target: 'http://localhost:10000',
        changeOrigin: true,
      }
    }
  }
})