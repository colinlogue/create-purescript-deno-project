// Copyright 2018-2025 the Deno authors. MIT license.
// This module is browser compatible.
import { isWindows } from "./_os.ts";
import { joinGlobs as posixJoinGlobs } from "./posix/join_globs.ts";
import { joinGlobs as windowsJoinGlobs } from "./windows/join_globs.ts";
/**
 * Joins a sequence of globs, then normalizes the resulting glob.
 *
 * Behaves like {@linkcode https://jsr.io/@std/path/doc/~/join | join()}, but
 * doesn't collapse `**\/..` when `globstar` is true.
 *
 * @example Usage
 * ```ts
 * import { joinGlobs } from "@std/path/join-globs";
 * import { assertEquals } from "@std/assert";
 *
 * if (Deno.build.os === "windows") {
 *   assertEquals(joinGlobs(["foo", "bar", "..", "baz"]), "foo\\baz");
 *   assertEquals(joinGlobs(["foo", "**", "bar", "..", "baz"], { globstar: true }), "foo\\**\\baz");
 * } else {
 *   assertEquals(joinGlobs(["foo", "bar", "..", "baz"]), "foo/baz");
 *   assertEquals(joinGlobs(["foo", "**", "bar", "..", "baz"], { globstar: true }), "foo/**\/baz");
 * }
 * ```
 *
 * @param globs Globs to be joined and normalized.
 * @param options Glob options.
 * @returns The joined and normalized glob string.
 */ export function joinGlobs(globs, options = {}) {
  return isWindows ? windowsJoinGlobs(globs, options) : posixJoinGlobs(globs, options);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGU6Ly8vaG9tZS9ydW5uZXIvd29yay9jcmVhdGUtcHVyZXNjcmlwdC1kZW5vLXByb2plY3QvY3JlYXRlLXB1cmVzY3JpcHQtZGVuby1wcm9qZWN0L3ZlbmRvci9Ac3RkL3BhdGhAMS4wLjkvam9pbl9nbG9icy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgMjAxOC0yMDI1IHRoZSBEZW5vIGF1dGhvcnMuIE1JVCBsaWNlbnNlLlxuLy8gVGhpcyBtb2R1bGUgaXMgYnJvd3NlciBjb21wYXRpYmxlLlxuXG5pbXBvcnQgdHlwZSB7IEdsb2JPcHRpb25zIH0gZnJvbSBcIi4vX2NvbW1vbi9nbG9iX3RvX3JlZ19leHAudHNcIjtcbmltcG9ydCB7IGlzV2luZG93cyB9IGZyb20gXCIuL19vcy50c1wiO1xuaW1wb3J0IHsgam9pbkdsb2JzIGFzIHBvc2l4Sm9pbkdsb2JzIH0gZnJvbSBcIi4vcG9zaXgvam9pbl9nbG9icy50c1wiO1xuaW1wb3J0IHsgam9pbkdsb2JzIGFzIHdpbmRvd3NKb2luR2xvYnMgfSBmcm9tIFwiLi93aW5kb3dzL2pvaW5fZ2xvYnMudHNcIjtcblxuZXhwb3J0IHR5cGUgeyBHbG9iT3B0aW9ucyB9O1xuXG4vKipcbiAqIEpvaW5zIGEgc2VxdWVuY2Ugb2YgZ2xvYnMsIHRoZW4gbm9ybWFsaXplcyB0aGUgcmVzdWx0aW5nIGdsb2IuXG4gKlxuICogQmVoYXZlcyBsaWtlIHtAbGlua2NvZGUgaHR0cHM6Ly9qc3IuaW8vQHN0ZC9wYXRoL2RvYy9+L2pvaW4gfCBqb2luKCl9LCBidXRcbiAqIGRvZXNuJ3QgY29sbGFwc2UgYCoqXFwvLi5gIHdoZW4gYGdsb2JzdGFyYCBpcyB0cnVlLlxuICpcbiAqIEBleGFtcGxlIFVzYWdlXG4gKiBgYGB0c1xuICogaW1wb3J0IHsgam9pbkdsb2JzIH0gZnJvbSBcIkBzdGQvcGF0aC9qb2luLWdsb2JzXCI7XG4gKiBpbXBvcnQgeyBhc3NlcnRFcXVhbHMgfSBmcm9tIFwiQHN0ZC9hc3NlcnRcIjtcbiAqXG4gKiBpZiAoRGVuby5idWlsZC5vcyA9PT0gXCJ3aW5kb3dzXCIpIHtcbiAqICAgYXNzZXJ0RXF1YWxzKGpvaW5HbG9icyhbXCJmb29cIiwgXCJiYXJcIiwgXCIuLlwiLCBcImJhelwiXSksIFwiZm9vXFxcXGJhelwiKTtcbiAqICAgYXNzZXJ0RXF1YWxzKGpvaW5HbG9icyhbXCJmb29cIiwgXCIqKlwiLCBcImJhclwiLCBcIi4uXCIsIFwiYmF6XCJdLCB7IGdsb2JzdGFyOiB0cnVlIH0pLCBcImZvb1xcXFwqKlxcXFxiYXpcIik7XG4gKiB9IGVsc2Uge1xuICogICBhc3NlcnRFcXVhbHMoam9pbkdsb2JzKFtcImZvb1wiLCBcImJhclwiLCBcIi4uXCIsIFwiYmF6XCJdKSwgXCJmb28vYmF6XCIpO1xuICogICBhc3NlcnRFcXVhbHMoam9pbkdsb2JzKFtcImZvb1wiLCBcIioqXCIsIFwiYmFyXCIsIFwiLi5cIiwgXCJiYXpcIl0sIHsgZ2xvYnN0YXI6IHRydWUgfSksIFwiZm9vLyoqXFwvYmF6XCIpO1xuICogfVxuICogYGBgXG4gKlxuICogQHBhcmFtIGdsb2JzIEdsb2JzIHRvIGJlIGpvaW5lZCBhbmQgbm9ybWFsaXplZC5cbiAqIEBwYXJhbSBvcHRpb25zIEdsb2Igb3B0aW9ucy5cbiAqIEByZXR1cm5zIFRoZSBqb2luZWQgYW5kIG5vcm1hbGl6ZWQgZ2xvYiBzdHJpbmcuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBqb2luR2xvYnMoXG4gIGdsb2JzOiBzdHJpbmdbXSxcbiAgb3B0aW9uczogR2xvYk9wdGlvbnMgPSB7fSxcbik6IHN0cmluZyB7XG4gIHJldHVybiBpc1dpbmRvd3NcbiAgICA/IHdpbmRvd3NKb2luR2xvYnMoZ2xvYnMsIG9wdGlvbnMpXG4gICAgOiBwb3NpeEpvaW5HbG9icyhnbG9icywgb3B0aW9ucyk7XG59XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEscURBQXFEO0FBQ3JELHFDQUFxQztBQUdyQyxTQUFTLFNBQVMsUUFBUSxXQUFXO0FBQ3JDLFNBQVMsYUFBYSxjQUFjLFFBQVEsd0JBQXdCO0FBQ3BFLFNBQVMsYUFBYSxnQkFBZ0IsUUFBUSwwQkFBMEI7QUFJeEU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0NBdUJDLEdBQ0QsT0FBTyxTQUFTLFVBQ2QsS0FBZSxFQUNmLFVBQXVCLENBQUMsQ0FBQztFQUV6QixPQUFPLFlBQ0gsaUJBQWlCLE9BQU8sV0FDeEIsZUFBZSxPQUFPO0FBQzVCIn0=
// denoCacheMetadata=2862725202484674533,5123162154152517186