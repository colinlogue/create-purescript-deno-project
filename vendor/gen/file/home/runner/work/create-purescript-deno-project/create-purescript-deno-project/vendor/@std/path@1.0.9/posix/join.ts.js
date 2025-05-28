// Copyright 2018-2025 the Deno authors. MIT license.
// This module is browser compatible.
import { assertPath } from "../_common/assert_path.ts";
import { fromFileUrl } from "./from_file_url.ts";
import { normalize } from "./normalize.ts";
/**
 * Join all given a sequence of `paths`,then normalizes the resulting path.
 *
 * @example Usage
 * ```ts
 * import { join } from "@std/path/posix/join";
 * import { assertEquals } from "@std/assert";
 *
 * assertEquals(join("/foo", "bar", "baz/asdf", "quux", ".."), "/foo/bar/baz/asdf");
 * assertEquals(join(new URL("file:///foo"), "bar", "baz/asdf", "quux", ".."), "/foo/bar/baz/asdf");
 * ```
 *
 * @example Working with URLs
 * ```ts
 * import { join } from "@std/path/posix/join";
 * import { assertEquals } from "@std/assert";
 *
 * const url = new URL("https://deno.land");
 * url.pathname = join("std", "path", "mod.ts");
 * assertEquals(url.href, "https://deno.land/std/path/mod.ts");
 *
 * url.pathname = join("//std", "path/", "/mod.ts");
 * assertEquals(url.href, "https://deno.land/std/path/mod.ts");
 * ```
 *
 * @param path The path to join. This can be string or file URL.
 * @param paths The paths to join.
 * @returns The joined path.
 */ export function join(path, ...paths) {
  if (path === undefined) return ".";
  if (path instanceof URL) {
    path = fromFileUrl(path);
  }
  paths = path ? [
    path,
    ...paths
  ] : paths;
  paths.forEach((path)=>assertPath(path));
  const joined = paths.filter((path)=>path.length > 0).join("/");
  return joined === "" ? "." : normalize(joined);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGU6Ly8vaG9tZS9ydW5uZXIvd29yay9jcmVhdGUtcHVyZXNjcmlwdC1kZW5vLXByb2plY3QvY3JlYXRlLXB1cmVzY3JpcHQtZGVuby1wcm9qZWN0L3ZlbmRvci9Ac3RkL3BhdGhAMS4wLjkvcG9zaXgvam9pbi50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgMjAxOC0yMDI1IHRoZSBEZW5vIGF1dGhvcnMuIE1JVCBsaWNlbnNlLlxuLy8gVGhpcyBtb2R1bGUgaXMgYnJvd3NlciBjb21wYXRpYmxlLlxuXG5pbXBvcnQgeyBhc3NlcnRQYXRoIH0gZnJvbSBcIi4uL19jb21tb24vYXNzZXJ0X3BhdGgudHNcIjtcbmltcG9ydCB7IGZyb21GaWxlVXJsIH0gZnJvbSBcIi4vZnJvbV9maWxlX3VybC50c1wiO1xuaW1wb3J0IHsgbm9ybWFsaXplIH0gZnJvbSBcIi4vbm9ybWFsaXplLnRzXCI7XG5cbi8qKlxuICogSm9pbiBhbGwgZ2l2ZW4gYSBzZXF1ZW5jZSBvZiBgcGF0aHNgLHRoZW4gbm9ybWFsaXplcyB0aGUgcmVzdWx0aW5nIHBhdGguXG4gKlxuICogQGV4YW1wbGUgVXNhZ2VcbiAqIGBgYHRzXG4gKiBpbXBvcnQgeyBqb2luIH0gZnJvbSBcIkBzdGQvcGF0aC9wb3NpeC9qb2luXCI7XG4gKiBpbXBvcnQgeyBhc3NlcnRFcXVhbHMgfSBmcm9tIFwiQHN0ZC9hc3NlcnRcIjtcbiAqXG4gKiBhc3NlcnRFcXVhbHMoam9pbihcIi9mb29cIiwgXCJiYXJcIiwgXCJiYXovYXNkZlwiLCBcInF1dXhcIiwgXCIuLlwiKSwgXCIvZm9vL2Jhci9iYXovYXNkZlwiKTtcbiAqIGFzc2VydEVxdWFscyhqb2luKG5ldyBVUkwoXCJmaWxlOi8vL2Zvb1wiKSwgXCJiYXJcIiwgXCJiYXovYXNkZlwiLCBcInF1dXhcIiwgXCIuLlwiKSwgXCIvZm9vL2Jhci9iYXovYXNkZlwiKTtcbiAqIGBgYFxuICpcbiAqIEBleGFtcGxlIFdvcmtpbmcgd2l0aCBVUkxzXG4gKiBgYGB0c1xuICogaW1wb3J0IHsgam9pbiB9IGZyb20gXCJAc3RkL3BhdGgvcG9zaXgvam9pblwiO1xuICogaW1wb3J0IHsgYXNzZXJ0RXF1YWxzIH0gZnJvbSBcIkBzdGQvYXNzZXJ0XCI7XG4gKlxuICogY29uc3QgdXJsID0gbmV3IFVSTChcImh0dHBzOi8vZGVuby5sYW5kXCIpO1xuICogdXJsLnBhdGhuYW1lID0gam9pbihcInN0ZFwiLCBcInBhdGhcIiwgXCJtb2QudHNcIik7XG4gKiBhc3NlcnRFcXVhbHModXJsLmhyZWYsIFwiaHR0cHM6Ly9kZW5vLmxhbmQvc3RkL3BhdGgvbW9kLnRzXCIpO1xuICpcbiAqIHVybC5wYXRobmFtZSA9IGpvaW4oXCIvL3N0ZFwiLCBcInBhdGgvXCIsIFwiL21vZC50c1wiKTtcbiAqIGFzc2VydEVxdWFscyh1cmwuaHJlZiwgXCJodHRwczovL2Rlbm8ubGFuZC9zdGQvcGF0aC9tb2QudHNcIik7XG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0gcGF0aCBUaGUgcGF0aCB0byBqb2luLiBUaGlzIGNhbiBiZSBzdHJpbmcgb3IgZmlsZSBVUkwuXG4gKiBAcGFyYW0gcGF0aHMgVGhlIHBhdGhzIHRvIGpvaW4uXG4gKiBAcmV0dXJucyBUaGUgam9pbmVkIHBhdGguXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBqb2luKHBhdGg/OiBVUkwgfCBzdHJpbmcsIC4uLnBhdGhzOiBzdHJpbmdbXSk6IHN0cmluZyB7XG4gIGlmIChwYXRoID09PSB1bmRlZmluZWQpIHJldHVybiBcIi5cIjtcbiAgaWYgKHBhdGggaW5zdGFuY2VvZiBVUkwpIHtcbiAgICBwYXRoID0gZnJvbUZpbGVVcmwocGF0aCk7XG4gIH1cbiAgcGF0aHMgPSBwYXRoID8gW3BhdGgsIC4uLnBhdGhzXSA6IHBhdGhzO1xuICBwYXRocy5mb3JFYWNoKChwYXRoKSA9PiBhc3NlcnRQYXRoKHBhdGgpKTtcbiAgY29uc3Qgam9pbmVkID0gcGF0aHMuZmlsdGVyKChwYXRoKSA9PiBwYXRoLmxlbmd0aCA+IDApLmpvaW4oXCIvXCIpO1xuICByZXR1cm4gam9pbmVkID09PSBcIlwiID8gXCIuXCIgOiBub3JtYWxpemUoam9pbmVkKTtcbn1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxxREFBcUQ7QUFDckQscUNBQXFDO0FBRXJDLFNBQVMsVUFBVSxRQUFRLDRCQUE0QjtBQUN2RCxTQUFTLFdBQVcsUUFBUSxxQkFBcUI7QUFDakQsU0FBUyxTQUFTLFFBQVEsaUJBQWlCO0FBRTNDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0NBNEJDLEdBQ0QsT0FBTyxTQUFTLEtBQUssSUFBbUIsRUFBRSxHQUFHLEtBQWU7RUFDMUQsSUFBSSxTQUFTLFdBQVcsT0FBTztFQUMvQixJQUFJLGdCQUFnQixLQUFLO0lBQ3ZCLE9BQU8sWUFBWTtFQUNyQjtFQUNBLFFBQVEsT0FBTztJQUFDO09BQVM7R0FBTSxHQUFHO0VBQ2xDLE1BQU0sT0FBTyxDQUFDLENBQUMsT0FBUyxXQUFXO0VBQ25DLE1BQU0sU0FBUyxNQUFNLE1BQU0sQ0FBQyxDQUFDLE9BQVMsS0FBSyxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUM7RUFDNUQsT0FBTyxXQUFXLEtBQUssTUFBTSxVQUFVO0FBQ3pDIn0=
// denoCacheMetadata=1546347912763415064,13198934017233179931