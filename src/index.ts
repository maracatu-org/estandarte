// @maracatu/estandarte — public API.
//
// The token stylesheet ships separately at "@maracatu/estandarte/theme.css";
// import it once in the app's global CSS after Tailwind.

export { ThemeProvider, useTheme } from "./theme/theme-context";
export type { Theme, ThemeProviderProps } from "./theme/theme-context";
export { chartPalette, accent } from "./theme/tokens";

export { Toast } from "./components/toast";
export type { ToastProps } from "./components/toast";
export { ChartRenderer } from "./components/chart-renderer";
export type { ChartConfig, ChartRendererProps } from "./components/chart-renderer";
