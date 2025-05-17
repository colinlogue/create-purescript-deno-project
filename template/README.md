# PureScript Deno Project

This project was generated with [create-purescript-deno-project](https://jsr.io/@colinlogue/create-purescript-deno-project). It is a skeleton to help

## Difference with `spago init`

The main difference between this project and one generated with `spago init` is that this project is is intended to be run using Deno as its JavaScript runtime rather than Node.

### FFI Files

The generated project uses TypeScript for the FFI files, which requires an extra build step to compile to .js files before building with Spago. Somewhat unfortunately, Deno does not have a way to just transpile .ts files to .js, so we have to rely on a separate TypeScript compiler for this.

Running `npm run build` will call `tsc` to compile the FFI files before running `spago build`.

This also requires the Deno API types to be made available to the TypeScript compiler. This is done through the `@types/deno` npm module. The version may need to be changed to match the version of Deno you are using.

### Running the project

The initial app in the `Main` module launches a Deno server rather than the CLI app produced by `spago init`. This means that we can't use `spago run`, because that launches a Node app without access to the Deno API.

Running `npm run serve` will launch the Deno server.