// astro.config.mjs
import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
  site: 'https://alexgod05.github.io',
  base: '/portfolio',
  trailingSlash: 'never',
  build: {
    format: 'directory'
  },
  outDir: 'docs'
});
