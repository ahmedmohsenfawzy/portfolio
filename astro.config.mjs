import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://portfolio-ahmed-el-tlawy.vercel.app',
  output: 'static',
  integrations: [sitemap()],
  compressHTML: true,
});
