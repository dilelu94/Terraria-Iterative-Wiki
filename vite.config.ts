import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Exact path for your GitHub repository
  base: '/Terraria-Iterative-Wiki/',
})
