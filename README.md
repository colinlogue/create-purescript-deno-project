# create-purescript-deno-project

This module is a utility for creating a new Purescript project to be run with Deno rather than Node.

## Usage

The script requires a single argument, a directory to initialize the project in.

To create a project in directory `my-project`:
```
deno run --allow-all jsr:@colinlogue/create-purescript-deno-project my-project
```

You can also specify a template:
```
deno run --allow-all jsr:@colinlogue/create-purescript-deno-project my-project --template server
```

For a CLI application:
```
deno run --allow-all jsr:@colinlogue/create-purescript-deno-project my-project --template cli
```

If the directory already exists, it must be empty.

See the [README in the templates directory](templates/server/README.md) for more information on the generated project.

## Options

- `--build`: Runs `npm install` then `npm run build` after the template folder is copied.
- `--template=server`: Specifies which template to use (default: "server"). Available: "server", "cli".

## Available Templates

Currently, the following templates are available:
- `server`: A basic HTTP server application
- `cli`: A command-line interface application

## Development

### Vendored Dependencies

This project uses a vendor directory to store all external dependencies, making it possible to run the scripts without network access. The dependencies are referenced through an import map specified in `import_map.json`.

When running scripts locally, always include the import map:

```bash
deno run --import-map=import_map.json --allow-all scripts/zip-template.ts
```

You can also use Deno tasks which already include the import map:

```bash
deno task zip
```

### Updating Vendored Dependencies

If you need to update dependencies or add new ones:

1. Add the new dependency to the appropriate file
2. Update the import map in `import_map.json` to include the new dependency
3. Add the dependency to the vendor directory by:
   - Copying the package files into the vendor directory manually, or
   - Using Deno's cache mechanism to download and then copy the files
4. Test your changes by running with the `--no-remote` flag to ensure all dependencies are properly vendored:
   ```bash
   deno run --import-map=import_map.json --no-remote --allow-all scripts/your-script.ts
   ```

## Future work

The generated project also currently requires Node to build. Trying to run Spago through Deno produces an error indicating that a portion of the Node compatibility layer in Deno hasn't been implemented yet. So for the moment, we're stuck with Node for development.
