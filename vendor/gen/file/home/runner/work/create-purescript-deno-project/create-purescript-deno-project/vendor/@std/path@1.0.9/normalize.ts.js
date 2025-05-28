// Copyright 2018-2025 the Deno authors. MIT license.
// This module is browser compatible.
import { isWindows } from "./_os.ts";
import { normalize as posixNormalize } from "./posix/normalize.ts";
import { normalize as windowsNormalize } from "./windows/normalize.ts";
/**
 * Normalize the path, resolving `'..'` and `'.'` segments.
 *
 * Note: Resolving these segments does not necessarily mean that all will be
 * eliminated. A `'..'` at the top-level will be preserved, and an empty path is
 * canonically `'.'`.
 *
 * @example Usage
 * ```ts
 * import { normalize } from "@std/path/normalize";
 * import { assertEquals } from "@std/assert";
 *
 * if (Deno.build.os === "windows") {
 *   assertEquals(normalize("C:\\foo\\bar\\..\\baz\\quux"), "C:\\foo\\baz\\quux");
 *   assertEquals(normalize(new URL("file:///C:/foo/bar/../baz/quux")), "C:\\foo\\baz\\quux");
 * } else {
 *   assertEquals(normalize("/foo/bar/../baz/quux"), "/foo/baz/quux");
 *   assertEquals(normalize(new URL("file:///foo/bar/../baz/quux")), "/foo/baz/quux");
 * }
 * ```
 *
 * @param path Path to be normalized
 * @returns The normalized path.
 */ export function normalize(path) {
  return isWindows ? windowsNormalize(path) : posixNormalize(path);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGU6Ly8vaG9tZS9ydW5uZXIvd29yay9jcmVhdGUtcHVyZXNjcmlwdC1kZW5vLXByb2plY3QvY3JlYXRlLXB1cmVzY3JpcHQtZGVuby1wcm9qZWN0L3ZlbmRvci9Ac3RkL3BhdGhAMS4wLjkvbm9ybWFsaXplLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAyMDE4LTIwMjUgdGhlIERlbm8gYXV0aG9ycy4gTUlUIGxpY2Vuc2UuXG4vLyBUaGlzIG1vZHVsZSBpcyBicm93c2VyIGNvbXBhdGlibGUuXG5cbmltcG9ydCB7IGlzV2luZG93cyB9IGZyb20gXCIuL19vcy50c1wiO1xuaW1wb3J0IHsgbm9ybWFsaXplIGFzIHBvc2l4Tm9ybWFsaXplIH0gZnJvbSBcIi4vcG9zaXgvbm9ybWFsaXplLnRzXCI7XG5pbXBvcnQgeyBub3JtYWxpemUgYXMgd2luZG93c05vcm1hbGl6ZSB9IGZyb20gXCIuL3dpbmRvd3Mvbm9ybWFsaXplLnRzXCI7XG4vKipcbiAqIE5vcm1hbGl6ZSB0aGUgcGF0aCwgcmVzb2x2aW5nIGAnLi4nYCBhbmQgYCcuJ2Agc2VnbWVudHMuXG4gKlxuICogTm90ZTogUmVzb2x2aW5nIHRoZXNlIHNlZ21lbnRzIGRvZXMgbm90IG5lY2Vzc2FyaWx5IG1lYW4gdGhhdCBhbGwgd2lsbCBiZVxuICogZWxpbWluYXRlZC4gQSBgJy4uJ2AgYXQgdGhlIHRvcC1sZXZlbCB3aWxsIGJlIHByZXNlcnZlZCwgYW5kIGFuIGVtcHR5IHBhdGggaXNcbiAqIGNhbm9uaWNhbGx5IGAnLidgLlxuICpcbiAqIEBleGFtcGxlIFVzYWdlXG4gKiBgYGB0c1xuICogaW1wb3J0IHsgbm9ybWFsaXplIH0gZnJvbSBcIkBzdGQvcGF0aC9ub3JtYWxpemVcIjtcbiAqIGltcG9ydCB7IGFzc2VydEVxdWFscyB9IGZyb20gXCJAc3RkL2Fzc2VydFwiO1xuICpcbiAqIGlmIChEZW5vLmJ1aWxkLm9zID09PSBcIndpbmRvd3NcIikge1xuICogICBhc3NlcnRFcXVhbHMobm9ybWFsaXplKFwiQzpcXFxcZm9vXFxcXGJhclxcXFwuLlxcXFxiYXpcXFxccXV1eFwiKSwgXCJDOlxcXFxmb29cXFxcYmF6XFxcXHF1dXhcIik7XG4gKiAgIGFzc2VydEVxdWFscyhub3JtYWxpemUobmV3IFVSTChcImZpbGU6Ly8vQzovZm9vL2Jhci8uLi9iYXovcXV1eFwiKSksIFwiQzpcXFxcZm9vXFxcXGJhelxcXFxxdXV4XCIpO1xuICogfSBlbHNlIHtcbiAqICAgYXNzZXJ0RXF1YWxzKG5vcm1hbGl6ZShcIi9mb28vYmFyLy4uL2Jhei9xdXV4XCIpLCBcIi9mb28vYmF6L3F1dXhcIik7XG4gKiAgIGFzc2VydEVxdWFscyhub3JtYWxpemUobmV3IFVSTChcImZpbGU6Ly8vZm9vL2Jhci8uLi9iYXovcXV1eFwiKSksIFwiL2Zvby9iYXovcXV1eFwiKTtcbiAqIH1cbiAqIGBgYFxuICpcbiAqIEBwYXJhbSBwYXRoIFBhdGggdG8gYmUgbm9ybWFsaXplZFxuICogQHJldHVybnMgVGhlIG5vcm1hbGl6ZWQgcGF0aC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG5vcm1hbGl6ZShwYXRoOiBzdHJpbmcgfCBVUkwpOiBzdHJpbmcge1xuICByZXR1cm4gaXNXaW5kb3dzID8gd2luZG93c05vcm1hbGl6ZShwYXRoKSA6IHBvc2l4Tm9ybWFsaXplKHBhdGgpO1xufVxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLHFEQUFxRDtBQUNyRCxxQ0FBcUM7QUFFckMsU0FBUyxTQUFTLFFBQVEsV0FBVztBQUNyQyxTQUFTLGFBQWEsY0FBYyxRQUFRLHVCQUF1QjtBQUNuRSxTQUFTLGFBQWEsZ0JBQWdCLFFBQVEseUJBQXlCO0FBQ3ZFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztDQXVCQyxHQUNELE9BQU8sU0FBUyxVQUFVLElBQWtCO0VBQzFDLE9BQU8sWUFBWSxpQkFBaUIsUUFBUSxlQUFlO0FBQzdEIn0=
// denoCacheMetadata=666537692023971887,14031415273536444748