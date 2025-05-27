// scripts/zip-template.ts
// Usage: deno run --allow-read --allow-write scripts/zip-template.ts
// Zips all template directories into template zip files at the templates directory

import { join } from "jsr:@std/path@1.0.9";

// For backward compatibility
export async function zipTemplate() {
  await zipAllTemplates();
}

export async function zipAllTemplates() {
  try {
    for await (const entry of Deno.readDir(join(Deno.cwd(), "templates"))) {
      if (entry.isDirectory) {
        await zipSingleTemplate(entry.name);
      }
    }
  } catch (e) {
    console.error(`Error zipping templates: ${e.message}`);
    Deno.exit(1);
  }
}

export async function zipSingleTemplate(templateName: string) {
  const zipPath = join(Deno.cwd(), "templates", `${templateName}.zip`);
  
  // Remove old zip if exists
  try {
    await Deno.remove(zipPath);
  } catch (_e) {
    // Ignore if file does not exist
  }

  // Use system zip command to create the zip file
  const templateDir = join("templates", templateName);
  const p = new Deno.Command("zip", {
    args: ["-r", zipPath, "."],
    cwd: join(Deno.cwd(), templateDir),
  });
  const { code, stderr } = await p.output();
  if (code !== 0) {
    console.error(new TextDecoder().decode(stderr));
    Deno.exit(code);
  } else {
    console.log(`Created ${templateName}.zip`);
  }
}

if (import.meta.main) {
  await zipAllTemplates();
}
