// Copyright 2018-2025 the Deno authors. MIT license.
// This module is browser compatible.
import { isWindows } from "./_os.ts";
import { toFileUrl as posixToFileUrl } from "./posix/to_file_url.ts";
import { toFileUrl as windowsToFileUrl } from "./windows/to_file_url.ts";
/**
 * Converts a path string to a file URL.
 *
 * @example Usage
 * ```ts
 * import { toFileUrl } from "@std/path/to-file-url";
 * import { assertEquals } from "@std/assert";
 *
 * if (Deno.build.os === "windows") {
 *   assertEquals(toFileUrl("\\home\\foo"), new URL("file:///home/foo"));
 *   assertEquals(toFileUrl("C:\\Users\\foo"), new URL("file:///C:/Users/foo"));
 *   assertEquals(toFileUrl("\\\\127.0.0.1\\home\\foo"), new URL("file://127.0.0.1/home/foo"));
 * } else {
 *   assertEquals(toFileUrl("/home/foo"), new URL("file:///home/foo"));
 * }
 * ```
 *
 * @param path Path to convert to file URL.
 * @returns The file URL equivalent to the path.
 */ export function toFileUrl(path) {
  return isWindows ? windowsToFileUrl(path) : posixToFileUrl(path);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGU6Ly8vaG9tZS9ydW5uZXIvd29yay9jcmVhdGUtcHVyZXNjcmlwdC1kZW5vLXByb2plY3QvY3JlYXRlLXB1cmVzY3JpcHQtZGVuby1wcm9qZWN0L3ZlbmRvci9Ac3RkL3BhdGhAMS4wLjkvdG9fZmlsZV91cmwudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IDIwMTgtMjAyNSB0aGUgRGVubyBhdXRob3JzLiBNSVQgbGljZW5zZS5cbi8vIFRoaXMgbW9kdWxlIGlzIGJyb3dzZXIgY29tcGF0aWJsZS5cblxuaW1wb3J0IHsgaXNXaW5kb3dzIH0gZnJvbSBcIi4vX29zLnRzXCI7XG5pbXBvcnQgeyB0b0ZpbGVVcmwgYXMgcG9zaXhUb0ZpbGVVcmwgfSBmcm9tIFwiLi9wb3NpeC90b19maWxlX3VybC50c1wiO1xuaW1wb3J0IHsgdG9GaWxlVXJsIGFzIHdpbmRvd3NUb0ZpbGVVcmwgfSBmcm9tIFwiLi93aW5kb3dzL3RvX2ZpbGVfdXJsLnRzXCI7XG5cbi8qKlxuICogQ29udmVydHMgYSBwYXRoIHN0cmluZyB0byBhIGZpbGUgVVJMLlxuICpcbiAqIEBleGFtcGxlIFVzYWdlXG4gKiBgYGB0c1xuICogaW1wb3J0IHsgdG9GaWxlVXJsIH0gZnJvbSBcIkBzdGQvcGF0aC90by1maWxlLXVybFwiO1xuICogaW1wb3J0IHsgYXNzZXJ0RXF1YWxzIH0gZnJvbSBcIkBzdGQvYXNzZXJ0XCI7XG4gKlxuICogaWYgKERlbm8uYnVpbGQub3MgPT09IFwid2luZG93c1wiKSB7XG4gKiAgIGFzc2VydEVxdWFscyh0b0ZpbGVVcmwoXCJcXFxcaG9tZVxcXFxmb29cIiksIG5ldyBVUkwoXCJmaWxlOi8vL2hvbWUvZm9vXCIpKTtcbiAqICAgYXNzZXJ0RXF1YWxzKHRvRmlsZVVybChcIkM6XFxcXFVzZXJzXFxcXGZvb1wiKSwgbmV3IFVSTChcImZpbGU6Ly8vQzovVXNlcnMvZm9vXCIpKTtcbiAqICAgYXNzZXJ0RXF1YWxzKHRvRmlsZVVybChcIlxcXFxcXFxcMTI3LjAuMC4xXFxcXGhvbWVcXFxcZm9vXCIpLCBuZXcgVVJMKFwiZmlsZTovLzEyNy4wLjAuMS9ob21lL2Zvb1wiKSk7XG4gKiB9IGVsc2Uge1xuICogICBhc3NlcnRFcXVhbHModG9GaWxlVXJsKFwiL2hvbWUvZm9vXCIpLCBuZXcgVVJMKFwiZmlsZTovLy9ob21lL2Zvb1wiKSk7XG4gKiB9XG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0gcGF0aCBQYXRoIHRvIGNvbnZlcnQgdG8gZmlsZSBVUkwuXG4gKiBAcmV0dXJucyBUaGUgZmlsZSBVUkwgZXF1aXZhbGVudCB0byB0aGUgcGF0aC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRvRmlsZVVybChwYXRoOiBzdHJpbmcpOiBVUkwge1xuICByZXR1cm4gaXNXaW5kb3dzID8gd2luZG93c1RvRmlsZVVybChwYXRoKSA6IHBvc2l4VG9GaWxlVXJsKHBhdGgpO1xufVxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLHFEQUFxRDtBQUNyRCxxQ0FBcUM7QUFFckMsU0FBUyxTQUFTLFFBQVEsV0FBVztBQUNyQyxTQUFTLGFBQWEsY0FBYyxRQUFRLHlCQUF5QjtBQUNyRSxTQUFTLGFBQWEsZ0JBQWdCLFFBQVEsMkJBQTJCO0FBRXpFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0NBbUJDLEdBQ0QsT0FBTyxTQUFTLFVBQVUsSUFBWTtFQUNwQyxPQUFPLFlBQVksaUJBQWlCLFFBQVEsZUFBZTtBQUM3RCJ9
// denoCacheMetadata=13130700138431244495,12365678856490950173