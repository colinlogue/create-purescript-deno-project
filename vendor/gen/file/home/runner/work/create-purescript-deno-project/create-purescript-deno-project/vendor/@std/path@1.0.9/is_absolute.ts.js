// Copyright 2018-2025 the Deno authors. MIT license.
// This module is browser compatible.
import { isWindows } from "./_os.ts";
import { isAbsolute as posixIsAbsolute } from "./posix/is_absolute.ts";
import { isAbsolute as windowsIsAbsolute } from "./windows/is_absolute.ts";
/**
 * Verifies whether provided path is absolute.
 *
 * @example Usage
 * ```ts
 * import { isAbsolute } from "@std/path/is-absolute";
 * import { assert, assertFalse } from "@std/assert";
 *
 * if (Deno.build.os === "windows") {
 *   assert(isAbsolute("C:\\home\\foo"));
 *   assertFalse(isAbsolute("home\\foo"));
 * } else {
 *   assert(isAbsolute("/home/foo"));
 *   assertFalse(isAbsolute("home/foo"));
 * }
 * ```
 *
 * @param path Path to be verified as absolute.
 * @returns `true` if path is absolute, `false` otherwise
 */ export function isAbsolute(path) {
  return isWindows ? windowsIsAbsolute(path) : posixIsAbsolute(path);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGU6Ly8vaG9tZS9ydW5uZXIvd29yay9jcmVhdGUtcHVyZXNjcmlwdC1kZW5vLXByb2plY3QvY3JlYXRlLXB1cmVzY3JpcHQtZGVuby1wcm9qZWN0L3ZlbmRvci9Ac3RkL3BhdGhAMS4wLjkvaXNfYWJzb2x1dGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IDIwMTgtMjAyNSB0aGUgRGVubyBhdXRob3JzLiBNSVQgbGljZW5zZS5cbi8vIFRoaXMgbW9kdWxlIGlzIGJyb3dzZXIgY29tcGF0aWJsZS5cblxuaW1wb3J0IHsgaXNXaW5kb3dzIH0gZnJvbSBcIi4vX29zLnRzXCI7XG5pbXBvcnQgeyBpc0Fic29sdXRlIGFzIHBvc2l4SXNBYnNvbHV0ZSB9IGZyb20gXCIuL3Bvc2l4L2lzX2Fic29sdXRlLnRzXCI7XG5pbXBvcnQgeyBpc0Fic29sdXRlIGFzIHdpbmRvd3NJc0Fic29sdXRlIH0gZnJvbSBcIi4vd2luZG93cy9pc19hYnNvbHV0ZS50c1wiO1xuXG4vKipcbiAqIFZlcmlmaWVzIHdoZXRoZXIgcHJvdmlkZWQgcGF0aCBpcyBhYnNvbHV0ZS5cbiAqXG4gKiBAZXhhbXBsZSBVc2FnZVxuICogYGBgdHNcbiAqIGltcG9ydCB7IGlzQWJzb2x1dGUgfSBmcm9tIFwiQHN0ZC9wYXRoL2lzLWFic29sdXRlXCI7XG4gKiBpbXBvcnQgeyBhc3NlcnQsIGFzc2VydEZhbHNlIH0gZnJvbSBcIkBzdGQvYXNzZXJ0XCI7XG4gKlxuICogaWYgKERlbm8uYnVpbGQub3MgPT09IFwid2luZG93c1wiKSB7XG4gKiAgIGFzc2VydChpc0Fic29sdXRlKFwiQzpcXFxcaG9tZVxcXFxmb29cIikpO1xuICogICBhc3NlcnRGYWxzZShpc0Fic29sdXRlKFwiaG9tZVxcXFxmb29cIikpO1xuICogfSBlbHNlIHtcbiAqICAgYXNzZXJ0KGlzQWJzb2x1dGUoXCIvaG9tZS9mb29cIikpO1xuICogICBhc3NlcnRGYWxzZShpc0Fic29sdXRlKFwiaG9tZS9mb29cIikpO1xuICogfVxuICogYGBgXG4gKlxuICogQHBhcmFtIHBhdGggUGF0aCB0byBiZSB2ZXJpZmllZCBhcyBhYnNvbHV0ZS5cbiAqIEByZXR1cm5zIGB0cnVlYCBpZiBwYXRoIGlzIGFic29sdXRlLCBgZmFsc2VgIG90aGVyd2lzZVxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNBYnNvbHV0ZShwYXRoOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgcmV0dXJuIGlzV2luZG93cyA/IHdpbmRvd3NJc0Fic29sdXRlKHBhdGgpIDogcG9zaXhJc0Fic29sdXRlKHBhdGgpO1xufVxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLHFEQUFxRDtBQUNyRCxxQ0FBcUM7QUFFckMsU0FBUyxTQUFTLFFBQVEsV0FBVztBQUNyQyxTQUFTLGNBQWMsZUFBZSxRQUFRLHlCQUF5QjtBQUN2RSxTQUFTLGNBQWMsaUJBQWlCLFFBQVEsMkJBQTJCO0FBRTNFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0NBbUJDLEdBQ0QsT0FBTyxTQUFTLFdBQVcsSUFBWTtFQUNyQyxPQUFPLFlBQVksa0JBQWtCLFFBQVEsZ0JBQWdCO0FBQy9EIn0=
// denoCacheMetadata=4335862688538750676,17439324307389076197