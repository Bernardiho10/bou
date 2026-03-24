import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: 'public',
  publicDir: false, // Assets are handled manually via xcopy in package.json
  server: {
    port: 3000,
  },
  build: {
    outDir: '../dist',
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
        contact: resolve(__dirname, 'public/contact.html'),
        boucloud: resolve(__dirname, 'public/boucloud.html'),
        boss: resolve(__dirname, 'public/boss.html'),
        xtate: resolve(__dirname, 'public/xtate.html'),
        'hotel-management': resolve(__dirname, 'public/hotel-management.html'),
        'magic-ui': resolve(__dirname, 'public/magic-ui.html'),
        emergency: resolve(__dirname, 'public/emergency.html'),
        edtech: resolve(__dirname, 'public/edtech.html'),
        agritech: resolve(__dirname, 'public/agritech.html'),
        tracking: resolve(__dirname, 'public/tracking.html'),
      }
    }
  },
});
