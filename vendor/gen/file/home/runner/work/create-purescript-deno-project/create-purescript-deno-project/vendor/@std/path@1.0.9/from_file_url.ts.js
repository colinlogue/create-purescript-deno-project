// Copyright 2018-2025 the Deno authors. MIT license.
// This module is browser compatible.
import { isWindows } from "./_os.ts";
import { fromFileUrl as posixFromFileUrl } from "./posix/from_file_url.ts";
import { fromFileUrl as windowsFromFileUrl } from "./windows/from_file_url.ts";
/**
 * Converts a file URL to a path string.
 *
 * @example Usage
 * ```ts
 * import { fromFileUrl } from "@std/path/from-file-url";
 * import { assertEquals } from "@std/assert";
 *
 * if (Deno.build.os === "windows") {
 *   assertEquals(fromFileUrl("file:///home/foo"), "\\home\\foo");
 *   assertEquals(fromFileUrl("file:///C:/Users/foo"), "C:\\Users\\foo");
 *   assertEquals(fromFileUrl("file://localhost/home/foo"), "\\home\\foo");
 * } else {
 *   assertEquals(fromFileUrl("file:///home/foo"), "/home/foo");
 * }
 * ```
 *
 * @param url The file URL to convert to a path.
 * @returns The path string.
 */ export function fromFileUrl(url) {
  return isWindows ? windowsFromFileUrl(url) : posixFromFileUrl(url);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGU6Ly8vaG9tZS9ydW5uZXIvd29yay9jcmVhdGUtcHVyZXNjcmlwdC1kZW5vLXByb2plY3QvY3JlYXRlLXB1cmVzY3JpcHQtZGVuby1wcm9qZWN0L3ZlbmRvci9Ac3RkL3BhdGhAMS4wLjkvZnJvbV9maWxlX3VybC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgMjAxOC0yMDI1IHRoZSBEZW5vIGF1dGhvcnMuIE1JVCBsaWNlbnNlLlxuLy8gVGhpcyBtb2R1bGUgaXMgYnJvd3NlciBjb21wYXRpYmxlLlxuXG5pbXBvcnQgeyBpc1dpbmRvd3MgfSBmcm9tIFwiLi9fb3MudHNcIjtcbmltcG9ydCB7IGZyb21GaWxlVXJsIGFzIHBvc2l4RnJvbUZpbGVVcmwgfSBmcm9tIFwiLi9wb3NpeC9mcm9tX2ZpbGVfdXJsLnRzXCI7XG5pbXBvcnQgeyBmcm9tRmlsZVVybCBhcyB3aW5kb3dzRnJvbUZpbGVVcmwgfSBmcm9tIFwiLi93aW5kb3dzL2Zyb21fZmlsZV91cmwudHNcIjtcblxuLyoqXG4gKiBDb252ZXJ0cyBhIGZpbGUgVVJMIHRvIGEgcGF0aCBzdHJpbmcuXG4gKlxuICogQGV4YW1wbGUgVXNhZ2VcbiAqIGBgYHRzXG4gKiBpbXBvcnQgeyBmcm9tRmlsZVVybCB9IGZyb20gXCJAc3RkL3BhdGgvZnJvbS1maWxlLXVybFwiO1xuICogaW1wb3J0IHsgYXNzZXJ0RXF1YWxzIH0gZnJvbSBcIkBzdGQvYXNzZXJ0XCI7XG4gKlxuICogaWYgKERlbm8uYnVpbGQub3MgPT09IFwid2luZG93c1wiKSB7XG4gKiAgIGFzc2VydEVxdWFscyhmcm9tRmlsZVVybChcImZpbGU6Ly8vaG9tZS9mb29cIiksIFwiXFxcXGhvbWVcXFxcZm9vXCIpO1xuICogICBhc3NlcnRFcXVhbHMoZnJvbUZpbGVVcmwoXCJmaWxlOi8vL0M6L1VzZXJzL2Zvb1wiKSwgXCJDOlxcXFxVc2Vyc1xcXFxmb29cIik7XG4gKiAgIGFzc2VydEVxdWFscyhmcm9tRmlsZVVybChcImZpbGU6Ly9sb2NhbGhvc3QvaG9tZS9mb29cIiksIFwiXFxcXGhvbWVcXFxcZm9vXCIpO1xuICogfSBlbHNlIHtcbiAqICAgYXNzZXJ0RXF1YWxzKGZyb21GaWxlVXJsKFwiZmlsZTovLy9ob21lL2Zvb1wiKSwgXCIvaG9tZS9mb29cIik7XG4gKiB9XG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0gdXJsIFRoZSBmaWxlIFVSTCB0byBjb252ZXJ0IHRvIGEgcGF0aC5cbiAqIEByZXR1cm5zIFRoZSBwYXRoIHN0cmluZy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZyb21GaWxlVXJsKHVybDogc3RyaW5nIHwgVVJMKTogc3RyaW5nIHtcbiAgcmV0dXJuIGlzV2luZG93cyA/IHdpbmRvd3NGcm9tRmlsZVVybCh1cmwpIDogcG9zaXhGcm9tRmlsZVVybCh1cmwpO1xufVxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLHFEQUFxRDtBQUNyRCxxQ0FBcUM7QUFFckMsU0FBUyxTQUFTLFFBQVEsV0FBVztBQUNyQyxTQUFTLGVBQWUsZ0JBQWdCLFFBQVEsMkJBQTJCO0FBQzNFLFNBQVMsZUFBZSxrQkFBa0IsUUFBUSw2QkFBNkI7QUFFL0U7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Q0FtQkMsR0FDRCxPQUFPLFNBQVMsWUFBWSxHQUFpQjtFQUMzQyxPQUFPLFlBQVksbUJBQW1CLE9BQU8saUJBQWlCO0FBQ2hFIn0=
// denoCacheMetadata=830903570762889095,1557960748720662105