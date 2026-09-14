import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://portfolio-flax-ten-53.vercel.app',
  integrations: [
    sitemap()
  ],
  compressHTML: true,
});
