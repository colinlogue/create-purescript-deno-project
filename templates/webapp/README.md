# PureScript Deno Web App

This project was generated with [create-purescript-deno-project](https://jsr.io/@colinlogue/create-purescript-deno-project). It is a web application skeleton with routing and JSON database support.

## Features

This web app template provides:

- **Static HTML serving**: The root path `/` serves a basic HTML page from the HTML templates directory
- **API routing**: Paths starting with `/api/` fetch files from a JSON database with CRUD operations
- **404 handling**: All other paths return a 404 status with a custom error page
- **HTML templates**: Static HTML files are stored in the `html/` directory
- **JSON database**: Simple file-based database for storing and retrieving data

### Dependencies

This project uses PureScript bindings for Deno APIs from the [purescript-deno-core](https://github.com/colinlogue/purescript-deno-core) library. The HTTP server functionality is provided by the `deno-http-server` package, and JSON database functionality is provided by the `deno-json-db` package.

Running `npm run build` will run `spago build` to compile the PureScript code to JavaScript.

### Running the project

The initial app in the `Main` module launches a Deno web server with routing capabilities. This means that we can't use `spago run`, because that launches a Node app without access to the Deno API.

Running `npm run serve` will launch the Deno server.