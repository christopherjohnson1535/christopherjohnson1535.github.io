# christopherjohnson1535.github.io

My personal site. https://christopherjohnson1535.github.io

Built with [Astro](https://astro.build) and [Ordinate](https://github.com/christopherjohnson1535/ordinate), pinned to revision 2026.1. Pushing to `main` deploys it to GitHub Pages.

```
npm install
npm run dev      # http://localhost:4321
npm run build    # what actually gets deployed, in dist/
```

Needs Node 22.

## Updating Ordinate

Ordinate isn't on npm, so its packages live in `vendor/` as tarballs. To move to a newer build:

```
# in the ordinate repo
npm run build && npm run build -w global-styles
(cd lib/components && npm pack --pack-destination ../../../christopherjohnson1535.github.io/vendor)
(cd global-styles && npm pack --pack-destination ../../christopherjohnson1535.github.io/vendor)

# back here
npm install ./vendor/ordinate-components-*.tgz ./vendor/ordinate-global-styles-*.tgz
```

The revision is set in `src/lib/site.ts`. Changing it is what changes the look; updating the packages alone doesn't.

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
link: https://example.com # optional, the live site; adds an "Open" button
code: RB                # optional label on the home page drawing, defaults to initials
draft: false            # true = only visible in npm run dev
images:
  - src: ../../assets/recipe-box/day.jpg
    alt: What the screenshot shows
    caption: Optional caption
---

## What it does

The write-up is set as rows: each `##` heading sits in the left third with its text to the right, under one rule.
```

Every project is plotted as a point on the home page drawing (up to six), and each point links to it. Projects with at least one image appear under "Selected work", shown with their first image.

Everything sits on one 12-column grid inside the same 1200px frame as the header and footer (`.grid`/`.cols` in `src/styles/site.css`), so screenshots on a page all get the same width.
