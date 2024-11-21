import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/user_action': {
        target: 'http://195.200.18.50:3000',
        changeOrigin: true,
        secure: false,
      }
    }
  },
  base: '/request_app_frontend/',
  build: {
    outDir: 'dist',
  },
});