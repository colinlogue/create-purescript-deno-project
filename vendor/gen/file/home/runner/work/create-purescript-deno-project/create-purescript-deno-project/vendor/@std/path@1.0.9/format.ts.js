// Copyright 2018-2025 the Deno authors. MIT license.
// This module is browser compatible.
import { isWindows } from "./_os.ts";
import { format as posixFormat } from "./posix/format.ts";
import { format as windowsFormat } from "./windows/format.ts";
/**
 * Generate a path from a {@linkcode ParsedPath} object. It does the
 * opposite of {@linkcode https://jsr.io/@std/path/doc/~/parse | parse()}.
 *
 * @example Usage
 * ```ts
 * import { format } from "@std/path/format";
 * import { assertEquals } from "@std/assert";
 *
 * if (Deno.build.os === "windows") {
 *   assertEquals(format({ dir: "C:\\path\\to", base: "script.ts" }), "C:\\path\\to\\script.ts");
 * } else {
 *   assertEquals(format({ dir: "/path/to/dir", base: "script.ts" }), "/path/to/dir/script.ts");
 * }
 * ```
 *
 * @param pathObject Object with path components.
 * @returns The formatted path.
 */ export function format(pathObject) {
  return isWindows ? windowsFormat(pathObject) : posixFormat(pathObject);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGU6Ly8vaG9tZS9ydW5uZXIvd29yay9jcmVhdGUtcHVyZXNjcmlwdC1kZW5vLXByb2plY3QvY3JlYXRlLXB1cmVzY3JpcHQtZGVuby1wcm9qZWN0L3ZlbmRvci9Ac3RkL3BhdGhAMS4wLjkvZm9ybWF0LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAyMDE4LTIwMjUgdGhlIERlbm8gYXV0aG9ycy4gTUlUIGxpY2Vuc2UuXG4vLyBUaGlzIG1vZHVsZSBpcyBicm93c2VyIGNvbXBhdGlibGUuXG5cbmltcG9ydCB7IGlzV2luZG93cyB9IGZyb20gXCIuL19vcy50c1wiO1xuaW1wb3J0IHsgZm9ybWF0IGFzIHBvc2l4Rm9ybWF0IH0gZnJvbSBcIi4vcG9zaXgvZm9ybWF0LnRzXCI7XG5pbXBvcnQgeyBmb3JtYXQgYXMgd2luZG93c0Zvcm1hdCB9IGZyb20gXCIuL3dpbmRvd3MvZm9ybWF0LnRzXCI7XG5pbXBvcnQgdHlwZSB7IFBhcnNlZFBhdGggfSBmcm9tIFwiLi90eXBlcy50c1wiO1xuXG4vKipcbiAqIEdlbmVyYXRlIGEgcGF0aCBmcm9tIGEge0BsaW5rY29kZSBQYXJzZWRQYXRofSBvYmplY3QuIEl0IGRvZXMgdGhlXG4gKiBvcHBvc2l0ZSBvZiB7QGxpbmtjb2RlIGh0dHBzOi8vanNyLmlvL0BzdGQvcGF0aC9kb2Mvfi9wYXJzZSB8IHBhcnNlKCl9LlxuICpcbiAqIEBleGFtcGxlIFVzYWdlXG4gKiBgYGB0c1xuICogaW1wb3J0IHsgZm9ybWF0IH0gZnJvbSBcIkBzdGQvcGF0aC9mb3JtYXRcIjtcbiAqIGltcG9ydCB7IGFzc2VydEVxdWFscyB9IGZyb20gXCJAc3RkL2Fzc2VydFwiO1xuICpcbiAqIGlmIChEZW5vLmJ1aWxkLm9zID09PSBcIndpbmRvd3NcIikge1xuICogICBhc3NlcnRFcXVhbHMoZm9ybWF0KHsgZGlyOiBcIkM6XFxcXHBhdGhcXFxcdG9cIiwgYmFzZTogXCJzY3JpcHQudHNcIiB9KSwgXCJDOlxcXFxwYXRoXFxcXHRvXFxcXHNjcmlwdC50c1wiKTtcbiAqIH0gZWxzZSB7XG4gKiAgIGFzc2VydEVxdWFscyhmb3JtYXQoeyBkaXI6IFwiL3BhdGgvdG8vZGlyXCIsIGJhc2U6IFwic2NyaXB0LnRzXCIgfSksIFwiL3BhdGgvdG8vZGlyL3NjcmlwdC50c1wiKTtcbiAqIH1cbiAqIGBgYFxuICpcbiAqIEBwYXJhbSBwYXRoT2JqZWN0IE9iamVjdCB3aXRoIHBhdGggY29tcG9uZW50cy5cbiAqIEByZXR1cm5zIFRoZSBmb3JtYXR0ZWQgcGF0aC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZvcm1hdChwYXRoT2JqZWN0OiBQYXJ0aWFsPFBhcnNlZFBhdGg+KTogc3RyaW5nIHtcbiAgcmV0dXJuIGlzV2luZG93cyA/IHdpbmRvd3NGb3JtYXQocGF0aE9iamVjdCkgOiBwb3NpeEZvcm1hdChwYXRoT2JqZWN0KTtcbn1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxxREFBcUQ7QUFDckQscUNBQXFDO0FBRXJDLFNBQVMsU0FBUyxRQUFRLFdBQVc7QUFDckMsU0FBUyxVQUFVLFdBQVcsUUFBUSxvQkFBb0I7QUFDMUQsU0FBUyxVQUFVLGFBQWEsUUFBUSxzQkFBc0I7QUFHOUQ7Ozs7Ozs7Ozs7Ozs7Ozs7OztDQWtCQyxHQUNELE9BQU8sU0FBUyxPQUFPLFVBQStCO0VBQ3BELE9BQU8sWUFBWSxjQUFjLGNBQWMsWUFBWTtBQUM3RCJ9
// denoCacheMetadata=14820575437354155832,17164633962233580958