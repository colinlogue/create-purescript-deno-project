# create-purescript-deno-project

This module is a utility for creating a new Purescript project to be run with Deno rather than Node.

## Usage

The script takes a single argument, a directory to initialize the project in. If no directory is provided, it will be initialized in the current working directory.

To create a project in directory `my-project`:
```
deno run --allow-all https://jsr.io/@colinlogue/create-purescript-deno-project/0.1.4/create-purescript-deno-project.ts my-project
```

If the directory already exists, it must be empty.

See the [README in the template directory](template/README.md) for more information on the generated project.

## Future work

This is still pretty bare-bones. In the future I'd like to have options for generating different types of projects (CLI/server).

The generated project also currently requires Node to build. Trying to run Spago through Deno produces an error indicating that a portion of the Node compatibility layer in Deno hasn't been implemented yet. So for the moment, we're stuck with Node for development.
