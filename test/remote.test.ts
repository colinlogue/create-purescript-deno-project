// test/remote.test.ts
// Tests the script execution via HTTP by serving files and running remotely

import { cleanupDir, createTempDir, validateProjectStructure } from "./utils.ts";
import { zipTemplate } from "../scripts/zip-template.ts";

Deno.test(
  "Remote execution - serves files and creates project in temporary directory",
  async () => {
    let tempDir = "";
    let serverController: AbortController | null = null;
    let server: Deno.HttpServer | null = null;

    try {
      // Create a temporary directory for the project
      tempDir = await createTempDir("remote-");

      // Ensure server.zip exists (it should already be there)
      try {
        await Deno.stat("./templates/server.zip");
      } catch (error) {
        if (error instanceof Deno.errors.NotFound) {
          // Create it if it doesn't exist
          await zipTemplate();
        } else {
          throw error;
        }
      }

      // Start HTTP server to serve the files
      const port = 8765;
      serverController = new AbortController();
      const serverUrl = `http://localhost:${port}`;

      const handler = async (req: Request) => {
        const url = new URL(req.url);
        let filePath;

        if (url.pathname === "/create-purescript-deno-project.ts") {
          filePath = "./create-purescript-deno-project.ts";
        } else if (url.pathname === "/templates/server.zip") {
          filePath = "./templates/server.zip";
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
          console.error(`Error serving ${filePath}:`, error);
          return new Response("Internal server error", { status: 500 });
        }
      };

      console.log(`Server starting on http://localhost:${port}`);

      server = Deno.serve({ port }, handler);
      server.unref();

      // Give the server a moment to start up
      await new Promise(resolve => setTimeout(resolve, 100));

      // Execute the script remotely
      const remoteScriptUrl = `${serverUrl}/create-purescript-deno-project.ts`;

      const command = new Deno.Command("deno", {
        args: ["run", "--allow-net", "--allow-read", "--allow-write", "--allow-run", remoteScriptUrl, tempDir],
        stdout: "piped",
        stderr: "piped",
      });

      const { code, stderr } = await command.output();

      if (code !== 0) {
        const errorOutput = new TextDecoder().decode(stderr);
        console.error("Script execution failed:", errorOutput);
        console.error("Command that failed:", `deno run --allow-net --allow-read --allow-write --allow-run ${remoteScriptUrl} ${tempDir}`);
        throw new Error(`Script execution failed with code ${code}: ${errorOutput}`);
      }

      // Validate that the project was created correctly
      await validateProjectStructure(tempDir);

    } finally {
      // Clean up resources regardless of test outcome
      if (server) {
        await server.shutdown();
      }

      if (serverController) {
        serverController.abort();
      }

      if (tempDir) {
        await cleanupDir(tempDir);
      }
    }
  },
);