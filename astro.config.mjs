// astro.config.mjs
import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
  site: 'https://alexgod05.github.io',
  base: '/portafolio-v2',
  trailingSlash: 'never',
  build: {
    format: 'directory'
  }
});
