// test/remote.test.ts
// Tests the script execution via HTTP by serving files and running remotely

import * as path from "jsr:@std/path@1.0.9";
import { cleanupDir, createTempDir, validateProjectStructure, withTimeout } from "./utils.ts";
import { zipTemplate } from "../scripts/zip-template.ts";

// Time limit for test execution
const TEST_TIMEOUT_MS = 60000; // 60 seconds
// Time limit for HTTP server to be available
const SERVER_TIMEOUT_MS = 10000; // 10 seconds

Deno.test({
  name: "Remote execution - serves files and creates project in temporary directory",
  fn: async () => {
    let tempDir = "";
    let serverController: AbortController | null = null;
    let serverProcess: Deno.ChildProcess | null = null;
    
    try {
      // Create a temporary directory for the project
      tempDir = await createTempDir("remote-");
      
      // Create template.zip file
      await zipTemplate();
      
      // Start HTTP server to serve the files
      const port = 8765;
      serverController = new AbortController();
      const serverUrl = `http://localhost:${port}`;
      
      // Use Deno.Command to start a separate Deno process that serves the files
      serverProcess = new Deno.Command("deno", {
        args: ["run", "--allow-net", "--allow-read", "-"],
        stdin: "piped",
        stdout: "piped",
        stderr: "piped",
        signal: serverController.signal,
      }).spawn();
      
      // Write the server code to stdin
      const serverCode = `
        import { serve } from "jsr:@std/http@1.0.0";
        
        const handler = async (req) => {
          const url = new URL(req.url);
          let filePath;
          
          if (url.pathname === "/create-purescript-deno-project.ts") {
            filePath = "./create-purescript-deno-project.ts";
          } else if (url.pathname === "/template.zip") {
            filePath = "./template.zip";
          } else {
            return new Response("Not found", { status: 404 });
          }
          
          try {
            const content = await Deno.readFile(filePath);
            return new Response(content, {
              headers: {
                "Content-Type": url.pathname.endsWith(".ts") ? "text/typescript" : "application/zip",
              },
            });
          } catch (error) {
            console.error(\`Error serving \${filePath}:\`, error);
            return new Response("Internal server error", { status: 500 });
          }
        };
        
        console.log("Server starting on http://localhost:${port}");
        await serve(handler, { port: ${port} });
      `;
      
      const encoder = new TextEncoder();
      const writer = serverProcess.stdin.getWriter();
      await writer.write(encoder.encode(serverCode));
      await writer.close();
      
      // Wait for the server to start (read stdout for server start message)
      let serverStarted = false;
      const decoder = new TextDecoder();
      await withTimeout(
        (async () => {
          const reader = serverProcess.stdout.getReader();
          try {
            while (!serverStarted) {
              const { done, value } = await reader.read();
              if (done) break;
              const text = decoder.decode(value);
              if (text.includes("Server starting on")) {
                serverStarted = true;
                break;
              }
            }
          } finally {
            reader.releaseLock();
          }
        })(),
        SERVER_TIMEOUT_MS,
        async () => {
          if (serverController) serverController.abort();
          if (serverProcess) serverProcess.kill();
        }
      );
      
      // Execute the script remotely
      const originalUrl = import.meta.url;
      const remoteScriptUrl = `${serverUrl}/create-purescript-deno-project.ts`;
      
      const command = new Deno.Command("deno", {
        args: ["run", "--allow-net", "--allow-read", "--allow-write", "--allow-run", remoteScriptUrl, tempDir],
        stdout: "piped",
        stderr: "piped",
      });
      
      const { code, stdout, stderr } = await command.output();
      
      if (code !== 0) {
        const errorOutput = new TextDecoder().decode(stderr);
        console.error("Script execution failed:", errorOutput);
        throw new Error(`Script execution failed with code ${code}`);
      }
      
      // Validate that the project was created correctly
      await validateProjectStructure(tempDir);
      
    } finally {
      // Clean up resources regardless of test outcome
      if (serverController) {
        serverController.abort();
      }
      
      if (tempDir) {
        await cleanupDir(tempDir);
      }
      
      // Cleanup template.zip
      try {
        await Deno.remove("template.zip");
      } catch (error) {
        if (!(error instanceof Deno.errors.NotFound)) {
          console.error("Error removing template.zip:", error);
        }
      }
    }
  },
  // Set timeout for this test
  sanitizeOps: false,
  sanitizeResources: false,
  timeout: TEST_TIMEOUT_MS,
});