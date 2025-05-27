// scripts/publish.ts
// Usage: deno run --allow-run --allow-read --allow-write scripts/publish.ts [publish args]
// 1. Creates template.zip
// 2. Runs deno publish with any args
// 3. Deletes template.zip (always)

import { join } from "jsr:@std/path@1.0.9";
import { zipTemplate } from "./zip-template.ts";
import { cleanTemplateZip } from "./clean.ts";

const zipPath = join(Deno.cwd(), "template.zip");

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
    await zipTemplate();
    await runDenoPublish(args);
  } catch (e) {
    code = 1;
    console.error(e);
  } finally {
    await cleanTemplateZip();
    Deno.exit(code);
  }
}
