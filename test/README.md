# Tests for create-purescript-deno-project

This directory contains tests for the `create-purescript-deno-project` script.

## Running Tests

You can run all tests using:

```bash
deno task test
```

Or run specific tests:

```bash
# Run only local tests
deno task test:local

# Run only remote tests
deno task test:remote
```

## Test Structure

- `local.test.ts` - Tests local execution of the script by creating a project in a temporary directory
- `remote.test.ts` - Tests remote execution by serving the script via HTTP and running it remotely
- `utils.ts` - Common utility functions for tests

## Test Description

### Local Test
The local test executes the script directly to create a project in a temporary directory. It verifies that:
1. The script can be called with a target directory
2. The project structure is created correctly
3. The build option works (optional test)

### Remote Test
The remote test sets up an HTTP server to serve the script and template files, then runs the script remotely. It verifies that:
1. The script can be downloaded and executed
2. The template files can be downloaded
3. The project structure is created correctly

## Cleanup

All tests automatically clean up temporary directories and processes regardless of test outcome. Tests have timeouts to prevent hanging on failures.