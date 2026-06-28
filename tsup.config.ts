import { defineConfig } from "tsup";
import { copyFileSync } from "node:fs";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  clean: true,
  sourcemap: true,
  treeshake: true,
  // Keep peers and heavy runtime deps external so consumers dedupe a single copy.
  external: ["react", "react-dom", "motion", "lucide-react", "recharts"],
  // The token stylesheet is shipped as-is (consumers @import it through Tailwind).
  onSuccess: async () => {
    copyFileSync("src/theme/theme.css", "dist/theme.css");
  },
});
