import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: 'public',
  publicDir: false, // Assets are already in public/assets, no need to copy
  server: {
    port: 3000,
  },
  resolve: {
  },
  build: {
    outDir: '../dist', // Change back to dist to avoid root conflict, user can set Vercel to build/dist
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'public/index.html'),
        about: resolve(__dirname, 'public/about.html'),
        energy: resolve(__dirname, 'public/energy.html'),
        agriculture: resolve(__dirname, 'public/agriculture.html'),
        education: resolve(__dirname, 'public/education.html'),
        'real-estate': resolve(__dirname, 'public/real-estate.html'),
        technology: resolve(__dirname, 'public/technology.html'),
      }
    }
  },
});
