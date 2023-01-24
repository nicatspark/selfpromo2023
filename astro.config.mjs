import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
import netlify from '@astrojs/netlify/functions';

// https://astro.build/config
import react from '@astrojs/react';

// https://astro.build/config

// https://astro.build/config
export default defineConfig({
  site: 'https://hervy.netlify.com/',
  integrations: [mdx(), sitemap(), react()],
  output: 'server',
  adapter: netlify()
});