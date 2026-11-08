import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { rmSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

// Static build into ../demo/ (served by GitHub Pages at /pulso-upch/demo/). No backend needed.
// emptyOutDir is off so files dropped into demo/ by hand (demo/pulso-demo.mp4, used by /expo/)
// survive a rebuild; only the hashed bundle folder is cleared before each build.
const assets = fileURLToPath(new URL('../demo/assets', import.meta.url))
const cleanAssets = { name: 'clean-demo-assets', apply: 'build', buildStart() { rmSync(assets, { recursive: true, force: true }) } }

export default defineConfig({
  plugins: [react(), cleanAssets],
  base: './',
  build: { outDir: '../demo', emptyOutDir: false },
  server: { fs: { allow: ['..'] } },
})
