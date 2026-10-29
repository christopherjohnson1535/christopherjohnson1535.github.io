---
title: Card Night
blurb: Keeps score for 500 and Dutch Blitz. React, TypeScript, Tailwind.
intro: A scorekeeper for family card games, so the table can just play.
year: 2026
kind: Family
status: Live
stack: [React, TypeScript, Tailwind]
repo: https://github.com/christopherjohnson1535/cardnight
link: https://cardnight.johnson-cmjohnson.workers.dev
images:
  - src: ../../assets/card-night/dark.jpg
    alt: Card Night in dark mode, showing the home screen, a 500 scoreboard and a Dutch Blitz scoreboard
    caption: Home, a game of 500 and a game of Dutch Blitz
  - src: ../../assets/card-night/light.jpg
    alt: Card Night in light mode, showing a 500 hand being entered, a Dutch Blitz round being counted and the winner screen
    caption: Light mode, entering a hand, counting a round and the winner screen
---

## What it does

It keeps score for 500 and Dutch Blitz, the two games we play when the family's together at Christmas. Pick a game, type in the teams or players, and enter each hand or round as it finishes. Card Night adds it all up and keeps the history, and tapping any round shows how it was scored.

For 500 you tap who won the bid, pick the bid from a chart that shows what each one is worth, and say how many tricks they took. For Dutch Blitz you count each player's cards in the middle and what's left in their Blitz pile. Whoever reaches 500, or 75 in Blitz, gets a winner screen and a rematch button.

## How it's built

React and TypeScript, styled with Tailwind and built with Vite. Games are saved in the browser, so there's no account and no server. It's a static site on Cloudflare. It installs to a phone's home screen and works offline, and on an iPad turned sideways the scoreboard and round entry sit side by side. The scoring rules live apart from the screens and have their own tests.

## Where it's at

1. **Done:** 500, Dutch Blitz, light and dark mode, and the iPad layout.
2. **Next:** more games after Christmas.
