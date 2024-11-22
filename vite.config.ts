import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/user_action': {
        target: 'https://v3.spb.ru',
        changeOrigin: true,
        secure: true,
      }
    }
  },
  base: '/request_app_frontend/',
  build: {
    outDir: 'dist',
  },
});