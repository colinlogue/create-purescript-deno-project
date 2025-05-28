// Copyright 2018-2025 the Deno authors. MIT license.
// This module is browser compatible.
import { assertArg } from "../_common/from_file_url.ts";
/**
 * Converts a file URL to a path string.
 *
 * @example Usage
 * ```ts
 * import { fromFileUrl } from "@std/path/windows/from-file-url";
 * import { assertEquals } from "@std/assert";
 *
 * assertEquals(fromFileUrl("file:///home/foo"), "\\home\\foo");
 * assertEquals(fromFileUrl("file:///C:/Users/foo"), "C:\\Users\\foo");
 * assertEquals(fromFileUrl("file://localhost/home/foo"), "\\home\\foo");
 * ```
 *
 * @param url The file URL to convert.
 * @returns The path string.
 */ export function fromFileUrl(url) {
  url = assertArg(url);
  let path = decodeURIComponent(url.pathname.replace(/\//g, "\\").replace(/%(?![0-9A-Fa-f]{2})/g, "%25")).replace(/^\\*([A-Za-z]:)(\\|$)/, "$1\\");
  if (url.hostname !== "") {
    // Note: The `URL` implementation guarantees that the drive letter and
    // hostname are mutually exclusive. Otherwise it would not have been valid
    // to append the hostname and path like this.
    path = `\\\\${url.hostname}${path}`;
  }
  return path;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGU6Ly8vaG9tZS9ydW5uZXIvd29yay9jcmVhdGUtcHVyZXNjcmlwdC1kZW5vLXByb2plY3QvY3JlYXRlLXB1cmVzY3JpcHQtZGVuby1wcm9qZWN0L3ZlbmRvci9Ac3RkL3BhdGhAMS4wLjkvd2luZG93cy9mcm9tX2ZpbGVfdXJsLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAyMDE4LTIwMjUgdGhlIERlbm8gYXV0aG9ycy4gTUlUIGxpY2Vuc2UuXG4vLyBUaGlzIG1vZHVsZSBpcyBicm93c2VyIGNvbXBhdGlibGUuXG5cbmltcG9ydCB7IGFzc2VydEFyZyB9IGZyb20gXCIuLi9fY29tbW9uL2Zyb21fZmlsZV91cmwudHNcIjtcblxuLyoqXG4gKiBDb252ZXJ0cyBhIGZpbGUgVVJMIHRvIGEgcGF0aCBzdHJpbmcuXG4gKlxuICogQGV4YW1wbGUgVXNhZ2VcbiAqIGBgYHRzXG4gKiBpbXBvcnQgeyBmcm9tRmlsZVVybCB9IGZyb20gXCJAc3RkL3BhdGgvd2luZG93cy9mcm9tLWZpbGUtdXJsXCI7XG4gKiBpbXBvcnQgeyBhc3NlcnRFcXVhbHMgfSBmcm9tIFwiQHN0ZC9hc3NlcnRcIjtcbiAqXG4gKiBhc3NlcnRFcXVhbHMoZnJvbUZpbGVVcmwoXCJmaWxlOi8vL2hvbWUvZm9vXCIpLCBcIlxcXFxob21lXFxcXGZvb1wiKTtcbiAqIGFzc2VydEVxdWFscyhmcm9tRmlsZVVybChcImZpbGU6Ly8vQzovVXNlcnMvZm9vXCIpLCBcIkM6XFxcXFVzZXJzXFxcXGZvb1wiKTtcbiAqIGFzc2VydEVxdWFscyhmcm9tRmlsZVVybChcImZpbGU6Ly9sb2NhbGhvc3QvaG9tZS9mb29cIiksIFwiXFxcXGhvbWVcXFxcZm9vXCIpO1xuICogYGBgXG4gKlxuICogQHBhcmFtIHVybCBUaGUgZmlsZSBVUkwgdG8gY29udmVydC5cbiAqIEByZXR1cm5zIFRoZSBwYXRoIHN0cmluZy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZyb21GaWxlVXJsKHVybDogVVJMIHwgc3RyaW5nKTogc3RyaW5nIHtcbiAgdXJsID0gYXNzZXJ0QXJnKHVybCk7XG4gIGxldCBwYXRoID0gZGVjb2RlVVJJQ29tcG9uZW50KFxuICAgIHVybC5wYXRobmFtZS5yZXBsYWNlKC9cXC8vZywgXCJcXFxcXCIpLnJlcGxhY2UoLyUoPyFbMC05QS1GYS1mXXsyfSkvZywgXCIlMjVcIiksXG4gICkucmVwbGFjZSgvXlxcXFwqKFtBLVphLXpdOikoXFxcXHwkKS8sIFwiJDFcXFxcXCIpO1xuICBpZiAodXJsLmhvc3RuYW1lICE9PSBcIlwiKSB7XG4gICAgLy8gTm90ZTogVGhlIGBVUkxgIGltcGxlbWVudGF0aW9uIGd1YXJhbnRlZXMgdGhhdCB0aGUgZHJpdmUgbGV0dGVyIGFuZFxuICAgIC8vIGhvc3RuYW1lIGFyZSBtdXR1YWxseSBleGNsdXNpdmUuIE90aGVyd2lzZSBpdCB3b3VsZCBub3QgaGF2ZSBiZWVuIHZhbGlkXG4gICAgLy8gdG8gYXBwZW5kIHRoZSBob3N0bmFtZSBhbmQgcGF0aCBsaWtlIHRoaXMuXG4gICAgcGF0aCA9IGBcXFxcXFxcXCR7dXJsLmhvc3RuYW1lfSR7cGF0aH1gO1xuICB9XG4gIHJldHVybiBwYXRoO1xufVxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLHFEQUFxRDtBQUNyRCxxQ0FBcUM7QUFFckMsU0FBUyxTQUFTLFFBQVEsOEJBQThCO0FBRXhEOzs7Ozs7Ozs7Ozs7Ozs7Q0FlQyxHQUNELE9BQU8sU0FBUyxZQUFZLEdBQWlCO0VBQzNDLE1BQU0sVUFBVTtFQUNoQixJQUFJLE9BQU8sbUJBQ1QsSUFBSSxRQUFRLENBQUMsT0FBTyxDQUFDLE9BQU8sTUFBTSxPQUFPLENBQUMsd0JBQXdCLFFBQ2xFLE9BQU8sQ0FBQyx5QkFBeUI7RUFDbkMsSUFBSSxJQUFJLFFBQVEsS0FBSyxJQUFJO0lBQ3ZCLHNFQUFzRTtJQUN0RSwwRUFBMEU7SUFDMUUsNkNBQTZDO0lBQzdDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsSUFBSSxRQUFRLEdBQUcsTUFBTTtFQUNyQztFQUNBLE9BQU87QUFDVCJ9
// denoCacheMetadata=10165189360467894064,9713133572294365243