// Copyright 2018-2025 the Deno authors. MIT license.
// This module is browser compatible.
import { isWindows } from "./_os.ts";
import { resolve as posixResolve } from "./posix/resolve.ts";
import { resolve as windowsResolve } from "./windows/resolve.ts";
/**
 * Resolves path segments into a path.
 *
 * @example Usage
 * ```ts
 * import { resolve } from "@std/path/resolve";
 * import { assertEquals } from "@std/assert";
 *
 * if (Deno.build.os === "windows") {
 *   assertEquals(resolve("C:\\foo", "bar", "baz"), "C:\\foo\\bar\\baz");
 *   assertEquals(resolve("C:\\foo", "C:\\bar", "baz"), "C:\\bar\\baz");
 * } else {
 *   assertEquals(resolve("/foo", "bar", "baz"), "/foo/bar/baz");
 *   assertEquals(resolve("/foo", "/bar", "baz"), "/bar/baz");
 * }
 * ```
 *
 * @param pathSegments Path segments to process to path.
 * @returns The resolved path.
 */ export function resolve(...pathSegments) {
  return isWindows ? windowsResolve(...pathSegments) : posixResolve(...pathSegments);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGU6Ly8vaG9tZS9ydW5uZXIvd29yay9jcmVhdGUtcHVyZXNjcmlwdC1kZW5vLXByb2plY3QvY3JlYXRlLXB1cmVzY3JpcHQtZGVuby1wcm9qZWN0L3ZlbmRvci9Ac3RkL3BhdGhAMS4wLjkvcmVzb2x2ZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgMjAxOC0yMDI1IHRoZSBEZW5vIGF1dGhvcnMuIE1JVCBsaWNlbnNlLlxuLy8gVGhpcyBtb2R1bGUgaXMgYnJvd3NlciBjb21wYXRpYmxlLlxuXG5pbXBvcnQgeyBpc1dpbmRvd3MgfSBmcm9tIFwiLi9fb3MudHNcIjtcbmltcG9ydCB7IHJlc29sdmUgYXMgcG9zaXhSZXNvbHZlIH0gZnJvbSBcIi4vcG9zaXgvcmVzb2x2ZS50c1wiO1xuaW1wb3J0IHsgcmVzb2x2ZSBhcyB3aW5kb3dzUmVzb2x2ZSB9IGZyb20gXCIuL3dpbmRvd3MvcmVzb2x2ZS50c1wiO1xuXG4vKipcbiAqIFJlc29sdmVzIHBhdGggc2VnbWVudHMgaW50byBhIHBhdGguXG4gKlxuICogQGV4YW1wbGUgVXNhZ2VcbiAqIGBgYHRzXG4gKiBpbXBvcnQgeyByZXNvbHZlIH0gZnJvbSBcIkBzdGQvcGF0aC9yZXNvbHZlXCI7XG4gKiBpbXBvcnQgeyBhc3NlcnRFcXVhbHMgfSBmcm9tIFwiQHN0ZC9hc3NlcnRcIjtcbiAqXG4gKiBpZiAoRGVuby5idWlsZC5vcyA9PT0gXCJ3aW5kb3dzXCIpIHtcbiAqICAgYXNzZXJ0RXF1YWxzKHJlc29sdmUoXCJDOlxcXFxmb29cIiwgXCJiYXJcIiwgXCJiYXpcIiksIFwiQzpcXFxcZm9vXFxcXGJhclxcXFxiYXpcIik7XG4gKiAgIGFzc2VydEVxdWFscyhyZXNvbHZlKFwiQzpcXFxcZm9vXCIsIFwiQzpcXFxcYmFyXCIsIFwiYmF6XCIpLCBcIkM6XFxcXGJhclxcXFxiYXpcIik7XG4gKiB9IGVsc2Uge1xuICogICBhc3NlcnRFcXVhbHMocmVzb2x2ZShcIi9mb29cIiwgXCJiYXJcIiwgXCJiYXpcIiksIFwiL2Zvby9iYXIvYmF6XCIpO1xuICogICBhc3NlcnRFcXVhbHMocmVzb2x2ZShcIi9mb29cIiwgXCIvYmFyXCIsIFwiYmF6XCIpLCBcIi9iYXIvYmF6XCIpO1xuICogfVxuICogYGBgXG4gKlxuICogQHBhcmFtIHBhdGhTZWdtZW50cyBQYXRoIHNlZ21lbnRzIHRvIHByb2Nlc3MgdG8gcGF0aC5cbiAqIEByZXR1cm5zIFRoZSByZXNvbHZlZCBwYXRoLlxuICovXG5leHBvcnQgZnVuY3Rpb24gcmVzb2x2ZSguLi5wYXRoU2VnbWVudHM6IHN0cmluZ1tdKTogc3RyaW5nIHtcbiAgcmV0dXJuIGlzV2luZG93c1xuICAgID8gd2luZG93c1Jlc29sdmUoLi4ucGF0aFNlZ21lbnRzKVxuICAgIDogcG9zaXhSZXNvbHZlKC4uLnBhdGhTZWdtZW50cyk7XG59XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEscURBQXFEO0FBQ3JELHFDQUFxQztBQUVyQyxTQUFTLFNBQVMsUUFBUSxXQUFXO0FBQ3JDLFNBQVMsV0FBVyxZQUFZLFFBQVEscUJBQXFCO0FBQzdELFNBQVMsV0FBVyxjQUFjLFFBQVEsdUJBQXVCO0FBRWpFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0NBbUJDLEdBQ0QsT0FBTyxTQUFTLFFBQVEsR0FBRyxZQUFzQjtFQUMvQyxPQUFPLFlBQ0gsa0JBQWtCLGdCQUNsQixnQkFBZ0I7QUFDdEIifQ==
// denoCacheMetadata=2873632451332742376,6303267699962061443