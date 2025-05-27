// test/local.test.ts
// Tests the script execution locally by copying files to a temporary directory

import { createPurescriptDenoProject } from "../create-purescript-deno-project.ts";
import { cleanupDir, createTempDir, validateProjectStructure } from "./utils.ts";

Deno.test("Local execution - creates project in temporary directory", async () => {
  let tempDir = "";

  try {
    // Create a temporary directory
    tempDir = await createTempDir("local-");

    // Execute the project creation function
    await createPurescriptDenoProject(tempDir);

    // Validate that the project was created correctly
    await validateProjectStructure(tempDir);

  } finally {
    // Clean up the temporary directory regardless of test outcome
    if (tempDir) {
      await cleanupDir(tempDir);
    }
  }
});

// Test with build option
Deno.test( "Local execution - creates and builds project in temporary directory",
  async () => {
    let tempDir = "";

    try {
      // Create a temporary directory
      tempDir = await createTempDir("local-build-");

      // Execute the project creation function with build option
      await createPurescriptDenoProject(tempDir, { build: true });

      // Validate that the project was created correctly
      await validateProjectStructure(tempDir);

      // Additional validation that the build was run (output directory should exist)
      const outputDirPath = new URL(`file://${tempDir}/output`);
      try {
        const stat = await Deno.stat(outputDirPath);
        if (!stat.isDirectory) {
          throw new Error("Expected output directory to exist after build");
        }
      } catch (error) {
        if (error instanceof Deno.errors.NotFound) {
          throw new Error("Expected output directory to exist after build");
        }
        throw error;
      }

    } finally {
      // Clean up the temporary directory regardless of test outcome
      if (tempDir) {
        await cleanupDir(tempDir);
      }
    }
  },
);