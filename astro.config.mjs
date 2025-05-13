// astro.config.mjs
import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
  site: 'https://alexgod05.github.io',
  base: '/portfolio',
  trailingSlash: 'never',
  outDir: 'docs',
  vite: {
    build: {
      assetsDir: '_astro'
    }
  }
});
