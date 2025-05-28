// Copyright 2018-2025 the Deno authors. MIT license.
// This module is browser compatible.
import { isWindows } from "./_os.ts";
import { join as posixJoin } from "./posix/join.ts";
import { join as windowsJoin } from "./windows/join.ts";
/**
 * Joins a sequence of paths, then normalizes the resulting path.
 *
 * @example Usage
 * ```ts
 * import { join } from "@std/path/join";
 * import { assertEquals } from "@std/assert";
 *
 * if (Deno.build.os === "windows") {
 *   assertEquals(join("C:\\foo", "bar", "baz\\quux", "garply", ".."), "C:\\foo\\bar\\baz\\quux");
 *   assertEquals(join(new URL("file:///C:/foo"), "bar", "baz/asdf", "quux", ".."), "C:\\foo\\bar\\baz\\asdf");
 * } else {
 *   assertEquals(join("/foo", "bar", "baz/quux", "garply", ".."), "/foo/bar/baz/quux");
 *   assertEquals(join(new URL("file:///foo"), "bar", "baz/asdf", "quux", ".."), "/foo/bar/baz/asdf");
 * }
 * ```
 *
 * @param path The path to join. This can be string or file URL.
 * @param paths Paths to be joined and normalized.
 * @returns The joined and normalized path.
 */ export function join(path, ...paths) {
  return isWindows ? windowsJoin(path, ...paths) : posixJoin(path, ...paths);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGU6Ly8vaG9tZS9ydW5uZXIvd29yay9jcmVhdGUtcHVyZXNjcmlwdC1kZW5vLXByb2plY3QvY3JlYXRlLXB1cmVzY3JpcHQtZGVuby1wcm9qZWN0L3ZlbmRvci9Ac3RkL3BhdGhAMS4wLjkvam9pbi50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgMjAxOC0yMDI1IHRoZSBEZW5vIGF1dGhvcnMuIE1JVCBsaWNlbnNlLlxuLy8gVGhpcyBtb2R1bGUgaXMgYnJvd3NlciBjb21wYXRpYmxlLlxuXG5pbXBvcnQgeyBpc1dpbmRvd3MgfSBmcm9tIFwiLi9fb3MudHNcIjtcbmltcG9ydCB7IGpvaW4gYXMgcG9zaXhKb2luIH0gZnJvbSBcIi4vcG9zaXgvam9pbi50c1wiO1xuaW1wb3J0IHsgam9pbiBhcyB3aW5kb3dzSm9pbiB9IGZyb20gXCIuL3dpbmRvd3Mvam9pbi50c1wiO1xuXG4vKipcbiAqIEpvaW5zIGEgc2VxdWVuY2Ugb2YgcGF0aHMsIHRoZW4gbm9ybWFsaXplcyB0aGUgcmVzdWx0aW5nIHBhdGguXG4gKlxuICogQGV4YW1wbGUgVXNhZ2VcbiAqIGBgYHRzXG4gKiBpbXBvcnQgeyBqb2luIH0gZnJvbSBcIkBzdGQvcGF0aC9qb2luXCI7XG4gKiBpbXBvcnQgeyBhc3NlcnRFcXVhbHMgfSBmcm9tIFwiQHN0ZC9hc3NlcnRcIjtcbiAqXG4gKiBpZiAoRGVuby5idWlsZC5vcyA9PT0gXCJ3aW5kb3dzXCIpIHtcbiAqICAgYXNzZXJ0RXF1YWxzKGpvaW4oXCJDOlxcXFxmb29cIiwgXCJiYXJcIiwgXCJiYXpcXFxccXV1eFwiLCBcImdhcnBseVwiLCBcIi4uXCIpLCBcIkM6XFxcXGZvb1xcXFxiYXJcXFxcYmF6XFxcXHF1dXhcIik7XG4gKiAgIGFzc2VydEVxdWFscyhqb2luKG5ldyBVUkwoXCJmaWxlOi8vL0M6L2Zvb1wiKSwgXCJiYXJcIiwgXCJiYXovYXNkZlwiLCBcInF1dXhcIiwgXCIuLlwiKSwgXCJDOlxcXFxmb29cXFxcYmFyXFxcXGJhelxcXFxhc2RmXCIpO1xuICogfSBlbHNlIHtcbiAqICAgYXNzZXJ0RXF1YWxzKGpvaW4oXCIvZm9vXCIsIFwiYmFyXCIsIFwiYmF6L3F1dXhcIiwgXCJnYXJwbHlcIiwgXCIuLlwiKSwgXCIvZm9vL2Jhci9iYXovcXV1eFwiKTtcbiAqICAgYXNzZXJ0RXF1YWxzKGpvaW4obmV3IFVSTChcImZpbGU6Ly8vZm9vXCIpLCBcImJhclwiLCBcImJhei9hc2RmXCIsIFwicXV1eFwiLCBcIi4uXCIpLCBcIi9mb28vYmFyL2Jhei9hc2RmXCIpO1xuICogfVxuICogYGBgXG4gKlxuICogQHBhcmFtIHBhdGggVGhlIHBhdGggdG8gam9pbi4gVGhpcyBjYW4gYmUgc3RyaW5nIG9yIGZpbGUgVVJMLlxuICogQHBhcmFtIHBhdGhzIFBhdGhzIHRvIGJlIGpvaW5lZCBhbmQgbm9ybWFsaXplZC5cbiAqIEByZXR1cm5zIFRoZSBqb2luZWQgYW5kIG5vcm1hbGl6ZWQgcGF0aC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGpvaW4ocGF0aDogc3RyaW5nIHwgVVJMLCAuLi5wYXRoczogc3RyaW5nW10pOiBzdHJpbmcge1xuICByZXR1cm4gaXNXaW5kb3dzID8gd2luZG93c0pvaW4ocGF0aCwgLi4ucGF0aHMpIDogcG9zaXhKb2luKHBhdGgsIC4uLnBhdGhzKTtcbn1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxxREFBcUQ7QUFDckQscUNBQXFDO0FBRXJDLFNBQVMsU0FBUyxRQUFRLFdBQVc7QUFDckMsU0FBUyxRQUFRLFNBQVMsUUFBUSxrQkFBa0I7QUFDcEQsU0FBUyxRQUFRLFdBQVcsUUFBUSxvQkFBb0I7QUFFeEQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0NBb0JDLEdBQ0QsT0FBTyxTQUFTLEtBQUssSUFBa0IsRUFBRSxHQUFHLEtBQWU7RUFDekQsT0FBTyxZQUFZLFlBQVksU0FBUyxTQUFTLFVBQVUsU0FBUztBQUN0RSJ9
// denoCacheMetadata=4019195362796235912,7939657833893999208