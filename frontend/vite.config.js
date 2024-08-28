import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://wedbliss.live',
        changeOrigin: true,  // Add this line
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '')  // Optional, depending on your API endpoint
      }
    }
  }
})
