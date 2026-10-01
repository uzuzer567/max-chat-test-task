import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  base: '/max-chat-test-task/',
  plugins: [react()],
  server: {
    port: 3000,
  }
})
