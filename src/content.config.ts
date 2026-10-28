import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      blurb: z.string(), // one line, used in lists
      intro: z.string(), // the line under the title on the project page
      year: z.number(),
      kind: z.string().optional(), // e.g. "Household", shown next to the year
      code: z.string().max(3).optional(), // short tab label, defaults to initials
      status: z.string(),
      stack: z.array(z.string()),
      repo: z.string().optional(),
      link: z.string().optional(),
      draft: z.boolean().default(false),
      images: z
        .array(z.object({ src: image(), alt: z.string(), caption: z.string().optional() }))
        .default([]),
    }),
});

export const collections = { projects };
