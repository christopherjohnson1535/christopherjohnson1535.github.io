---
title: Recipe Box
blurb: Household recipes, imported from links and photos. Rust, Next.js, Postgres.
intro: A shared recipe box for our household, built to be cooked from on an iPad.
year: 2026
kind: Household
status: In progress
stack: [Rust, Next.js, Postgres]
repo: https://github.com/christopherjohnson1535/recipe-box
images:
  - src: ../../assets/recipe-box/day.jpg
    alt: A recipe page in the day theme
    caption: Day theme
  - src: ../../assets/recipe-box/evening.jpg
    alt: The same recipe page in the evening theme
    caption: Evening theme, which switches on by time of day
---

## What it does

Everyone in the house shares one box. A recipe can come in from a link, or from a photo of a cookbook page, a handwritten card or a screenshot. Search and tags bring it back later.

The iPad is where most of the cooking happens, so there's a cooking mode that keeps the screen awake, and the app installs to the Home Screen and works offline.

## How it's built

A Rust API (axum and sqlx) over Postgres, with a Next.js front end. The whole thing runs in Docker Compose, with Caddy in front for HTTPS so the iPad features work on the home network.

## Where it's at

1. **Done:** accounts, the recipe editor, search, link import and household members.
2. **Now:** importing from photos, and a redesign.
3. **Next:** cooking mode and offline support.
