import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@client': path.resolve(__dirname, './src/client'),
      '@components': path.resolve(__dirname, './src/client/components'),
      '@assets': path.resolve(__dirname, './src/assets'),
    },
  },
  server: {
    port: 5173,
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: path.resolve(__dirname, './src/client/main.jsx'),
    },
  },
});
