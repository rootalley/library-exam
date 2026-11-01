import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base './' so the built files work from any folder, github pages serves this from a subfolder
// vite docs for the base option: https://vite.dev/config/shared-options.html#base
export default defineConfig({
  base: './',
  plugins: [react()],
})
