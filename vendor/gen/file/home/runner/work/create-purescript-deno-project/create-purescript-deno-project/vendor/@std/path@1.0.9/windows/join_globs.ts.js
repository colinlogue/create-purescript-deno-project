// Copyright 2018-2025 the Deno authors. MIT license.
// This module is browser compatible.
import { join } from "./join.ts";
import { SEPARATOR } from "./constants.ts";
import { normalizeGlob } from "./normalize_glob.ts";
/**
 * Like join(), but doesn't collapse "**\/.." when `globstar` is true.
 *
 * @example Usage
 *
 * ```ts
 * import { joinGlobs } from "@std/path/windows/join-globs";
 * import { assertEquals } from "@std/assert";
 *
 * const joined = joinGlobs(["foo", "**", "bar"], { globstar: true });
 * assertEquals(joined, "foo\\**\\bar");
 * ```
 *
 * @param globs The globs to join.
 * @param options The options for glob pattern.
 * @returns The joined glob pattern.
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGU6Ly8vaG9tZS9ydW5uZXIvd29yay9jcmVhdGUtcHVyZXNjcmlwdC1kZW5vLXByb2plY3QvY3JlYXRlLXB1cmVzY3JpcHQtZGVuby1wcm9qZWN0L3ZlbmRvci9Ac3RkL3BhdGhAMS4wLjkvd2luZG93cy9qb2luX2dsb2JzLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAyMDE4LTIwMjUgdGhlIERlbm8gYXV0aG9ycy4gTUlUIGxpY2Vuc2UuXG4vLyBUaGlzIG1vZHVsZSBpcyBicm93c2VyIGNvbXBhdGlibGUuXG5cbmltcG9ydCB0eXBlIHsgR2xvYk9wdGlvbnMgfSBmcm9tIFwiLi4vX2NvbW1vbi9nbG9iX3RvX3JlZ19leHAudHNcIjtcbmltcG9ydCB7IGpvaW4gfSBmcm9tIFwiLi9qb2luLnRzXCI7XG5pbXBvcnQgeyBTRVBBUkFUT1IgfSBmcm9tIFwiLi9jb25zdGFudHMudHNcIjtcbmltcG9ydCB7IG5vcm1hbGl6ZUdsb2IgfSBmcm9tIFwiLi9ub3JtYWxpemVfZ2xvYi50c1wiO1xuXG5leHBvcnQgdHlwZSB7IEdsb2JPcHRpb25zIH07XG5cbi8qKlxuICogTGlrZSBqb2luKCksIGJ1dCBkb2Vzbid0IGNvbGxhcHNlIFwiKipcXC8uLlwiIHdoZW4gYGdsb2JzdGFyYCBpcyB0cnVlLlxuICpcbiAqIEBleGFtcGxlIFVzYWdlXG4gKlxuICogYGBgdHNcbiAqIGltcG9ydCB7IGpvaW5HbG9icyB9IGZyb20gXCJAc3RkL3BhdGgvd2luZG93cy9qb2luLWdsb2JzXCI7XG4gKiBpbXBvcnQgeyBhc3NlcnRFcXVhbHMgfSBmcm9tIFwiQHN0ZC9hc3NlcnRcIjtcbiAqXG4gKiBjb25zdCBqb2luZWQgPSBqb2luR2xvYnMoW1wiZm9vXCIsIFwiKipcIiwgXCJiYXJcIl0sIHsgZ2xvYnN0YXI6IHRydWUgfSk7XG4gKiBhc3NlcnRFcXVhbHMoam9pbmVkLCBcImZvb1xcXFwqKlxcXFxiYXJcIik7XG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0gZ2xvYnMgVGhlIGdsb2JzIHRvIGpvaW4uXG4gKiBAcGFyYW0gb3B0aW9ucyBUaGUgb3B0aW9ucyBmb3IgZ2xvYiBwYXR0ZXJuLlxuICogQHJldHVybnMgVGhlIGpvaW5lZCBnbG9iIHBhdHRlcm4uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBqb2luR2xvYnMoXG4gIGdsb2JzOiBzdHJpbmdbXSxcbiAgb3B0aW9uczogUGljazxHbG9iT3B0aW9ucywgXCJnbG9ic3RhclwiPiA9IHt9LFxuKTogc3RyaW5nIHtcbiAgY29uc3QgeyBnbG9ic3RhciA9IGZhbHNlIH0gPSBvcHRpb25zO1xuICBpZiAoIWdsb2JzdGFyIHx8IGdsb2JzLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiBqb2luKC4uLmdsb2JzKTtcbiAgfVxuICBsZXQgam9pbmVkOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gIGZvciAoY29uc3QgZ2xvYiBvZiBnbG9icykge1xuICAgIGNvbnN0IHBhdGggPSBnbG9iO1xuICAgIGlmIChwYXRoLmxlbmd0aCA+IDApIHtcbiAgICAgIGlmICgham9pbmVkKSBqb2luZWQgPSBwYXRoO1xuICAgICAgZWxzZSBqb2luZWQgKz0gYCR7U0VQQVJBVE9SfSR7cGF0aH1gO1xuICAgIH1cbiAgfVxuICBpZiAoIWpvaW5lZCkgcmV0dXJuIFwiLlwiO1xuICByZXR1cm4gbm9ybWFsaXplR2xvYihqb2luZWQsIHsgZ2xvYnN0YXIgfSk7XG59XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEscURBQXFEO0FBQ3JELHFDQUFxQztBQUdyQyxTQUFTLElBQUksUUFBUSxZQUFZO0FBQ2pDLFNBQVMsU0FBUyxRQUFRLGlCQUFpQjtBQUMzQyxTQUFTLGFBQWEsUUFBUSxzQkFBc0I7QUFJcEQ7Ozs7Ozs7Ozs7Ozs7Ozs7Q0FnQkMsR0FDRCxPQUFPLFNBQVMsVUFDZCxLQUFlLEVBQ2YsVUFBeUMsQ0FBQyxDQUFDO0VBRTNDLE1BQU0sRUFBRSxXQUFXLEtBQUssRUFBRSxHQUFHO0VBQzdCLElBQUksQ0FBQyxZQUFZLE1BQU0sTUFBTSxLQUFLLEdBQUc7SUFDbkMsT0FBTyxRQUFRO0VBQ2pCO0VBQ0EsSUFBSTtFQUNKLEtBQUssTUFBTSxRQUFRLE1BQU87SUFDeEIsTUFBTSxPQUFPO0lBQ2IsSUFBSSxLQUFLLE1BQU0sR0FBRyxHQUFHO01BQ25CLElBQUksQ0FBQyxRQUFRLFNBQVM7V0FDakIsVUFBVSxHQUFHLFlBQVksTUFBTTtJQUN0QztFQUNGO0VBQ0EsSUFBSSxDQUFDLFFBQVEsT0FBTztFQUNwQixPQUFPLGNBQWMsUUFBUTtJQUFFO0VBQVM7QUFDMUMifQ==
// denoCacheMetadata=5974174259381854736,12964759596976764390