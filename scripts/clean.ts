// scripts/clean.ts
// Usage: deno run --allow-write --allow-read scripts/clean.ts
// Removes template zip files from the templates directory

import { join } from "jsr:@std/path@1.0.9";

// For backward compatibility
export async function cleanTemplateZip() {
  await cleanAllTemplateZips();
}

export async function cleanAllTemplateZips() {
  try {
    for await (const entry of Deno.readDir(join(Deno.cwd(), "templates"))) {
      if (!entry.isDirectory && entry.name.endsWith(".zip")) {
        const zipPath = join(Deno.cwd(), "templates", entry.name);
        await Deno.remove(zipPath);
        console.log(`Removed ${entry.name}`);
      }
    }
  } catch (e) {
    if (e instanceof Deno.errors.NotFound) {
      console.log("Templates directory does not exist");
    } else {
      throw e;
    }
  }
}

if (import.meta.main) {
  await cleanAllTemplateZips();
}
