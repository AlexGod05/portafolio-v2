// astro.config.mjs
import { defineConfig } from 'astro/config';
import staticAdapter from '@astrojs/static';

export default defineConfig({
  output: 'static',
  adapter: staticAdapter(),
  site: 'https://alexgod05.github.io',
  base: '/portafolio-v2',
});
