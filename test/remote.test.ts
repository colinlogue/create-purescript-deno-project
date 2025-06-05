// test/remote.test.ts
// Tests the script execution via HTTP by serving files and running remotely

import { cleanupDir, createTempDir, validateProjectStructure } from "./utils.ts";

/**
 * Utility function to test the remote execution of template creation
 * @param templateName The name of the template to test (server, cli, webapp)
 * @param buildProject Whether to test building the project
 */
async function testRemote(templateName: string, buildProject: boolean = false): Promise<void> {
  let tempDir = "";
  let serverController: AbortController | null = null;
  let server: Deno.HttpServer | null = null;

  try {
    // Create a temporary directory for the project
    tempDir = await createTempDir(`remote-${templateName}${buildProject ? '-build' : ''}-`);

    // Start HTTP server to serve the files
    const port = 8765;
    serverController = new AbortController();
    const serverUrl = `http://localhost:${port}`;

    const handler = async (req: Request) => {
      const url = new URL(req.url);
      let filePath;

      if (url.pathname === "/create-purescript-deno-project.ts") {
        filePath = "./create-purescript-deno-project.ts";
      } else if (url.pathname === `/templates/${templateName}.zip`) {
        filePath = `./templates/${templateName}.zip`;
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

    // Build command args based on template and build option
    const args = [
      "run",
      "--allow-net",
      "--allow-read",
      "--allow-write",
      "--allow-run",
      remoteScriptUrl,
      buildProject ? "--build" : "",
      `--template=${templateName}`,
      tempDir,
    ].filter(Boolean); // Filter out empty strings

    const command = new Deno.Command("deno", {
      args,
      stdout: "piped",
      stderr: "piped",
    });

    const { code, stderr } = await command.output();

    if (code !== 0) {
      const errorOutput = new TextDecoder().decode(stderr);
      console.error("Script execution failed:", errorOutput);
      console.error("Command that failed:", `deno ${args.join(" ")}`);
      throw new Error(`Script execution failed with code ${code}: ${errorOutput}`);
    }

    // Validate that the project was created correctly
    await validateProjectStructure(tempDir, templateName);

    // Run tests if building the project
    if (buildProject) {
      const cmd = new Deno.Command("npm", {
        args: ["run", "test"],
        cwd: tempDir,
      });

      const status = await cmd.spawn().status;

      if (!status.success) {
        throw new Error(`Test in ${templateName} failed`);
      }
    }

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
}

// Test server template creation remotely
Deno.test("Remote execution - serves files and creates server project", () =>
  testRemote("server")
);

// Test server template with build option remotely
Deno.test("Remote execution - serves files and creates/builds server project", () =>
  testRemote("server", true)
);

// Test CLI template creation remotely
Deno.test("Remote execution - serves files and creates CLI project", () =>
  testRemote("cli")
);

// Test CLI template with build option remotely
Deno.test("Remote execution - serves files and creates/builds CLI project", () =>
  testRemote("cli", true)
);

// Test webapp template creation remotely
Deno.test("Remote execution - serves files and creates webapp project", () =>
  testRemote("webapp")
);

// Test webapp template with build option remotely
Deno.test("Remote execution - serves files and creates/builds webapp project", () =>
  testRemote("webapp", true)
);