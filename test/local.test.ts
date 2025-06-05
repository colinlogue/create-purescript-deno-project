// test/local.test.ts
// Tests the script execution locally by copying files to a temporary directory

import { createPurescriptDenoProject } from "../create-purescript-deno-project.ts";
import { cleanupDir, createTempDir, validateProjectStructure } from "./utils.ts";

// Utility function to test template creation
async function testTemplate(templateName: string): Promise<void> {
  let tempDir = "";

  try {
    // Create a temporary directory
    tempDir = await createTempDir(`local-${templateName}-`);

    // Execute the project creation function with template
    await createPurescriptDenoProject(tempDir, { template: templateName });

    // Validate that the project was created correctly
    await validateProjectStructure(tempDir, templateName);

  } finally {
    // Clean up the temporary directory regardless of test outcome
    if (tempDir) {
      await cleanupDir(tempDir);
    }
  }
}

// Utility function to test template creation with build option
async function testTemplateBuild(templateName: string): Promise<void> {
  let tempDir = "";

  try {
    // Create a temporary directory
    tempDir = await createTempDir(`local-${templateName}-build-`);

    // Execute the project creation function with template and build option
    await createPurescriptDenoProject(tempDir, { template: templateName, build: true });

    // Validate that the project was created correctly
    await validateProjectStructure(tempDir, templateName);

    // Run tests in the created project
    const cmd = new Deno.Command("npm", {
      args: ["run", "test"],
      cwd: tempDir,
    });

    const status = await cmd.spawn().status;

    if (!status.success) {
      throw new Error(`Test in ${templateName} failed`);
    }
  } finally {
    // Clean up the temporary directory regardless of test outcome
    if (tempDir) {
      await cleanupDir(tempDir);
    }
  }
}

// Test default template (server) creation
Deno.test("Local execution - creates server project in temporary directory", () =>
  testTemplate("server")
);

// Test default template (server) with build option
Deno.test("Local execution - creates and builds server project in temporary directory", () =>
  testTemplateBuild("server")
);

// Test CLI template creation
Deno.test("Local execution - creates CLI project in temporary directory", () =>
  testTemplate("cli")
);

// Test CLI template with build option
Deno.test("Local execution - creates and builds CLI project in temporary directory", () =>
  testTemplateBuild("cli")
);

// Test webapp template creation
Deno.test("Local execution - creates webapp project in temporary directory", () =>
  testTemplate("webapp")
);

// Test webapp template with build option
Deno.test("Local execution - creates and builds webapp project in temporary directory", () =>
  testTemplateBuild("webapp")
);