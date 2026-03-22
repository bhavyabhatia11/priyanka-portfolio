# Portfolio Content Guide

This is Priyanka Datwani's portfolio, built with Next.js + Tailwind CSS + Framer Motion.

## How to update content (no code knowledge needed)

All content lives in the `content/` folder. Everything is plain JSON or Markdown.

---

## Site-wide settings → `content/site.json`

Change name, tagline, email, social links, resume link, availability status.

```json
{
  "name": "Priyanka Datwani",
  "email": "priyankadatwani99@gmail.com",
  "social": {
    "linkedin": "https://...",
    "instagram": "https://..."
  },
  "resume": "https://drive.google.com/...",
  "availableForWork": true
}
```

---

## Adding or editing work / projects → `content/projects/`

All work and projects live in `content/projects/`. Each piece is a folder with a `brief.md` file inside.

### Folder naming convention

```
{priority}-{Name}-{Category}/
  brief.md
```

- `priority` = a number that controls display order (0 = first)
- `Name` = the brand/client name
- `Category` = short descriptor (used as fallback category label)

Example: `0-Airtribe-Product-Marketing/brief.md`

---

### The `type` field — work vs. project

Every `brief.md` must have a `type` field in its frontmatter:

| Type | What it is | Where it appears |
|------|-----------|-----------------|
| `work` | Professional role / freelance engagement | **Work** page + homepage grid |
| `project` | Independent / community / passion project | **Projects** page + homepage grid |
| `presentation` | A Canva deck or slide presentation | **Projects** page + homepage grid (opens as a deck viewer) |

**Work examples:** Airtribe, Milaap, Creative House, Parina, Eakia
**Project examples:** Ayat
**Presentation examples:** anything with a `presentationUrl` link

---

### Frontmatter fields for brief.md

```yaml
---
title: "Brand Name"
slug: "brand-name"             # URL: /projects/brand-name
type: "work"                   # work | project | presentation
client: "Client Name"
role: "Your Role"
year: "2024–2025"
industry: "Edtech"             # shown as the industry pill
impact: "₹50L+ Monthly Revenue"  # headline metric shown on card
summary: "One line description for the card"
tags: ["GTM Strategy", "Product Marketing"]
coverImage: "https://images.unsplash.com/..."
cardHeight: "tall"             # tall | standard | short
cardWidth: "wide"              # wide | narrow | full
published: true
images: []                     # additional image URLs for the detail page
videoLinks: []                 # embed URLs (YouTube, Vimeo)
presentationUrl: ""            # Canva / slide deck URL (for type: presentation only)
---

## Body

Write the full case study here in Markdown.
```

### Card size guide

`cardHeight` controls the shape of the card in the homepage grid:
- `tall` — portrait card, best for headshots or brand imagery
- `standard` — balanced 4:3 ratio
- `short` — landscape/panoramic, best for wide imagery

`cardWidth` controls how wide the card spans in multi-column grids:
- `wide` — spans 2 columns (default)
- `narrow` — single column
- `full` — spans all 3 columns (hero placement)

---

### To add a new piece of work

1. Create a new folder: `content/projects/{N}-{Name}-{Category}/`
2. Create `brief.md` inside it with the frontmatter above
3. Set `type` to `"work"` or `"project"` as appropriate
4. Set `published: true`
5. Claude will pick it up automatically — no code changes needed

### To hide something temporarily

Set `published: false` in the frontmatter.

### To reorder

Change the priority number in the folder name (e.g., rename `3-Eakia-Art-Direction` to `2-Eakia-Art-Direction`).

### To add a Canva / presentation deck

1. Set `type: "presentation"`
2. Add `presentationUrl: "https://www.canva.com/..."` to the frontmatter
3. Clicking the card will open the deck in a viewer

---

## Running the site locally

```bash
node node_modules/next/dist/bin/next dev
```
Then open http://localhost:3000

## Building for production

```bash
node node_modules/next/dist/bin/next build
```

## Deploying

The easiest deployment is Vercel (free):
1. Push this folder to a GitHub repo
2. Connect to Vercel at vercel.com
3. It will auto-deploy on every push

---

## Asking Claude to update

Just describe what you want. Examples:
- "Add a new project called Nike — it was freelance work, GTM strategy, impact was 20% revenue growth"
- "Change Milaap's impact to 8 Crore"
- "Add these 3 image links to the Eakia project"
- "Update my LinkedIn URL"
- "Make me available for work"
- "Add a Canva deck for Ayat: https://canva.com/..."
