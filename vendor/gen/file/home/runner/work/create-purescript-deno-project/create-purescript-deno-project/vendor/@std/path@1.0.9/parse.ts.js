// Copyright 2018-2025 the Deno authors. MIT license.
// This module is browser compatible.
import { isWindows } from "./_os.ts";
import { parse as posixParse } from "./posix/parse.ts";
import { parse as windowsParse } from "./windows/parse.ts";
/**
 * Return an object containing the parsed components of the path.
 *
 * Use {@linkcode https://jsr.io/@std/path/doc/~/format | format()} to reverse
 * the result.
 *
 * @example Usage
 * ```ts
 * import { parse } from "@std/path/parse";
 * import { assertEquals } from "@std/assert";
 *
 * if (Deno.build.os === "windows") {
 *   const parsedPathObj = parse("C:\\path\\to\\script.ts");
 *   assertEquals(parsedPathObj.root, "C:\\");
 *   assertEquals(parsedPathObj.dir, "C:\\path\\to");
 *   assertEquals(parsedPathObj.base, "script.ts");
 *   assertEquals(parsedPathObj.ext, ".ts");
 *   assertEquals(parsedPathObj.name, "script");
 * } else {
 *   const parsedPathObj = parse("/path/to/dir/script.ts");
 *   parsedPathObj.root; // "/"
 *   parsedPathObj.dir; // "/path/to/dir"
 *   parsedPathObj.base; // "script.ts"
 *   parsedPathObj.ext; // ".ts"
 *   parsedPathObj.name; // "script"
 * }
 * ```
 *
 * @param path Path to process
 * @returns An object with the parsed path components.
 */ export function parse(path) {
  return isWindows ? windowsParse(path) : posixParse(path);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGU6Ly8vaG9tZS9ydW5uZXIvd29yay9jcmVhdGUtcHVyZXNjcmlwdC1kZW5vLXByb2plY3QvY3JlYXRlLXB1cmVzY3JpcHQtZGVuby1wcm9qZWN0L3ZlbmRvci9Ac3RkL3BhdGhAMS4wLjkvcGFyc2UudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IDIwMTgtMjAyNSB0aGUgRGVubyBhdXRob3JzLiBNSVQgbGljZW5zZS5cbi8vIFRoaXMgbW9kdWxlIGlzIGJyb3dzZXIgY29tcGF0aWJsZS5cblxuaW1wb3J0IHsgaXNXaW5kb3dzIH0gZnJvbSBcIi4vX29zLnRzXCI7XG5pbXBvcnQgdHlwZSB7IFBhcnNlZFBhdGggfSBmcm9tIFwiLi90eXBlcy50c1wiO1xuaW1wb3J0IHsgcGFyc2UgYXMgcG9zaXhQYXJzZSB9IGZyb20gXCIuL3Bvc2l4L3BhcnNlLnRzXCI7XG5pbXBvcnQgeyBwYXJzZSBhcyB3aW5kb3dzUGFyc2UgfSBmcm9tIFwiLi93aW5kb3dzL3BhcnNlLnRzXCI7XG5cbmV4cG9ydCB0eXBlIHsgUGFyc2VkUGF0aCB9IGZyb20gXCIuL3R5cGVzLnRzXCI7XG5cbi8qKlxuICogUmV0dXJuIGFuIG9iamVjdCBjb250YWluaW5nIHRoZSBwYXJzZWQgY29tcG9uZW50cyBvZiB0aGUgcGF0aC5cbiAqXG4gKiBVc2Uge0BsaW5rY29kZSBodHRwczovL2pzci5pby9Ac3RkL3BhdGgvZG9jL34vZm9ybWF0IHwgZm9ybWF0KCl9IHRvIHJldmVyc2VcbiAqIHRoZSByZXN1bHQuXG4gKlxuICogQGV4YW1wbGUgVXNhZ2VcbiAqIGBgYHRzXG4gKiBpbXBvcnQgeyBwYXJzZSB9IGZyb20gXCJAc3RkL3BhdGgvcGFyc2VcIjtcbiAqIGltcG9ydCB7IGFzc2VydEVxdWFscyB9IGZyb20gXCJAc3RkL2Fzc2VydFwiO1xuICpcbiAqIGlmIChEZW5vLmJ1aWxkLm9zID09PSBcIndpbmRvd3NcIikge1xuICogICBjb25zdCBwYXJzZWRQYXRoT2JqID0gcGFyc2UoXCJDOlxcXFxwYXRoXFxcXHRvXFxcXHNjcmlwdC50c1wiKTtcbiAqICAgYXNzZXJ0RXF1YWxzKHBhcnNlZFBhdGhPYmoucm9vdCwgXCJDOlxcXFxcIik7XG4gKiAgIGFzc2VydEVxdWFscyhwYXJzZWRQYXRoT2JqLmRpciwgXCJDOlxcXFxwYXRoXFxcXHRvXCIpO1xuICogICBhc3NlcnRFcXVhbHMocGFyc2VkUGF0aE9iai5iYXNlLCBcInNjcmlwdC50c1wiKTtcbiAqICAgYXNzZXJ0RXF1YWxzKHBhcnNlZFBhdGhPYmouZXh0LCBcIi50c1wiKTtcbiAqICAgYXNzZXJ0RXF1YWxzKHBhcnNlZFBhdGhPYmoubmFtZSwgXCJzY3JpcHRcIik7XG4gKiB9IGVsc2Uge1xuICogICBjb25zdCBwYXJzZWRQYXRoT2JqID0gcGFyc2UoXCIvcGF0aC90by9kaXIvc2NyaXB0LnRzXCIpO1xuICogICBwYXJzZWRQYXRoT2JqLnJvb3Q7IC8vIFwiL1wiXG4gKiAgIHBhcnNlZFBhdGhPYmouZGlyOyAvLyBcIi9wYXRoL3RvL2RpclwiXG4gKiAgIHBhcnNlZFBhdGhPYmouYmFzZTsgLy8gXCJzY3JpcHQudHNcIlxuICogICBwYXJzZWRQYXRoT2JqLmV4dDsgLy8gXCIudHNcIlxuICogICBwYXJzZWRQYXRoT2JqLm5hbWU7IC8vIFwic2NyaXB0XCJcbiAqIH1cbiAqIGBgYFxuICpcbiAqIEBwYXJhbSBwYXRoIFBhdGggdG8gcHJvY2Vzc1xuICogQHJldHVybnMgQW4gb2JqZWN0IHdpdGggdGhlIHBhcnNlZCBwYXRoIGNvbXBvbmVudHMuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZShwYXRoOiBzdHJpbmcpOiBQYXJzZWRQYXRoIHtcbiAgcmV0dXJuIGlzV2luZG93cyA/IHdpbmRvd3NQYXJzZShwYXRoKSA6IHBvc2l4UGFyc2UocGF0aCk7XG59XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEscURBQXFEO0FBQ3JELHFDQUFxQztBQUVyQyxTQUFTLFNBQVMsUUFBUSxXQUFXO0FBRXJDLFNBQVMsU0FBUyxVQUFVLFFBQVEsbUJBQW1CO0FBQ3ZELFNBQVMsU0FBUyxZQUFZLFFBQVEscUJBQXFCO0FBSTNEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Q0E4QkMsR0FDRCxPQUFPLFNBQVMsTUFBTSxJQUFZO0VBQ2hDLE9BQU8sWUFBWSxhQUFhLFFBQVEsV0FBVztBQUNyRCJ9
// denoCacheMetadata=11525420760480262077,17854068438639641601