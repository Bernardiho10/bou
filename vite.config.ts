import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: 'public',
  publicDir: 'assets', // Serve static assets from public/assets
  server: {
    port: 3000,
    open: true,
  },
  resolve: {
    alias: {
      '/assets': resolve(__dirname, 'public/assets'),
    },
  },
  build: {
    outDir: '../dist',
    emptyOutDir: true,
  },
});
