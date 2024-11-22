import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  base: '/request_app_frontend/',
  build: {
    outDir: 'dist',
  },
});