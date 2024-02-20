import react from "@vitejs/plugin-react";

import { fileURLToPath } from 'url';
import { configDefaults, defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    exclude: [...configDefaults.exclude, '**/playwright/**'],
    alias: {
      '~/': fileURLToPath(new URL('./src/', import.meta.url)),
      '@/': fileURLToPath(new URL('./src/', import.meta.url)),
      '@uikit/': fileURLToPath(new URL('./src/components/ui/', import.meta.url)),
      "@components/": fileURLToPath(new URL('./src/components/', import.meta.url)),
      "@types/" :fileURLToPath(new URL('./src/types/', import.meta.url)),
      '@store/': fileURLToPath(new URL('./src/store/', import.meta.url)),
      "@utils/": fileURLToPath(new URL('./src/utils/', import.meta.url)),
    },
    setupFiles: ['dotenv/config', './src/setupTests.ts'],
  },
});
