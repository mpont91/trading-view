import { defineConfig } from 'astro/config'

import tailwind from '@astrojs/tailwind'
import vercel from '@astrojs/vercel'
import vue from '@astrojs/vue'

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), vue()],
  output: 'server',
  adapter: vercel(),
})
