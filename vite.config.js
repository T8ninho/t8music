import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  preview: {
  	host: true,
  	port: 5006,
  },
  server: {
  	host: true,
  	port: 5006,
  },
})
