import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'

// https://astro.build/config
import netlify from '@astrojs/netlify/functions'

// https://astro.build/config
import react from '@astrojs/react'

// https://astro.build/config
export default defineConfig({
  site: 'https://hervy.netlify.com/',
  integrations: [
    mdx({ extendMarkdownConfig: false, smartypants: true, gfm: true }),
    sitemap(),
    react(),
  ],
  output: 'server',
  adapter: netlify(),
})
