# personal-site

A single-page personal homepage with two faces: a maximalist **1990s** skin
(marquee, starfield, sprites, hit counter, web ring, the works) and a clean
**modern** skin. Both render the exact same content and layout from one DOM
tree; a floating toggle flips between them and remembers your choice.

Built with Vite + React + TypeScript. No backend, no accounts, no navigation.

## How the two themes work

There is one component tree. The theme is a `data-theme` attribute on `<html>`
(`"90s"` or `"modern"`), and each theme is purely a CSS layer keyed off that
attribute:

- `src/styles/base.css` — structure and layout only (shared, so the two skins
  are guaranteed to match).
- `src/styles/retro.css` — the 1996 skin (`[data-theme="90s"]`).
- `src/styles/modern.css` — the clean skin (`[data-theme="modern"]`).

An inline script in `index.html` applies the saved theme before first paint to
avoid a flash. `src/theme/` holds the React context, hook, and provider that
keep state, `localStorage`, and the attribute in sync.

All content lives in one place: **`src/content.ts`**. Edit copy, jobs, schools,
skills, and links there.

## Develop

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build to dist/
npm run preview  # serve the production build locally
npm run lint
```

## Deploy (Vercel)

This is a stock Vite static build, so Vercel needs zero config: import the repo
and it auto-detects Vite (build `npm run build`, output `dist/`). Any static
host works the same way.

## Notes

- Decorations are CSS/SVG/emoji only. No external image hotlinks, so nothing
  rots and there are no third-party requests.
- All animations respect `prefers-reduced-motion`.
- A future AI "ask me about Rahul" chat widget is planned but not built; the
  component tree leaves a clean mount point and Vercel functions can back it.
