import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';

export default defineConfig({
  server: { open: true },
  plugins: [solid()],
});
