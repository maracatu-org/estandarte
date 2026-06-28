# Estandarte — conventions for building with this design system

Estandarte is the shared **Maracatu** design system (the brand's visual identity).
It ships design tokens, the theme, and agnostic React primitives. User-facing copy
is **pt-BR**; identifiers are en-US.

## Setup

Import the tokens once in the app's global stylesheet, after Tailwind, then wrap the
app in `ThemeProvider`:

```css
@import "tailwindcss";
@import "@maracatu/estandarte/theme.css";
```

```tsx
import { ThemeProvider, Toast, ChartRenderer } from "@maracatu/estandarte";

<ThemeProvider>
  <div className="min-h-screen bg-canvas text-primary">…</div>
</ThemeProvider>
```

`ThemeProvider` defaults to the **dark** theme and toggles a `dark` class on `<html>`,
which flips the tokens. `ChartRenderer` reads the theme from context and **throws
outside `ThemeProvider`**. Build screens on a dark surface by default.

## Styling idiom: Tailwind v4 + Estandarte tokens

Style with Tailwind utilities, preferring the semantic, theme-aware tokens over raw
colors so light/dark just work:

| Group | Utilities |
|---|---|
| Surfaces (flip with theme) | `bg-canvas`, `bg-elevated`, `bg-sidebar`, `bg-subtle` |
| Text (flip with theme) | `text-primary`, `text-secondary`, `text-muted` |
| Border (flips) | `border-default` |
| Accent | `text-accent`, gradient `from-accent-from` `to-accent-to` |
| Chart palette | `bg-chart-1` … `bg-chart-6` (or `chartPalette` in JS) |
| Radius | `rounded-control` (inputs/menu items), `rounded-card` (panels), `rounded-bubble` (chat bubbles) |

Prefer `bg-canvas` / `text-primary` to hardcoded zinc/hex; that is what keeps every
Maracatu frontend consistent. Format money as BRL (`R$ 184.230,00`).

## Components

- **`Toast`** — top-pinned notification (`position: fixed`); props `message` and
  `kind` (`"success"` | `"error"`). The caller owns the dismiss timer.
- **`ChartRenderer`** — BRL-formatted bar / pie / line chart (Recharts), via a single
  `config` prop (`type`, `data`, `xKey`, `yKey`, `title`, `colors`). Needs a sized
  parent and `ThemeProvider`.

This is the foundation layer; more primitives are promoted out of the apps over time.

## Where the truth lives

Read the bound stylesheet (`_ds/<folder>/styles.css` → `_ds_bundle.css`) for the exact
token values, and each component's `<Name>.prompt.md` + `<Name>.d.ts` for its API.
