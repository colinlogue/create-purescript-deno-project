// Copyright 2018-2025 the Deno authors. MIT license.
// This module is browser compatible.
import { assertArg } from "../_common/normalize.ts";
import { normalizeString } from "../_common/normalize_string.ts";
import { isPosixPathSeparator } from "./_util.ts";
import { fromFileUrl } from "./from_file_url.ts";
/**
 * Normalize the `path`, resolving `'..'` and `'.'` segments.
 * Note that resolving these segments does not necessarily mean that all will be eliminated.
 * A `'..'` at the top-level will be preserved, and an empty path is canonically `'.'`.
 *
 * @example Usage
 * ```ts
 * import { normalize } from "@std/path/posix/normalize";
 * import { assertEquals } from "@std/assert";
 *
 * assertEquals(normalize("/foo/bar//baz/asdf/quux/.."), "/foo/bar/baz/asdf");
 * assertEquals(normalize(new URL("file:///foo/bar//baz/asdf/quux/..")), "/foo/bar/baz/asdf/");
 * ```
 *
 * @example Working with URLs
 *
 * Note: This function will remove the double slashes from a URL's scheme.
 * Hence, do not pass a full URL to this function. Instead, pass the pathname of
 * the URL.
 *
 * ```ts
 * import { normalize } from "@std/path/posix/normalize";
 * import { assertEquals } from "@std/assert";
 *
 * const url = new URL("https://deno.land");
 * url.pathname = normalize("//std//assert//.//mod.ts");
 * assertEquals(url.href, "https://deno.land/std/assert/mod.ts");
 *
 * url.pathname = normalize("std/assert/../async/retry.ts");
 * assertEquals(url.href, "https://deno.land/std/async/retry.ts");
 * ```
 *
 * @param path The path to normalize.
 * @returns The normalized path.
 */ export function normalize(path) {
  if (path instanceof URL) {
    path = fromFileUrl(path);
  }
  assertArg(path);
  const isAbsolute = isPosixPathSeparator(path.charCodeAt(0));
  const trailingSeparator = isPosixPathSeparator(path.charCodeAt(path.length - 1));
  // Normalize the path
  path = normalizeString(path, !isAbsolute, "/", isPosixPathSeparator);
  if (path.length === 0 && !isAbsolute) path = ".";
  if (path.length > 0 && trailingSeparator) path += "/";
  if (isAbsolute) return `/${path}`;
  return path;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGU6Ly8vaG9tZS9ydW5uZXIvd29yay9jcmVhdGUtcHVyZXNjcmlwdC1kZW5vLXByb2plY3QvY3JlYXRlLXB1cmVzY3JpcHQtZGVuby1wcm9qZWN0L3ZlbmRvci9Ac3RkL3BhdGhAMS4wLjkvcG9zaXgvbm9ybWFsaXplLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAyMDE4LTIwMjUgdGhlIERlbm8gYXV0aG9ycy4gTUlUIGxpY2Vuc2UuXG4vLyBUaGlzIG1vZHVsZSBpcyBicm93c2VyIGNvbXBhdGlibGUuXG5cbmltcG9ydCB7IGFzc2VydEFyZyB9IGZyb20gXCIuLi9fY29tbW9uL25vcm1hbGl6ZS50c1wiO1xuaW1wb3J0IHsgbm9ybWFsaXplU3RyaW5nIH0gZnJvbSBcIi4uL19jb21tb24vbm9ybWFsaXplX3N0cmluZy50c1wiO1xuaW1wb3J0IHsgaXNQb3NpeFBhdGhTZXBhcmF0b3IgfSBmcm9tIFwiLi9fdXRpbC50c1wiO1xuaW1wb3J0IHsgZnJvbUZpbGVVcmwgfSBmcm9tIFwiLi9mcm9tX2ZpbGVfdXJsLnRzXCI7XG5cbi8qKlxuICogTm9ybWFsaXplIHRoZSBgcGF0aGAsIHJlc29sdmluZyBgJy4uJ2AgYW5kIGAnLidgIHNlZ21lbnRzLlxuICogTm90ZSB0aGF0IHJlc29sdmluZyB0aGVzZSBzZWdtZW50cyBkb2VzIG5vdCBuZWNlc3NhcmlseSBtZWFuIHRoYXQgYWxsIHdpbGwgYmUgZWxpbWluYXRlZC5cbiAqIEEgYCcuLidgIGF0IHRoZSB0b3AtbGV2ZWwgd2lsbCBiZSBwcmVzZXJ2ZWQsIGFuZCBhbiBlbXB0eSBwYXRoIGlzIGNhbm9uaWNhbGx5IGAnLidgLlxuICpcbiAqIEBleGFtcGxlIFVzYWdlXG4gKiBgYGB0c1xuICogaW1wb3J0IHsgbm9ybWFsaXplIH0gZnJvbSBcIkBzdGQvcGF0aC9wb3NpeC9ub3JtYWxpemVcIjtcbiAqIGltcG9ydCB7IGFzc2VydEVxdWFscyB9IGZyb20gXCJAc3RkL2Fzc2VydFwiO1xuICpcbiAqIGFzc2VydEVxdWFscyhub3JtYWxpemUoXCIvZm9vL2Jhci8vYmF6L2FzZGYvcXV1eC8uLlwiKSwgXCIvZm9vL2Jhci9iYXovYXNkZlwiKTtcbiAqIGFzc2VydEVxdWFscyhub3JtYWxpemUobmV3IFVSTChcImZpbGU6Ly8vZm9vL2Jhci8vYmF6L2FzZGYvcXV1eC8uLlwiKSksIFwiL2Zvby9iYXIvYmF6L2FzZGYvXCIpO1xuICogYGBgXG4gKlxuICogQGV4YW1wbGUgV29ya2luZyB3aXRoIFVSTHNcbiAqXG4gKiBOb3RlOiBUaGlzIGZ1bmN0aW9uIHdpbGwgcmVtb3ZlIHRoZSBkb3VibGUgc2xhc2hlcyBmcm9tIGEgVVJMJ3Mgc2NoZW1lLlxuICogSGVuY2UsIGRvIG5vdCBwYXNzIGEgZnVsbCBVUkwgdG8gdGhpcyBmdW5jdGlvbi4gSW5zdGVhZCwgcGFzcyB0aGUgcGF0aG5hbWUgb2ZcbiAqIHRoZSBVUkwuXG4gKlxuICogYGBgdHNcbiAqIGltcG9ydCB7IG5vcm1hbGl6ZSB9IGZyb20gXCJAc3RkL3BhdGgvcG9zaXgvbm9ybWFsaXplXCI7XG4gKiBpbXBvcnQgeyBhc3NlcnRFcXVhbHMgfSBmcm9tIFwiQHN0ZC9hc3NlcnRcIjtcbiAqXG4gKiBjb25zdCB1cmwgPSBuZXcgVVJMKFwiaHR0cHM6Ly9kZW5vLmxhbmRcIik7XG4gKiB1cmwucGF0aG5hbWUgPSBub3JtYWxpemUoXCIvL3N0ZC8vYXNzZXJ0Ly8uLy9tb2QudHNcIik7XG4gKiBhc3NlcnRFcXVhbHModXJsLmhyZWYsIFwiaHR0cHM6Ly9kZW5vLmxhbmQvc3RkL2Fzc2VydC9tb2QudHNcIik7XG4gKlxuICogdXJsLnBhdGhuYW1lID0gbm9ybWFsaXplKFwic3RkL2Fzc2VydC8uLi9hc3luYy9yZXRyeS50c1wiKTtcbiAqIGFzc2VydEVxdWFscyh1cmwuaHJlZiwgXCJodHRwczovL2Rlbm8ubGFuZC9zdGQvYXN5bmMvcmV0cnkudHNcIik7XG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0gcGF0aCBUaGUgcGF0aCB0byBub3JtYWxpemUuXG4gKiBAcmV0dXJucyBUaGUgbm9ybWFsaXplZCBwYXRoLlxuICovXG5leHBvcnQgZnVuY3Rpb24gbm9ybWFsaXplKHBhdGg6IHN0cmluZyB8IFVSTCk6IHN0cmluZyB7XG4gIGlmIChwYXRoIGluc3RhbmNlb2YgVVJMKSB7XG4gICAgcGF0aCA9IGZyb21GaWxlVXJsKHBhdGgpO1xuICB9XG4gIGFzc2VydEFyZyhwYXRoKTtcblxuICBjb25zdCBpc0Fic29sdXRlID0gaXNQb3NpeFBhdGhTZXBhcmF0b3IocGF0aC5jaGFyQ29kZUF0KDApKTtcbiAgY29uc3QgdHJhaWxpbmdTZXBhcmF0b3IgPSBpc1Bvc2l4UGF0aFNlcGFyYXRvcihcbiAgICBwYXRoLmNoYXJDb2RlQXQocGF0aC5sZW5ndGggLSAxKSxcbiAgKTtcblxuICAvLyBOb3JtYWxpemUgdGhlIHBhdGhcbiAgcGF0aCA9IG5vcm1hbGl6ZVN0cmluZyhwYXRoLCAhaXNBYnNvbHV0ZSwgXCIvXCIsIGlzUG9zaXhQYXRoU2VwYXJhdG9yKTtcblxuICBpZiAocGF0aC5sZW5ndGggPT09IDAgJiYgIWlzQWJzb2x1dGUpIHBhdGggPSBcIi5cIjtcbiAgaWYgKHBhdGgubGVuZ3RoID4gMCAmJiB0cmFpbGluZ1NlcGFyYXRvcikgcGF0aCArPSBcIi9cIjtcblxuICBpZiAoaXNBYnNvbHV0ZSkgcmV0dXJuIGAvJHtwYXRofWA7XG4gIHJldHVybiBwYXRoO1xufVxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLHFEQUFxRDtBQUNyRCxxQ0FBcUM7QUFFckMsU0FBUyxTQUFTLFFBQVEsMEJBQTBCO0FBQ3BELFNBQVMsZUFBZSxRQUFRLGlDQUFpQztBQUNqRSxTQUFTLG9CQUFvQixRQUFRLGFBQWE7QUFDbEQsU0FBUyxXQUFXLFFBQVEscUJBQXFCO0FBRWpEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0NBa0NDLEdBQ0QsT0FBTyxTQUFTLFVBQVUsSUFBa0I7RUFDMUMsSUFBSSxnQkFBZ0IsS0FBSztJQUN2QixPQUFPLFlBQVk7RUFDckI7RUFDQSxVQUFVO0VBRVYsTUFBTSxhQUFhLHFCQUFxQixLQUFLLFVBQVUsQ0FBQztFQUN4RCxNQUFNLG9CQUFvQixxQkFDeEIsS0FBSyxVQUFVLENBQUMsS0FBSyxNQUFNLEdBQUc7RUFHaEMscUJBQXFCO0VBQ3JCLE9BQU8sZ0JBQWdCLE1BQU0sQ0FBQyxZQUFZLEtBQUs7RUFFL0MsSUFBSSxLQUFLLE1BQU0sS0FBSyxLQUFLLENBQUMsWUFBWSxPQUFPO0VBQzdDLElBQUksS0FBSyxNQUFNLEdBQUcsS0FBSyxtQkFBbUIsUUFBUTtFQUVsRCxJQUFJLFlBQVksT0FBTyxDQUFDLENBQUMsRUFBRSxNQUFNO0VBQ2pDLE9BQU87QUFDVCJ9
// denoCacheMetadata=17677915764767945591,4150349980759903859