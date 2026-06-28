# Estandarte

Estandarte is the **Maracatu** design system: the shared visual language and the
React primitives every Maracatu frontend builds on. The estandarte is the banner a
maracatu nation carries, its visual identity, which is exactly what this package is.

It is intentionally small. It holds what is genuinely shared across apps:

- **Design tokens** (`@maracatu/estandarte/theme.css`): theme-aware surface, text,
  and border tokens that flip with a `.dark` class, plus the brand accent, the chart
  palette, and the radius scale.
- **Theme**: `ThemeProvider` / `useTheme`, which toggle the `.dark` class and persist
  the choice.
- **Agnostic primitives**: `Toast` and `ChartRenderer` (BRL-formatted), components
  that carry no app or domain coupling.

App- and domain-specific components (chat messages, agent activity, conversation
menus) stay in the apps that own them. They are not design-system primitives.

## Install

```sh
npm install @maracatu/estandarte
```

Peer dependencies: `react` and `react-dom` (18 or 19).

## Use

Import the tokens once, in your app's global stylesheet, after Tailwind:

```css
@import "tailwindcss";
@import "@maracatu/estandarte/theme.css";
```

Wrap the app in `ThemeProvider` and build with the components and the token
utilities:

```tsx
import { ThemeProvider, Toast, ChartRenderer } from "@maracatu/estandarte";

export function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-canvas text-primary">
        <Toast message="Salvo com sucesso" kind="success" />
        <ChartRenderer config={{ type: "bar", title: "Gastos por mês", data: [/* … */] }} />
      </div>
    </ThemeProvider>
  );
}
```

## Token utilities

| Group | Utilities |
|---|---|
| Surfaces (theme-aware) | `bg-canvas`, `bg-elevated`, `bg-sidebar`, `bg-subtle` |
| Text (theme-aware) | `text-primary`, `text-secondary`, `text-muted` |
| Border (theme-aware) | `border-default` |
| Accent | `text-accent`, `from-accent-from`, `to-accent-to` |
| Chart palette | `bg-chart-1` … `bg-chart-6` (and `chartPalette` in JS) |
| Radius | `rounded-control`, `rounded-card`, `rounded-bubble` |

The raw, theme-aware values live in `:root` / `.dark` as `--es-*` custom properties;
the `@theme` block re-exports them as the utilities above.

## Develop

```sh
npm install
npm run build       # tsup -> dist (ESM + CJS + .d.ts + theme.css)
npm run typecheck
```

## Scope

This is the foundation layer. It is meant to grow by promoting genuinely shared
pieces out of the apps, never by absorbing app-specific UI. The bar for adding a
component: it has no app, route, domain, or data coupling, and at least two
frontends would use it.
