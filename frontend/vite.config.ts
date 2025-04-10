import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    headers: {
      "Content-Security-Policy": 
  "default-src 'self'; " +
  "script-src 'self' 'unsafe-inline'; " +  // Allow scripts from the same origin and inline scripts
  "style-src 'self' 'unsafe-inline'; " +  // Allow styles from the same origin and inline styles
  "img-src 'self' data: https://intex-backend-4logan-g8agdge9hsc2aqep.westus-01.azurewebsites.net; " +
  "font-src 'self'; " +
  "connect-src 'self' https://intex-backend-4logan-g8agdge9hsc2aqep.westus-01.azurewebsites.net; " +
  "frame-src https://www.youtube.com; " +
  "object-src 'none'; " +  // Block all plugins and objects
  "base-uri 'self'; " +    // Only allow the base URI to be the same origin
  "form-action 'self'; " + // Only allow forms to be submitted to the same origin
  "report-uri /csp-violation-report-endpoint;"  // Optional: CSP violation reporting endpoint

    }
  }
});
