// scripts/publish.ts
// Usage: deno run --allow-run --allow-read --allow-write scripts/publish.ts [publish args]
// 1. Creates template zip files for all templates
// 2. Runs deno publish with any args
// 3. Deletes all template zip files (always)

import { zipAllTemplates } from "./zip-template.ts";
import { cleanAllTemplateZips } from "./clean.ts";

async function runDenoPublish(args: string[]) {
  const p = new Deno.Command("deno", {
    args: ["publish", ...args],
    stdin: "inherit",
    stdout: "inherit",
    stderr: "inherit",
  });
  const { code } = await p.output();
  if (code !== 0) {
    Deno.exit(code);
  }
}


if (import.meta.main) {
  const args = Deno.args;
  let code = 0;
  try {
    await zipAllTemplates();
    await runDenoPublish(args);
  } catch (e) {
    code = 1;
    console.error(e);
  } finally {
    await cleanAllTemplateZips();
    Deno.exit(code);
  }
}
