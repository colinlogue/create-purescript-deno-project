// Copyright 2018-2025 the Deno authors. MIT license.
// This module is browser compatible.
import { common as _common } from "./_common/common.ts";
import { SEPARATOR } from "./constants.ts";
/**
 * Determines the common path from a set of paths for the given OS.
 *
 * @param paths Paths to search for common path.
 * @returns The common path.
 *
 * @example Usage
 * ```ts
 * import { common } from "@std/path/common";
 * import { assertEquals } from "@std/assert";
 *
 * if (Deno.build.os === "windows") {
 *   const path = common([
 *     "C:\\deno\\std\\path\\mod.ts",
 *     "C:\\deno\\std\\fs\\mod.ts"
 *   ]);
 *   assertEquals(path, "C:\\deno\\std\\");
 * } else {
 *   const path = common([
 *     "./deno/std/path/mod.ts",
 *     "./deno/std/fs/mod.ts"
 *   ]);
 *   assertEquals(path, "./deno/std/");
 * }
 * ```
 */ export function common(paths) {
  return _common(paths, SEPARATOR);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGU6Ly8vaG9tZS9ydW5uZXIvd29yay9jcmVhdGUtcHVyZXNjcmlwdC1kZW5vLXByb2plY3QvY3JlYXRlLXB1cmVzY3JpcHQtZGVuby1wcm9qZWN0L3ZlbmRvci9Ac3RkL3BhdGhAMS4wLjkvY29tbW9uLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAyMDE4LTIwMjUgdGhlIERlbm8gYXV0aG9ycy4gTUlUIGxpY2Vuc2UuXG4vLyBUaGlzIG1vZHVsZSBpcyBicm93c2VyIGNvbXBhdGlibGUuXG5cbmltcG9ydCB7IGNvbW1vbiBhcyBfY29tbW9uIH0gZnJvbSBcIi4vX2NvbW1vbi9jb21tb24udHNcIjtcbmltcG9ydCB7IFNFUEFSQVRPUiB9IGZyb20gXCIuL2NvbnN0YW50cy50c1wiO1xuXG4vKipcbiAqIERldGVybWluZXMgdGhlIGNvbW1vbiBwYXRoIGZyb20gYSBzZXQgb2YgcGF0aHMgZm9yIHRoZSBnaXZlbiBPUy5cbiAqXG4gKiBAcGFyYW0gcGF0aHMgUGF0aHMgdG8gc2VhcmNoIGZvciBjb21tb24gcGF0aC5cbiAqIEByZXR1cm5zIFRoZSBjb21tb24gcGF0aC5cbiAqXG4gKiBAZXhhbXBsZSBVc2FnZVxuICogYGBgdHNcbiAqIGltcG9ydCB7IGNvbW1vbiB9IGZyb20gXCJAc3RkL3BhdGgvY29tbW9uXCI7XG4gKiBpbXBvcnQgeyBhc3NlcnRFcXVhbHMgfSBmcm9tIFwiQHN0ZC9hc3NlcnRcIjtcbiAqXG4gKiBpZiAoRGVuby5idWlsZC5vcyA9PT0gXCJ3aW5kb3dzXCIpIHtcbiAqICAgY29uc3QgcGF0aCA9IGNvbW1vbihbXG4gKiAgICAgXCJDOlxcXFxkZW5vXFxcXHN0ZFxcXFxwYXRoXFxcXG1vZC50c1wiLFxuICogICAgIFwiQzpcXFxcZGVub1xcXFxzdGRcXFxcZnNcXFxcbW9kLnRzXCJcbiAqICAgXSk7XG4gKiAgIGFzc2VydEVxdWFscyhwYXRoLCBcIkM6XFxcXGRlbm9cXFxcc3RkXFxcXFwiKTtcbiAqIH0gZWxzZSB7XG4gKiAgIGNvbnN0IHBhdGggPSBjb21tb24oW1xuICogICAgIFwiLi9kZW5vL3N0ZC9wYXRoL21vZC50c1wiLFxuICogICAgIFwiLi9kZW5vL3N0ZC9mcy9tb2QudHNcIlxuICogICBdKTtcbiAqICAgYXNzZXJ0RXF1YWxzKHBhdGgsIFwiLi9kZW5vL3N0ZC9cIik7XG4gKiB9XG4gKiBgYGBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNvbW1vbihwYXRoczogc3RyaW5nW10pOiBzdHJpbmcge1xuICByZXR1cm4gX2NvbW1vbihwYXRocywgU0VQQVJBVE9SKTtcbn1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxxREFBcUQ7QUFDckQscUNBQXFDO0FBRXJDLFNBQVMsVUFBVSxPQUFPLFFBQVEsc0JBQXNCO0FBQ3hELFNBQVMsU0FBUyxRQUFRLGlCQUFpQjtBQUUzQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztDQXlCQyxHQUNELE9BQU8sU0FBUyxPQUFPLEtBQWU7RUFDcEMsT0FBTyxRQUFRLE9BQU87QUFDeEIifQ==
// denoCacheMetadata=14994881841310916102,17791527298886066108