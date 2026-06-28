# design-sync notes — Estandarte

Estandarte is a real library (named exports, built `dist/`), so this is the clean
`package` shape — no synth entry, no custom re-export file.

## How this sync is wired

- **Entry**: `cfg.entry = ./dist/index.js` (run `npm run build` first). Components are
  discovered from `dist/index.d.ts` (`Toast`, `ChartRenderer`). `ThemeProvider` is a
  PascalCase export too, so it's excluded from the component list via
  `componentSrcMap: {"ThemeProvider": null}` and used only as `cfg.provider`.
- **CSS**: `theme.css` is the Tailwind v4 `@theme` SOURCE, not compiled utilities.
  `.design-sync/compile-css.mjs` runs Tailwind over `@import "tailwindcss"` + theme.css
  while scanning `src/**` and the previews, emitting `.design-sync/assets/estandarte.css`
  (the `cssEntry`). **Run it before every build.** Output is gitignored; regenerate it.
  `tailwindcss` / `@tailwindcss/postcss` / `postcss` are devDependencies for this.
- **Provider**: `ThemeProvider` wraps every preview; it defaults to the dark theme.
- **MotionGlobalConfig via extraEntries**: `cfg.extraEntries: ["motion/react"]` merges
  motion onto `window.Estandarte`, so a preview can do
  `import { MotionGlobalConfig } from "motion/react"; MotionGlobalConfig.skipAnimations = true`
  and reach the SAME motion instance the bundled `Toast` uses. Without it, the static
  capture screenshots before Toast's `AnimatePresence` enter animation settles and the
  toast renders blank.

## Known render warns (triaged)

- `[GRID_OVERFLOW]` resolved via `cfg.overrides`: `ChartRenderer` → `cardMode: column`
  (wide), `Toast` → `cardMode: single` + `primaryStory: Success` (fixed/portal escapes
  the grid; the `ErrorVariant` story still exists, addressable via `?story=ErrorVariant`).

## Re-sync risks

- `.design-sync/assets/estandarte.css` is generated + gitignored — a re-sync MUST run
  `node .design-sync/compile-css.mjs` after `npm run build` and before `package-build.mjs`.
- As Estandarte grows (more primitives promoted out of the apps), new components appear
  automatically from `dist/index.d.ts` — no config change needed unless a new PascalCase
  export is a provider/non-component (exclude it like `ThemeProvider`).
- Toolchain assumed: Node 22, Tailwind 4.x, motion 12, React 19, tsup; playwright/chromium
  under `.ds-sync/node_modules` (chromium reused from the global ms-playwright cache).
