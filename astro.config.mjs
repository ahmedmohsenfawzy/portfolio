import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://portfolio-ahmed-el-tlawy.vercel.app/',
  integrations: [
    sitemap()
  ],
  compressHTML: true,
});
