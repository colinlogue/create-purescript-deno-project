// scripts/clean.ts
// Usage: deno run --allow-write scripts/clean.ts
// Removes template.zip from the project root

import { join } from "jsr:@std/path@1.0.9";

const zipPath = join(Deno.cwd(), "template.zip");

export async function cleanTemplateZip() {
  try {
    await Deno.remove(zipPath);
    console.log("Removed template.zip");
  } catch (e) {
    if (e instanceof Deno.errors.NotFound) {
      console.log("template.zip does not exist");
    } else {
      throw e;
    }
  }
}

if (import.meta.main) {
  await cleanTemplateZip();
}
