// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: '/index.html',
        game: '/pages/game.html',
        campaign: '/pages/campaign.html'

      }
    }
  }
});
