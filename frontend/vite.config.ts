import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5174',  // Your backend server
        changeOrigin: true,  // Ensures that the request origin is changed to the target server
        rewrite: (path) => path.replace(/^\/api/, '')  // Strips '/api' from the path before forwarding it
      }
    }
  }
})
