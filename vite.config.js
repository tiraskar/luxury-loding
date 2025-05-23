// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   base: '',
// })


// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/',
  server: {
    historyApiFallback: true, // Ensures SPA routing is respected
    cors: true // Added for Authorize.Net seal script
  },
  optimizeDeps: {
    exclude: ['verify.authorize.net']
  },
  build: {
    rollupOptions: {
      external: [
        'https://verify.authorize.net/anetseal/seal.js'
      ]
    }
  }
});
