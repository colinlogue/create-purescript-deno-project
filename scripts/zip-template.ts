// scripts/publish.ts
// Usage: deno run --allow-read --allow-write scripts/publish.ts
// Zips the template directory into template.zip at the project root

import { join } from "jsr:@std/path@1.0.9";

const zipPath = join(Deno.cwd(), "template.zip");

async function zipTemplate() {
  // Remove old zip if exists
  try {
    await Deno.remove(zipPath);
  } catch (_e) {
    // Ignore if file does not exist
  }

  // Use system zip command to create the zip file
  const p = new Deno.Command("zip", {
    args: ["-r", zipPath, "template"],
    cwd: Deno.cwd(),
  });
  const { code, stderr } = await p.output();
  if (code !== 0) {
    console.error(new TextDecoder().decode(stderr));
    Deno.exit(code);
  } else {
    console.log("Created template.zip");
  }
}

if (import.meta.main) {
  await zipTemplate();
}
