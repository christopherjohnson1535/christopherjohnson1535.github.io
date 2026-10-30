---
title: upkeep
blurb: Home and car maintenance as a calendar you subscribe to. React, Hono, Cloudflare.
intro: The jobs that come around every few months, set up once and kept in your calendar.
year: 2026
kind: Household
code: UP
status: Live
stack: [React, TypeScript, Hono, Cloudflare D1]
repo: https://github.com/christopherjohnson1535/upkeep
link: https://upkeep.johnson-cmjohnson.workers.dev
images:
  - src: ../../assets/upkeep/phones.jpg
    alt: upkeep on a phone, showing the front page, a house's tasks with buttons to add it to Apple or Google Calendar, and the add task form with common car tasks to pick from
    caption: The front page, a house and its calendar buttons, and adding a task
  - src: ../../assets/upkeep/year.jpg
    alt: upkeep on a desktop, listing a house's tasks with a strip of twelve months beside each one marking the months it lands in
    caption: Each task shows which months of the next year it lands in
---

## What it does

Furnace filters, gutters, smoke detectors, oil changes. upkeep keeps them in your calendar instead of in another app you'd have to remember to open. Each house or car is a group, and each group is its own calendar. You add its tasks once, with how often they repeat and when the next one is due, then subscribe from Apple or Google Calendar. From then on the events repeat on their own, with a reminder a few days ahead, and they never mark you as busy.

When you move or change cars you copy the group, adjust the dates, and archive the old one, which empties its calendar. Common tasks are a tap away, so a new house takes a few minutes to set up.

## How it's built

A React and Tailwind front end with a small Hono API, all in one Cloudflare Worker with a D1 database. Each group's calendar is an iCalendar feed with repeat rules, so your calendar app does the scheduling. Anyone can sign up. Accounts are passkeys with a one-time recovery code, so there's no email or password to keep.

It runs on Cloudflare's free plan. There are per-account limits so one person can't use it up, and the data has three layers of backup: D1's own 7-day restore, a nightly copy kept for 30 days, and a download button on every account.

## Where it's at

1. **Done:** groups, repeating calendar feeds, copying and archiving, common tasks, and passkey accounts.
2. **Next:** using it through a year of real maintenance and seeing what's missing.
