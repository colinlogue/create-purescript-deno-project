// Copyright 2018-2025 the Deno authors. MIT license.
// This module is browser compatible.
import { encodeWhitespace } from "../_common/to_file_url.ts";
import { isAbsolute } from "./is_absolute.ts";
/**
 * Converts a path string to a file URL.
 *
 * @example Usage
 * ```ts
 * import { toFileUrl } from "@std/path/windows/to-file-url";
 * import { assertEquals } from "@std/assert";
 *
 * assertEquals(toFileUrl("\\home\\foo"), new URL("file:///home/foo"));
 * assertEquals(toFileUrl("C:\\Users\\foo"), new URL("file:///C:/Users/foo"));
 * assertEquals(toFileUrl("\\\\127.0.0.1\\home\\foo"), new URL("file://127.0.0.1/home/foo"));
 * ```
 * @param path The path to convert.
 * @returns The file URL.
 */ export function toFileUrl(path) {
  if (!isAbsolute(path)) {
    throw new TypeError(`Path must be absolute: received "${path}"`);
  }
  const [, hostname, pathname] = path.match(/^(?:[/\\]{2}([^/\\]+)(?=[/\\](?:[^/\\]|$)))?(.*)/);
  const url = new URL("file:///");
  url.pathname = encodeWhitespace(pathname.replace(/%/g, "%25"));
  if (hostname !== undefined && hostname !== "localhost") {
    url.hostname = hostname;
    if (!url.hostname) {
      throw new TypeError(`Invalid hostname: "${url.hostname}"`);
    }
  }
  return url;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGU6Ly8vaG9tZS9ydW5uZXIvd29yay9jcmVhdGUtcHVyZXNjcmlwdC1kZW5vLXByb2plY3QvY3JlYXRlLXB1cmVzY3JpcHQtZGVuby1wcm9qZWN0L3ZlbmRvci9Ac3RkL3BhdGhAMS4wLjkvd2luZG93cy90b19maWxlX3VybC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgMjAxOC0yMDI1IHRoZSBEZW5vIGF1dGhvcnMuIE1JVCBsaWNlbnNlLlxuLy8gVGhpcyBtb2R1bGUgaXMgYnJvd3NlciBjb21wYXRpYmxlLlxuXG5pbXBvcnQgeyBlbmNvZGVXaGl0ZXNwYWNlIH0gZnJvbSBcIi4uL19jb21tb24vdG9fZmlsZV91cmwudHNcIjtcbmltcG9ydCB7IGlzQWJzb2x1dGUgfSBmcm9tIFwiLi9pc19hYnNvbHV0ZS50c1wiO1xuXG4vKipcbiAqIENvbnZlcnRzIGEgcGF0aCBzdHJpbmcgdG8gYSBmaWxlIFVSTC5cbiAqXG4gKiBAZXhhbXBsZSBVc2FnZVxuICogYGBgdHNcbiAqIGltcG9ydCB7IHRvRmlsZVVybCB9IGZyb20gXCJAc3RkL3BhdGgvd2luZG93cy90by1maWxlLXVybFwiO1xuICogaW1wb3J0IHsgYXNzZXJ0RXF1YWxzIH0gZnJvbSBcIkBzdGQvYXNzZXJ0XCI7XG4gKlxuICogYXNzZXJ0RXF1YWxzKHRvRmlsZVVybChcIlxcXFxob21lXFxcXGZvb1wiKSwgbmV3IFVSTChcImZpbGU6Ly8vaG9tZS9mb29cIikpO1xuICogYXNzZXJ0RXF1YWxzKHRvRmlsZVVybChcIkM6XFxcXFVzZXJzXFxcXGZvb1wiKSwgbmV3IFVSTChcImZpbGU6Ly8vQzovVXNlcnMvZm9vXCIpKTtcbiAqIGFzc2VydEVxdWFscyh0b0ZpbGVVcmwoXCJcXFxcXFxcXDEyNy4wLjAuMVxcXFxob21lXFxcXGZvb1wiKSwgbmV3IFVSTChcImZpbGU6Ly8xMjcuMC4wLjEvaG9tZS9mb29cIikpO1xuICogYGBgXG4gKiBAcGFyYW0gcGF0aCBUaGUgcGF0aCB0byBjb252ZXJ0LlxuICogQHJldHVybnMgVGhlIGZpbGUgVVJMLlxuICovXG5leHBvcnQgZnVuY3Rpb24gdG9GaWxlVXJsKHBhdGg6IHN0cmluZyk6IFVSTCB7XG4gIGlmICghaXNBYnNvbHV0ZShwYXRoKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYFBhdGggbXVzdCBiZSBhYnNvbHV0ZTogcmVjZWl2ZWQgXCIke3BhdGh9XCJgKTtcbiAgfVxuICBjb25zdCBbLCBob3N0bmFtZSwgcGF0aG5hbWVdID0gcGF0aC5tYXRjaChcbiAgICAvXig/OlsvXFxcXF17Mn0oW14vXFxcXF0rKSg/PVsvXFxcXF0oPzpbXi9cXFxcXXwkKSkpPyguKikvLFxuICApITtcbiAgY29uc3QgdXJsID0gbmV3IFVSTChcImZpbGU6Ly8vXCIpO1xuICB1cmwucGF0aG5hbWUgPSBlbmNvZGVXaGl0ZXNwYWNlKHBhdGhuYW1lIS5yZXBsYWNlKC8lL2csIFwiJTI1XCIpKTtcbiAgaWYgKGhvc3RuYW1lICE9PSB1bmRlZmluZWQgJiYgaG9zdG5hbWUgIT09IFwibG9jYWxob3N0XCIpIHtcbiAgICB1cmwuaG9zdG5hbWUgPSBob3N0bmFtZTtcbiAgICBpZiAoIXVybC5ob3N0bmFtZSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgSW52YWxpZCBob3N0bmFtZTogXCIke3VybC5ob3N0bmFtZX1cImApO1xuICAgIH1cbiAgfVxuICByZXR1cm4gdXJsO1xufVxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLHFEQUFxRDtBQUNyRCxxQ0FBcUM7QUFFckMsU0FBUyxnQkFBZ0IsUUFBUSw0QkFBNEI7QUFDN0QsU0FBUyxVQUFVLFFBQVEsbUJBQW1CO0FBRTlDOzs7Ozs7Ozs7Ozs7OztDQWNDLEdBQ0QsT0FBTyxTQUFTLFVBQVUsSUFBWTtFQUNwQyxJQUFJLENBQUMsV0FBVyxPQUFPO0lBQ3JCLE1BQU0sSUFBSSxVQUFVLENBQUMsaUNBQWlDLEVBQUUsS0FBSyxDQUFDLENBQUM7RUFDakU7RUFDQSxNQUFNLEdBQUcsVUFBVSxTQUFTLEdBQUcsS0FBSyxLQUFLLENBQ3ZDO0VBRUYsTUFBTSxNQUFNLElBQUksSUFBSTtFQUNwQixJQUFJLFFBQVEsR0FBRyxpQkFBaUIsU0FBVSxPQUFPLENBQUMsTUFBTTtFQUN4RCxJQUFJLGFBQWEsYUFBYSxhQUFhLGFBQWE7SUFDdEQsSUFBSSxRQUFRLEdBQUc7SUFDZixJQUFJLENBQUMsSUFBSSxRQUFRLEVBQUU7TUFDakIsTUFBTSxJQUFJLFVBQVUsQ0FBQyxtQkFBbUIsRUFBRSxJQUFJLFFBQVEsQ0FBQyxDQUFDLENBQUM7SUFDM0Q7RUFDRjtFQUNBLE9BQU87QUFDVCJ9
// denoCacheMetadata=13099158069099169774,6146770073621965290