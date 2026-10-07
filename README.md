# Merge Market — PWA

An installable, offline-capable merge game. Pure static files — no build step, no dependencies.

## Files
| File | What it is |
|---|---|
| `index.html` | The whole game (HTML + CSS + JS + embedded art) |
| `manifest.webmanifest` | PWA manifest (name, icons, colors, standalone display) |
| `sw.js` | Service worker — caches the app so it works offline |
| `icon-192.png`, `icon-512.png` | App icons (home-screen / install) |

All paths are **relative**, so it works whether it's served from a domain root or a project subfolder.

## Deploy to GitHub Pages
1. Create a repo and put these files in the **root** of the default branch (or in a `/docs` folder).
2. Commit and push.
3. Repo → **Settings → Pages** → *Build and deployment* → Source: **Deploy from a branch**, Branch: `main`, Folder: `/ (root)` (or `/docs` if you used that).
4. Give it a minute. Your game is live at `https://<your-user>.github.io/<your-repo>/`

GitHub Pages serves over **HTTPS**, which is required for the service worker / PWA — so installation and offline both work automatically.

## Install on a phone
- **Android (Chrome):** open the URL → menu (⋮) → **Add to Home screen / Install app**.
- **iOS (Safari):** open the URL → Share → **Add to Home Screen**.

It launches full-screen (no browser chrome), keeps your progress (saved in the browser), and runs offline after the first load.

## Updating after you change the game
Browsers cache the old version via the service worker. When you edit `index.html`, bump the cache name in `sw.js`:

```js
const CACHE = 'merge-market-v9';   // was v8
```

Commit & push — devices will fetch the new version on next launch.

## Notes
- Progress is stored in `localStorage` (per device/browser). "Reset progress" is in the Upgrades panel.
- The only external request is the Google Fonts stylesheet; if it's unavailable the game falls back to a system font, so offline play is unaffected.
