# christopherjohnson1535.github.io

My personal site. https://christopherjohnson1535.github.io

Built with [Astro](https://astro.build). Pushing to `main` deploys it to GitHub Pages.

```
npm install
npm run dev      # http://localhost:4321
npm run build    # what actually gets deployed, in dist/
```

Needs Node 22.

## Adding a project

Add a Markdown file to `src/content/projects/`. The file name becomes the URL, so `recipe-box.md` is `/projects/recipe-box/`. Screenshots go in `src/assets/<project>/`.

```md
---
title: Recipe Box
blurb: One line for the project list.
intro: The line under the title on the project page.
year: 2026
kind: Household         # optional, shown next to the year
status: In progress     # "In progress" gets the dot and the "now building" label
stack: [Rust, Next.js, Postgres]
repo: https://github.com/christopherjohnson1535/recipe-box
code: RB                # optional tab label on the home page, defaults to initials
draft: false            # true = only visible in npm run dev
images:
  - src: ../../assets/recipe-box/day.jpg
    alt: What the screenshot shows
    caption: Optional caption
---

## What it does

Each `##` heading becomes a numbered row on the project page.
```

Projects with at least one image show up in the "Selected work" panel on the home page.
