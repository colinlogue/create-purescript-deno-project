# create-purescript-deno-project

This module is a utility for creating a new Purescript project to be run with Deno rather than Node.

## Usage

The script takes a single argument, a directory to initialize the project in. If no directory is provided, it will be initialized in the current working directory.

To create a project in directory `my-project`:
```
deno run --allow-all jsr:@colinlogue/create-purescript-deno-project my-project
```

You can also specify a template:
```
deno run --allow-all jsr:@colinlogue/create-purescript-deno-project my-project --template server
```

If the directory already exists, it must be empty.

See the [README in the templates directory](templates/server/README.md) for more information on the generated project.

## Options

- `--build`: Runs `npm install` then `npm run build` after the template folder is copied.
- `--template=server`: Specifies which template to use (default: "server").

## Available Templates

Currently, the following templates are available:
- `server`: A basic HTTP server application

## Future work

The generated project also currently requires Node to build. Trying to run Spago through Deno produces an error indicating that a portion of the Node compatibility layer in Deno hasn't been implemented yet. So for the moment, we're stuck with Node for development.
