# PWA Template (docs/)

This directory contains a minimal, installable PWA template for GitHub Pages.

What’s included
- index.html / about.html: sample pages with navigation.
- manifest.webmanifest: install metadata (name, colors, icons).
- sw.js: service worker for offline caching and runtime cache.
- offline.html: offline fallback page.
- styles.css / app.js: UI styles and install banner logic.
- icons/: place real PNG icons (192, 512, 180).
- .nojekyll: disables Jekyll processing.

Local preview
- Any static server works. Example: `cd docs && python -m http.server 8080`
- In Chrome DevTools, toggle “Offline” and verify the top page still loads.

Customize
- Update names/colors in `manifest.webmanifest`.
- Replace icons in `docs/icons/` and keep links in HTML.
- Edit content in `.html` files; banners are managed by `app.js`.

Notes
- Everything under `docs/` is publicly served as static files; never commit secrets.
- After significant changes, bump `CACHE_NAME` in `sw.js` to invalidate old caches.

