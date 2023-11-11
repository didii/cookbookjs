import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import pluginChecker from 'vite-plugin-checker';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [tsconfigPaths({ loose: true }), react(), pluginChecker({typescript: true})],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        secure: false,
      },
    },
  },
});
