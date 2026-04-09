import { defineConfig } from 'astro/config';
import partytown from '@astrojs/partytown';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://labstudiomedia.com',
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/links'),
    }),
    partytown({
      config: {
        forward: ["dataLayer.push"]
      }
    })
  ]
});
