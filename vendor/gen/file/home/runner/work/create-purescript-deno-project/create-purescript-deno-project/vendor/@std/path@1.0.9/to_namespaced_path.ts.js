// Copyright 2018-2025 the Deno authors. MIT license.
// This module is browser compatible.
import { isWindows } from "./_os.ts";
import { toNamespacedPath as posixToNamespacedPath } from "./posix/to_namespaced_path.ts";
import { toNamespacedPath as windowsToNamespacedPath } from "./windows/to_namespaced_path.ts";
/**
 * Resolves path to a namespace path.  This is a no-op on
 * non-windows systems.
 *
 * @example Usage
 * ```ts
 * import { toNamespacedPath } from "@std/path/to-namespaced-path";
 * import { assertEquals } from "@std/assert";
 *
 * if (Deno.build.os === "windows") {
 *   assertEquals(toNamespacedPath("C:\\foo\\bar"), "\\\\?\\C:\\foo\\bar");
 * } else {
 *   assertEquals(toNamespacedPath("/foo/bar"), "/foo/bar");
 * }
 * ```
 *
 * @param path Path to resolve to namespace.
 * @returns The resolved namespace path.
 */ export function toNamespacedPath(path) {
  return isWindows ? windowsToNamespacedPath(path) : posixToNamespacedPath(path);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGU6Ly8vaG9tZS9ydW5uZXIvd29yay9jcmVhdGUtcHVyZXNjcmlwdC1kZW5vLXByb2plY3QvY3JlYXRlLXB1cmVzY3JpcHQtZGVuby1wcm9qZWN0L3ZlbmRvci9Ac3RkL3BhdGhAMS4wLjkvdG9fbmFtZXNwYWNlZF9wYXRoLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAyMDE4LTIwMjUgdGhlIERlbm8gYXV0aG9ycy4gTUlUIGxpY2Vuc2UuXG4vLyBUaGlzIG1vZHVsZSBpcyBicm93c2VyIGNvbXBhdGlibGUuXG5cbmltcG9ydCB7IGlzV2luZG93cyB9IGZyb20gXCIuL19vcy50c1wiO1xuaW1wb3J0IHsgdG9OYW1lc3BhY2VkUGF0aCBhcyBwb3NpeFRvTmFtZXNwYWNlZFBhdGggfSBmcm9tIFwiLi9wb3NpeC90b19uYW1lc3BhY2VkX3BhdGgudHNcIjtcbmltcG9ydCB7IHRvTmFtZXNwYWNlZFBhdGggYXMgd2luZG93c1RvTmFtZXNwYWNlZFBhdGggfSBmcm9tIFwiLi93aW5kb3dzL3RvX25hbWVzcGFjZWRfcGF0aC50c1wiO1xuXG4vKipcbiAqIFJlc29sdmVzIHBhdGggdG8gYSBuYW1lc3BhY2UgcGF0aC4gIFRoaXMgaXMgYSBuby1vcCBvblxuICogbm9uLXdpbmRvd3Mgc3lzdGVtcy5cbiAqXG4gKiBAZXhhbXBsZSBVc2FnZVxuICogYGBgdHNcbiAqIGltcG9ydCB7IHRvTmFtZXNwYWNlZFBhdGggfSBmcm9tIFwiQHN0ZC9wYXRoL3RvLW5hbWVzcGFjZWQtcGF0aFwiO1xuICogaW1wb3J0IHsgYXNzZXJ0RXF1YWxzIH0gZnJvbSBcIkBzdGQvYXNzZXJ0XCI7XG4gKlxuICogaWYgKERlbm8uYnVpbGQub3MgPT09IFwid2luZG93c1wiKSB7XG4gKiAgIGFzc2VydEVxdWFscyh0b05hbWVzcGFjZWRQYXRoKFwiQzpcXFxcZm9vXFxcXGJhclwiKSwgXCJcXFxcXFxcXD9cXFxcQzpcXFxcZm9vXFxcXGJhclwiKTtcbiAqIH0gZWxzZSB7XG4gKiAgIGFzc2VydEVxdWFscyh0b05hbWVzcGFjZWRQYXRoKFwiL2Zvby9iYXJcIiksIFwiL2Zvby9iYXJcIik7XG4gKiB9XG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0gcGF0aCBQYXRoIHRvIHJlc29sdmUgdG8gbmFtZXNwYWNlLlxuICogQHJldHVybnMgVGhlIHJlc29sdmVkIG5hbWVzcGFjZSBwYXRoLlxuICovXG5leHBvcnQgZnVuY3Rpb24gdG9OYW1lc3BhY2VkUGF0aChwYXRoOiBzdHJpbmcpOiBzdHJpbmcge1xuICByZXR1cm4gaXNXaW5kb3dzXG4gICAgPyB3aW5kb3dzVG9OYW1lc3BhY2VkUGF0aChwYXRoKVxuICAgIDogcG9zaXhUb05hbWVzcGFjZWRQYXRoKHBhdGgpO1xufVxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLHFEQUFxRDtBQUNyRCxxQ0FBcUM7QUFFckMsU0FBUyxTQUFTLFFBQVEsV0FBVztBQUNyQyxTQUFTLG9CQUFvQixxQkFBcUIsUUFBUSxnQ0FBZ0M7QUFDMUYsU0FBUyxvQkFBb0IsdUJBQXVCLFFBQVEsa0NBQWtDO0FBRTlGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Q0FrQkMsR0FDRCxPQUFPLFNBQVMsaUJBQWlCLElBQVk7RUFDM0MsT0FBTyxZQUNILHdCQUF3QixRQUN4QixzQkFBc0I7QUFDNUIifQ==
// denoCacheMetadata=10429067955438902331,3612931051665213058