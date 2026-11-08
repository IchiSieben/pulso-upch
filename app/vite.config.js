import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// Static build into ../demo/ (served by GitHub Pages at /pulso-upch/demo/). No backend needed.
export default defineConfig({
  plugins: [react()],
  base: './',
  build: { outDir: '../demo', emptyOutDir: true },
  server: { fs: { allow: ['..'] } },
})
