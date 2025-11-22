import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  server:{
    host:"0.0.0.0",
    fs:{
      strict: false,
    }
  },
  base: '/my-portfolio/', // Set the base path for GitHub Pages
  plugins: [react()],
})
