import { defineConfig } from "tsup";
import { copyFileSync, readFileSync, writeFileSync } from "node:fs";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  clean: true,
  sourcemap: true,
  treeshake: true,
  // Keep peers and heavy runtime deps external so consumers dedupe a single copy.
  external: ["react", "react-dom", "motion", "lucide-react", "recharts"],
  onSuccess: async () => {
    // The token stylesheet ships as-is (consumers @import it through Tailwind).
    copyFileSync("src/theme/theme.css", "dist/theme.css");
    // Every component here is a client component (hooks, motion, recharts), but
    // esbuild strips the per-file "use client" directives when bundling (and a
    // banner directive is ignored too). Prepend it to the bundled output so
    // Next.js App Router treats the package as client — otherwise a server
    // component importing ThemeProvider/Toast/ChartRenderer throws.
    for (const f of ["dist/index.js", "dist/index.cjs"]) {
      const src = readFileSync(f, "utf8");
      if (!src.startsWith('"use client"')) writeFileSync(f, `"use client";\n${src}`);
    }
  },
});
