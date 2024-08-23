import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'build',
  },
  server:{
    proxy:{
      '/api':{
        target: 'https://wedbliss.live',
        secure : false,
      }
    }
  }
})
