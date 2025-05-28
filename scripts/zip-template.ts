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
    if (e instanceof Error) {
      console.error(`Error zipping templates: ${e.message}`);
    }
    Deno.exit(1);
  }
}

export async function zipSingleTemplate(templateName: string) {
  const zipPath = join(Deno.cwd(), "templates", `${templateName}.zip`);
  const templateDir = join(Deno.cwd(), "templates", templateName);
  const manifestPath = join(templateDir, "template.manifest");

  // Remove old zip if exists
  try {
    await Deno.remove(zipPath);
  } catch (_e) {
    // Ignore if file does not exist
  }

  // Read manifest file to determine which files to include
  let filesToInclude: string[];
  try {
    const manifestContent = await Deno.readTextFile(manifestPath);
    filesToInclude = manifestContent
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);
  } catch (_e) {
    // Fall back to including all files if manifest doesn't exist
    console.error(`template.manifest not found for ${templateName}`);
    Deno.exit(1);
  }

  // Use system zip command to create the zip file with specific files
  const p = new Deno.Command("zip", {
    args: [zipPath, ...filesToInclude],
    cwd: templateDir,
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
