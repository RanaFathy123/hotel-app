import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  build: {
    rollupOptions: {
      external: ['@stripe/stripe-js'], // Ensure this module is not treated as external
    },
  },
  resolve: {
    alias: {
      'prop-types': 'prop-types/index.js',
    },
  },
  optimizeDeps: {
    include: ['@stripe/stripe-js']
  }
});
