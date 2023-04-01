import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [tsconfigPaths({ loose: true }), vue(), vueJsx()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        secure: false,
      }
    }
  }
});
