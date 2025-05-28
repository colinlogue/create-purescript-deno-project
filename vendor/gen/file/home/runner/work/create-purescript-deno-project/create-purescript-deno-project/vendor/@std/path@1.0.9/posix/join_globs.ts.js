// Copyright 2018-2025 the Deno authors. MIT license.
// This module is browser compatible.
import { join } from "./join.ts";
import { SEPARATOR } from "./constants.ts";
import { normalizeGlob } from "./normalize_glob.ts";
/**
 * Like join(), but doesn't collapse "**\/.." when `globstar` is true.
 *
 * @example Usage
 * ```ts
 * import { joinGlobs } from "@std/path/posix/join-globs";
 * import { assertEquals } from "@std/assert";
 *
 * const path = joinGlobs(["foo", "bar", "**"], { globstar: true });
 * assertEquals(path, "foo/bar/**");
 * ```
 *
 * @param globs The globs to join.
 * @param options The options to use.
 * @returns The joined path.
 */ export function joinGlobs(globs, options = {}) {
  const { globstar = false } = options;
  if (!globstar || globs.length === 0) {
    return join(...globs);
  }
  let joined;
  for (const glob of globs){
    const path = glob;
    if (path.length > 0) {
      if (!joined) joined = path;
      else joined += `${SEPARATOR}${path}`;
    }
  }
  if (!joined) return ".";
  return normalizeGlob(joined, {
    globstar
  });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGU6Ly8vaG9tZS9ydW5uZXIvd29yay9jcmVhdGUtcHVyZXNjcmlwdC1kZW5vLXByb2plY3QvY3JlYXRlLXB1cmVzY3JpcHQtZGVuby1wcm9qZWN0L3ZlbmRvci9Ac3RkL3BhdGhAMS4wLjkvcG9zaXgvam9pbl9nbG9icy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgMjAxOC0yMDI1IHRoZSBEZW5vIGF1dGhvcnMuIE1JVCBsaWNlbnNlLlxuLy8gVGhpcyBtb2R1bGUgaXMgYnJvd3NlciBjb21wYXRpYmxlLlxuXG5pbXBvcnQgdHlwZSB7IEdsb2JPcHRpb25zIH0gZnJvbSBcIi4uL19jb21tb24vZ2xvYl90b19yZWdfZXhwLnRzXCI7XG5pbXBvcnQgeyBqb2luIH0gZnJvbSBcIi4vam9pbi50c1wiO1xuaW1wb3J0IHsgU0VQQVJBVE9SIH0gZnJvbSBcIi4vY29uc3RhbnRzLnRzXCI7XG5pbXBvcnQgeyBub3JtYWxpemVHbG9iIH0gZnJvbSBcIi4vbm9ybWFsaXplX2dsb2IudHNcIjtcblxuZXhwb3J0IHR5cGUgeyBHbG9iT3B0aW9ucyB9O1xuXG4vKipcbiAqIExpa2Ugam9pbigpLCBidXQgZG9lc24ndCBjb2xsYXBzZSBcIioqXFwvLi5cIiB3aGVuIGBnbG9ic3RhcmAgaXMgdHJ1ZS5cbiAqXG4gKiBAZXhhbXBsZSBVc2FnZVxuICogYGBgdHNcbiAqIGltcG9ydCB7IGpvaW5HbG9icyB9IGZyb20gXCJAc3RkL3BhdGgvcG9zaXgvam9pbi1nbG9ic1wiO1xuICogaW1wb3J0IHsgYXNzZXJ0RXF1YWxzIH0gZnJvbSBcIkBzdGQvYXNzZXJ0XCI7XG4gKlxuICogY29uc3QgcGF0aCA9IGpvaW5HbG9icyhbXCJmb29cIiwgXCJiYXJcIiwgXCIqKlwiXSwgeyBnbG9ic3RhcjogdHJ1ZSB9KTtcbiAqIGFzc2VydEVxdWFscyhwYXRoLCBcImZvby9iYXIvKipcIik7XG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0gZ2xvYnMgVGhlIGdsb2JzIHRvIGpvaW4uXG4gKiBAcGFyYW0gb3B0aW9ucyBUaGUgb3B0aW9ucyB0byB1c2UuXG4gKiBAcmV0dXJucyBUaGUgam9pbmVkIHBhdGguXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBqb2luR2xvYnMoXG4gIGdsb2JzOiBzdHJpbmdbXSxcbiAgb3B0aW9uczogUGljazxHbG9iT3B0aW9ucywgXCJnbG9ic3RhclwiPiA9IHt9LFxuKTogc3RyaW5nIHtcbiAgY29uc3QgeyBnbG9ic3RhciA9IGZhbHNlIH0gPSBvcHRpb25zO1xuICBpZiAoIWdsb2JzdGFyIHx8IGdsb2JzLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiBqb2luKC4uLmdsb2JzKTtcbiAgfVxuICBsZXQgam9pbmVkOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gIGZvciAoY29uc3QgZ2xvYiBvZiBnbG9icykge1xuICAgIGNvbnN0IHBhdGggPSBnbG9iO1xuICAgIGlmIChwYXRoLmxlbmd0aCA+IDApIHtcbiAgICAgIGlmICgham9pbmVkKSBqb2luZWQgPSBwYXRoO1xuICAgICAgZWxzZSBqb2luZWQgKz0gYCR7U0VQQVJBVE9SfSR7cGF0aH1gO1xuICAgIH1cbiAgfVxuICBpZiAoIWpvaW5lZCkgcmV0dXJuIFwiLlwiO1xuICByZXR1cm4gbm9ybWFsaXplR2xvYihqb2luZWQsIHsgZ2xvYnN0YXIgfSk7XG59XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEscURBQXFEO0FBQ3JELHFDQUFxQztBQUdyQyxTQUFTLElBQUksUUFBUSxZQUFZO0FBQ2pDLFNBQVMsU0FBUyxRQUFRLGlCQUFpQjtBQUMzQyxTQUFTLGFBQWEsUUFBUSxzQkFBc0I7QUFJcEQ7Ozs7Ozs7Ozs7Ozs7OztDQWVDLEdBQ0QsT0FBTyxTQUFTLFVBQ2QsS0FBZSxFQUNmLFVBQXlDLENBQUMsQ0FBQztFQUUzQyxNQUFNLEVBQUUsV0FBVyxLQUFLLEVBQUUsR0FBRztFQUM3QixJQUFJLENBQUMsWUFBWSxNQUFNLE1BQU0sS0FBSyxHQUFHO0lBQ25DLE9BQU8sUUFBUTtFQUNqQjtFQUNBLElBQUk7RUFDSixLQUFLLE1BQU0sUUFBUSxNQUFPO0lBQ3hCLE1BQU0sT0FBTztJQUNiLElBQUksS0FBSyxNQUFNLEdBQUcsR0FBRztNQUNuQixJQUFJLENBQUMsUUFBUSxTQUFTO1dBQ2pCLFVBQVUsR0FBRyxZQUFZLE1BQU07SUFDdEM7RUFDRjtFQUNBLElBQUksQ0FBQyxRQUFRLE9BQU87RUFDcEIsT0FBTyxjQUFjLFFBQVE7SUFBRTtFQUFTO0FBQzFDIn0=
// denoCacheMetadata=16591573308741792480,957885437976972629