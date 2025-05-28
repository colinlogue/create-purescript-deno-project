// Copyright 2018-2025 the Deno authors. MIT license.
// This module is browser compatible.
import { assertArg } from "../_common/dirname.ts";
import { stripTrailingSeparators } from "../_common/strip_trailing_separators.ts";
import { isPosixPathSeparator } from "./_util.ts";
import { fromFileUrl } from "./from_file_url.ts";
/**
 * Return the directory path of a `path`.
 *
 * @example Usage
 * ```ts
 * import { dirname } from "@std/path/posix/dirname";
 * import { assertEquals } from "@std/assert";
 *
 * assertEquals(dirname("/home/user/Documents/"), "/home/user");
 * assertEquals(dirname("/home/user/Documents/image.png"), "/home/user/Documents");
 * assertEquals(dirname("https://deno.land/std/path/mod.ts"), "https://deno.land/std/path");
 * assertEquals(dirname(new URL("file:///home/user/Documents/image.png")), "/home/user/Documents");
 * ```
 *
 * @example Working with URLs
 *
 * ```ts
 * import { dirname } from "@std/path/posix/dirname";
 * import { assertEquals } from "@std/assert";
 *
 * assertEquals(dirname("https://deno.land/std/path/mod.ts"), "https://deno.land/std/path");
 * assertEquals(dirname("https://deno.land/std/path/mod.ts?a=b"), "https://deno.land/std/path");
 * assertEquals(dirname("https://deno.land/std/path/mod.ts#header"), "https://deno.land/std/path");
 * ```
 *
 * @param path The path to get the directory from.
 * @returns The directory path.
 */ export function dirname(path) {
  if (path instanceof URL) {
    path = fromFileUrl(path);
  }
  assertArg(path);
  let end = -1;
  let matchedNonSeparator = false;
  for(let i = path.length - 1; i >= 1; --i){
    if (isPosixPathSeparator(path.charCodeAt(i))) {
      if (matchedNonSeparator) {
        end = i;
        break;
      }
    } else {
      matchedNonSeparator = true;
    }
  }
  // No matches. Fallback based on provided path:
  //
  // - leading slashes paths
  //     "/foo" => "/"
  //     "///foo" => "/"
  // - no slash path
  //     "foo" => "."
  if (end === -1) {
    return isPosixPathSeparator(path.charCodeAt(0)) ? "/" : ".";
  }
  return stripTrailingSeparators(path.slice(0, end), isPosixPathSeparator);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGU6Ly8vaG9tZS9ydW5uZXIvd29yay9jcmVhdGUtcHVyZXNjcmlwdC1kZW5vLXByb2plY3QvY3JlYXRlLXB1cmVzY3JpcHQtZGVuby1wcm9qZWN0L3ZlbmRvci9Ac3RkL3BhdGhAMS4wLjkvcG9zaXgvZGlybmFtZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgMjAxOC0yMDI1IHRoZSBEZW5vIGF1dGhvcnMuIE1JVCBsaWNlbnNlLlxuLy8gVGhpcyBtb2R1bGUgaXMgYnJvd3NlciBjb21wYXRpYmxlLlxuXG5pbXBvcnQgeyBhc3NlcnRBcmcgfSBmcm9tIFwiLi4vX2NvbW1vbi9kaXJuYW1lLnRzXCI7XG5pbXBvcnQgeyBzdHJpcFRyYWlsaW5nU2VwYXJhdG9ycyB9IGZyb20gXCIuLi9fY29tbW9uL3N0cmlwX3RyYWlsaW5nX3NlcGFyYXRvcnMudHNcIjtcbmltcG9ydCB7IGlzUG9zaXhQYXRoU2VwYXJhdG9yIH0gZnJvbSBcIi4vX3V0aWwudHNcIjtcbmltcG9ydCB7IGZyb21GaWxlVXJsIH0gZnJvbSBcIi4vZnJvbV9maWxlX3VybC50c1wiO1xuXG4vKipcbiAqIFJldHVybiB0aGUgZGlyZWN0b3J5IHBhdGggb2YgYSBgcGF0aGAuXG4gKlxuICogQGV4YW1wbGUgVXNhZ2VcbiAqIGBgYHRzXG4gKiBpbXBvcnQgeyBkaXJuYW1lIH0gZnJvbSBcIkBzdGQvcGF0aC9wb3NpeC9kaXJuYW1lXCI7XG4gKiBpbXBvcnQgeyBhc3NlcnRFcXVhbHMgfSBmcm9tIFwiQHN0ZC9hc3NlcnRcIjtcbiAqXG4gKiBhc3NlcnRFcXVhbHMoZGlybmFtZShcIi9ob21lL3VzZXIvRG9jdW1lbnRzL1wiKSwgXCIvaG9tZS91c2VyXCIpO1xuICogYXNzZXJ0RXF1YWxzKGRpcm5hbWUoXCIvaG9tZS91c2VyL0RvY3VtZW50cy9pbWFnZS5wbmdcIiksIFwiL2hvbWUvdXNlci9Eb2N1bWVudHNcIik7XG4gKiBhc3NlcnRFcXVhbHMoZGlybmFtZShcImh0dHBzOi8vZGVuby5sYW5kL3N0ZC9wYXRoL21vZC50c1wiKSwgXCJodHRwczovL2Rlbm8ubGFuZC9zdGQvcGF0aFwiKTtcbiAqIGFzc2VydEVxdWFscyhkaXJuYW1lKG5ldyBVUkwoXCJmaWxlOi8vL2hvbWUvdXNlci9Eb2N1bWVudHMvaW1hZ2UucG5nXCIpKSwgXCIvaG9tZS91c2VyL0RvY3VtZW50c1wiKTtcbiAqIGBgYFxuICpcbiAqIEBleGFtcGxlIFdvcmtpbmcgd2l0aCBVUkxzXG4gKlxuICogYGBgdHNcbiAqIGltcG9ydCB7IGRpcm5hbWUgfSBmcm9tIFwiQHN0ZC9wYXRoL3Bvc2l4L2Rpcm5hbWVcIjtcbiAqIGltcG9ydCB7IGFzc2VydEVxdWFscyB9IGZyb20gXCJAc3RkL2Fzc2VydFwiO1xuICpcbiAqIGFzc2VydEVxdWFscyhkaXJuYW1lKFwiaHR0cHM6Ly9kZW5vLmxhbmQvc3RkL3BhdGgvbW9kLnRzXCIpLCBcImh0dHBzOi8vZGVuby5sYW5kL3N0ZC9wYXRoXCIpO1xuICogYXNzZXJ0RXF1YWxzKGRpcm5hbWUoXCJodHRwczovL2Rlbm8ubGFuZC9zdGQvcGF0aC9tb2QudHM/YT1iXCIpLCBcImh0dHBzOi8vZGVuby5sYW5kL3N0ZC9wYXRoXCIpO1xuICogYXNzZXJ0RXF1YWxzKGRpcm5hbWUoXCJodHRwczovL2Rlbm8ubGFuZC9zdGQvcGF0aC9tb2QudHMjaGVhZGVyXCIpLCBcImh0dHBzOi8vZGVuby5sYW5kL3N0ZC9wYXRoXCIpO1xuICogYGBgXG4gKlxuICogQHBhcmFtIHBhdGggVGhlIHBhdGggdG8gZ2V0IHRoZSBkaXJlY3RvcnkgZnJvbS5cbiAqIEByZXR1cm5zIFRoZSBkaXJlY3RvcnkgcGF0aC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRpcm5hbWUocGF0aDogc3RyaW5nIHwgVVJMKTogc3RyaW5nIHtcbiAgaWYgKHBhdGggaW5zdGFuY2VvZiBVUkwpIHtcbiAgICBwYXRoID0gZnJvbUZpbGVVcmwocGF0aCk7XG4gIH1cbiAgYXNzZXJ0QXJnKHBhdGgpO1xuXG4gIGxldCBlbmQgPSAtMTtcbiAgbGV0IG1hdGNoZWROb25TZXBhcmF0b3IgPSBmYWxzZTtcblxuICBmb3IgKGxldCBpID0gcGF0aC5sZW5ndGggLSAxOyBpID49IDE7IC0taSkge1xuICAgIGlmIChpc1Bvc2l4UGF0aFNlcGFyYXRvcihwYXRoLmNoYXJDb2RlQXQoaSkpKSB7XG4gICAgICBpZiAobWF0Y2hlZE5vblNlcGFyYXRvcikge1xuICAgICAgICBlbmQgPSBpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgbWF0Y2hlZE5vblNlcGFyYXRvciA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgLy8gTm8gbWF0Y2hlcy4gRmFsbGJhY2sgYmFzZWQgb24gcHJvdmlkZWQgcGF0aDpcbiAgLy9cbiAgLy8gLSBsZWFkaW5nIHNsYXNoZXMgcGF0aHNcbiAgLy8gICAgIFwiL2Zvb1wiID0+IFwiL1wiXG4gIC8vICAgICBcIi8vL2Zvb1wiID0+IFwiL1wiXG4gIC8vIC0gbm8gc2xhc2ggcGF0aFxuICAvLyAgICAgXCJmb29cIiA9PiBcIi5cIlxuICBpZiAoZW5kID09PSAtMSkge1xuICAgIHJldHVybiBpc1Bvc2l4UGF0aFNlcGFyYXRvcihwYXRoLmNoYXJDb2RlQXQoMCkpID8gXCIvXCIgOiBcIi5cIjtcbiAgfVxuXG4gIHJldHVybiBzdHJpcFRyYWlsaW5nU2VwYXJhdG9ycyhcbiAgICBwYXRoLnNsaWNlKDAsIGVuZCksXG4gICAgaXNQb3NpeFBhdGhTZXBhcmF0b3IsXG4gICk7XG59XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEscURBQXFEO0FBQ3JELHFDQUFxQztBQUVyQyxTQUFTLFNBQVMsUUFBUSx3QkFBd0I7QUFDbEQsU0FBUyx1QkFBdUIsUUFBUSwwQ0FBMEM7QUFDbEYsU0FBUyxvQkFBb0IsUUFBUSxhQUFhO0FBQ2xELFNBQVMsV0FBVyxRQUFRLHFCQUFxQjtBQUVqRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0NBMkJDLEdBQ0QsT0FBTyxTQUFTLFFBQVEsSUFBa0I7RUFDeEMsSUFBSSxnQkFBZ0IsS0FBSztJQUN2QixPQUFPLFlBQVk7RUFDckI7RUFDQSxVQUFVO0VBRVYsSUFBSSxNQUFNLENBQUM7RUFDWCxJQUFJLHNCQUFzQjtFQUUxQixJQUFLLElBQUksSUFBSSxLQUFLLE1BQU0sR0FBRyxHQUFHLEtBQUssR0FBRyxFQUFFLEVBQUc7SUFDekMsSUFBSSxxQkFBcUIsS0FBSyxVQUFVLENBQUMsS0FBSztNQUM1QyxJQUFJLHFCQUFxQjtRQUN2QixNQUFNO1FBQ047TUFDRjtJQUNGLE9BQU87TUFDTCxzQkFBc0I7SUFDeEI7RUFDRjtFQUVBLCtDQUErQztFQUMvQyxFQUFFO0VBQ0YsMEJBQTBCO0VBQzFCLG9CQUFvQjtFQUNwQixzQkFBc0I7RUFDdEIsa0JBQWtCO0VBQ2xCLG1CQUFtQjtFQUNuQixJQUFJLFFBQVEsQ0FBQyxHQUFHO0lBQ2QsT0FBTyxxQkFBcUIsS0FBSyxVQUFVLENBQUMsTUFBTSxNQUFNO0VBQzFEO0VBRUEsT0FBTyx3QkFDTCxLQUFLLEtBQUssQ0FBQyxHQUFHLE1BQ2Q7QUFFSiJ9
// denoCacheMetadata=18156425882542352667,3852317194583544588