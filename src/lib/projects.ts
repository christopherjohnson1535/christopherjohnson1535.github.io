import { getCollection, type CollectionEntry } from 'astro:content';

export type Project = CollectionEntry<'projects'>;

// drafts show up in `npm run dev` but not in the built site
export async function getProjects() {
  const all = await getCollection('projects', ({ data }) => import.meta.env.DEV || !data.draft);
  return all.sort((a, b) => b.data.year - a.data.year || a.data.title.localeCompare(b.data.title));
}

export function tabCode(p: Project) {
  if (p.data.code) return p.data.code;
  return p.data.title
    .split(/\s+/)
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

export function metaLine(p: Project) {
  return [p.data.year, p.data.kind, ...p.data.stack.slice(0, 2)].filter(Boolean).join(' / ');
}
