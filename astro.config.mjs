import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

// user site, served from the root, so no `base`
export default defineConfig({
  site: 'https://christopherjohnson1535.github.io',
  integrations: [react({ experimentalReactChildren: true })],
  vite: {
    // Ordinate's components import their own CSS, so Vite has to bundle them for server rendering
    // (resolve.noExternal reaches Astro's prerender environment too, not just ssr)
    resolve: { noExternal: ['@ordinate/components', '@ordinate/global-styles'] },
    ssr: { noExternal: ['@ordinate/components', '@ordinate/global-styles'] },
  },
});
