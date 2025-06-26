import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/front-end-inspiration-board/',
  // base: 'https://smilesmilejin.github.io/front-end-inspiration-board/',
  plugins: [react()],
})
