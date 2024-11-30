import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  base: mode === 'production' ? '/request_app_frontend/' : '/',
  build: {
    outDir: 'dist',
  },
  server: {
    proxy: {
      '/user_action': {
        target: 'https://v3.spb.ru',
        changeOrigin: true,
      },
    },
  },
}));