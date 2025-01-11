import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // Default for Vercel (no subdirectory)
  build: {
    outDir: 'dist', // Explicitly specify the output directory
  },
})
