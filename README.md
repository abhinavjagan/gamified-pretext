# Type drift

Mini-game: **Bodoni** body reflows around the **halo** and up to **three right-click pins** (multi-obstacle `layoutNextLine`). **Cyan orbs** use glyphs from the paragraph—spell **TYPE → DRIFT → TEXT → BODONI → PIN** for bonuses. A **gold line** doubles orb score on that row. **Jersey 10** HUD; combo **6+** = italic Bodoni. **Space** / **Esc** pause spawns / clear spell buffer.

Fonts live in `pages/fonts/` (Jersey 10 + Bodoni Moda variable TTFs, OFL). Source copies also live beside the `pretext/` folder under `Jersey_10` / `Bodoni_Moda`.

## Run

```sh
npm install
bun start
```

or `bash scripts/start.sh`. Open [http://127.0.0.1:3000](http://127.0.0.1:3000).

Dev uses **`bun build`** into `pages/build/` (fonts + `app.js`) and a tiny static server—not `bun pages/index.html`, which can hit a Bun HMR error on `./app.ts`. After editing `app.ts`, restart the server or run `npm run watch:client` in another terminal.

- `pages/index.html` + `pages/app.ts` → `pages/build/app.js` — game + layout  
- `src/*.ts` — Pretext engine  

MIT — see `LICENSE`. Font files under their own OFL licenses.
