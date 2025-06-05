// test/utils.ts
// Common utility functions for tests

import * as path from "jsr:@std/path@1.0.9";

// Creates a temporary directory with a unique name
export async function createTempDir(prefix = "test-"): Promise<string> {
  const tempDir = path.join(Deno.cwd(), "tmp", `${prefix}${Date.now()}-${Math.random().toString(36).slice(2, 7)}`);
  await Deno.mkdir(tempDir, { recursive: true });
  return tempDir;
}

// Function to validate that the project structure was created correctly
export async function validateProjectStructure(targetDir: string, template: string = "server"): Promise<void> {
  // Find the manifest file for this template
  const templateManifestPath = path.join(Deno.cwd(), "templates", template, "template.manifest");

  let expectedFiles: string[];
  try {
    // Read the manifest file
    const manifestContent = await Deno.readTextFile(templateManifestPath);
    // Parse the list of files from the manifest
    expectedFiles = manifestContent
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);
  } catch (error) {
    if (error instanceof Deno.errors.NotFound) {
      throw new Error(`Template manifest file not found for template: ${template}`);
    }
    throw error;
  }

  // Validate that each file from the manifest exists in the target directory
  for (const file of expectedFiles) {
    const fullPath = path.join(targetDir, file);
    try {
      const stat = await Deno.stat(fullPath);
      // Allow both files and directories - some entries might be directories
      if (!(stat.isFile || stat.isDirectory)) {
        throw new Error(`Expected ${file} to be a file or directory`);
      }
    } catch (error) {
      if (error instanceof Deno.errors.NotFound) {
        throw new Error(`Expected file/directory ${file} was not found in the created project`);
      }
      throw error;
    }
  }
}

// Cleans up a directory regardless of test outcome
export async function cleanupDir(dirPath: string): Promise<void> {
  try {
    await Deno.remove(dirPath, { recursive: true });
  } catch (error) {
    // Ignore NotFound errors, log others
    if (!(error instanceof Deno.errors.NotFound)) {
      console.error(`Error cleaning up directory ${dirPath}:`, error);
    }
  }
}

// Terminate a process after a timeout if it hasn't completed
export function withTimeout<T>(
  promise: Promise<T>,
  timeoutMs: number,
  cleanup: () => Promise<void> | void
): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timeout = setTimeout(() => {
      cleanup();
      reject(new Error(`Operation timed out after ${timeoutMs}ms`));
    }, timeoutMs);

    promise
      .then((result) => {
        clearTimeout(timeout);
        resolve(result);
      })
      .catch((error) => {
        clearTimeout(timeout);
        reject(error);
      });
  });
}