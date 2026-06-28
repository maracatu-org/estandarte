import postcss from "postcss";
import tailwind from "@tailwindcss/postcss";
import { readFileSync, writeFileSync } from "node:fs";

// Compile a static stylesheet for the design-sync previews: Tailwind + the
// Estandarte token layer + the utility classes used by the components and the
// previews. `@source` paths are relative to the `from` file (src/theme).
const theme = readFileSync("src/theme/theme.css", "utf8");
const input =
  '@import "tailwindcss";\n' +
  theme +
  '\n@source "../../src/**/*.tsx";\n' +
  '@source "../../.design-sync/previews/**/*.tsx";\n';

const result = await postcss([tailwind()]).process(input, {
  from: "src/theme/_ds-compile.css",
  to: ".design-sync/assets/estandarte.css",
});
writeFileSync(".design-sync/assets/estandarte.css", result.css);
console.log("wrote", result.css.length, "bytes");
