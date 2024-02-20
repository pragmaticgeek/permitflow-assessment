import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { fileURLToPath } from 'url';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    
    test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["src/setupTest.ts"],
    alias: {
        '~/': fileURLToPath(new URL('./src/', import.meta.url)),
        '@/': fileURLToPath(new URL('./src/', import.meta.url)),
        '@uikit/': fileURLToPath(new URL('./src/components/ui/', import.meta.url)),
        "@components/": fileURLToPath(new URL('./src/components/', import.meta.url)),
        "@types/" :fileURLToPath(new URL('./src/types/', import.meta.url)),
        '@store/': fileURLToPath(new URL('./src/store/', import.meta.url)),
        "@utils/": fileURLToPath(new URL('./src/utils/', import.meta.url)),
      },
    },
});
