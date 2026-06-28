// JS mirrors of the design tokens, for places that need the raw values
// (e.g. Recharts, which takes colors as props, not classes).

/** Brand chart palette, in order. Matches `--color-chart-*` in theme.css. */
export const chartPalette = [
  "#10b981",
  "#3b82f6",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#ec4899",
] as const;

/** Brand accent (emerald-500) and the avatar gradient stops. */
export const accent = {
  base: "#10b981",
  from: "#34d399",
  to: "#22d3ee",
} as const;
