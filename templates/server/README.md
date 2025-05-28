# PureScript Deno Project

This project was generated with [create-purescript-deno-project](https://jsr.io/@colinlogue/create-purescript-deno-project). It is a skeleton to help

## Difference with `spago init`

The main difference between this project and one generated with `spago init` is that this project is is intended to be run using Deno as its JavaScript runtime rather than Node.

### Dependencies

This project uses PureScript bindings for Deno APIs from the [purescript-deno-core](https://github.com/colinlogue/purescript-deno-core) library. The HTTP server functionality is provided by the `deno-http-server` package, which provides type-safe PureScript bindings for Deno's HTTP server API.

Running `npm run build` will run `spago build` to compile the PureScript code to JavaScript.

### Running the project

The initial app in the `Main` module launches a Deno server rather than the CLI app produced by `spago init`. This means that we can't use `spago run`, because that launches a Node app without access to the Deno API.

Running `npm run serve` will launch the Deno server.