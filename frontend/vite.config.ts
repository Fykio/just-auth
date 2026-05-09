import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    server: {
        port: 8888,
        proxy: {
            '/api': {
                target: 'http://backend:7777',
                changeOrigin: true,
            }
        }
    }
})