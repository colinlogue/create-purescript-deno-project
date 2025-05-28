// Copyright 2018-2025 the Deno authors. MIT license.
// Copyright the Browserify authors. MIT License.
// Ported mostly from https://github.com/browserify/path-browserify/
// This module is browser compatible.
/**
 * Utilities for working with OS-specific file paths.
 *
 * Functions from this module will automatically switch to support the path style
 * of the current OS, either `windows` for Microsoft Windows, or `posix` for
 * every other operating system, eg. Linux, MacOS, BSD etc.
 *
 * To use functions for a specific path style regardless of the current OS
 * import the modules from the platform sub directory instead.
 *
 * ## Basic Path Operations
 *
 * ```ts
 * import * as path from "@std/path";
 * import { assertEquals } from "@std/assert";
 *
 * // Get components of a path
 * if (Deno.build.os === "windows") {
 *   assertEquals(path.basename("C:\\Users\\user\\file.txt"), "file.txt");
 *   assertEquals(path.dirname("C:\\Users\\user\\file.txt"), "C:\\Users\\user");
 *   assertEquals(path.extname("C:\\Users\\user\\file.txt"), ".txt");
 * } else {
 *   assertEquals(path.basename("/home/user/file.txt"), "file.txt");
 *   assertEquals(path.dirname("/home/user/file.txt"), "/home/user");
 *   assertEquals(path.extname("/home/user/file.txt"), ".txt");
 * }
 *
 * // Join path segments
 * if (Deno.build.os === "windows") {
 *   assertEquals(path.join("C:\\", "Users", "docs", "file.txt"), "C:\\Users\\docs\\file.txt");
 * } else {
 *   assertEquals(path.join("/home", "user", "docs", "file.txt"), "/home/user/docs/file.txt");
 * }
 *
 * // Normalize a path
 * if (Deno.build.os === "windows") {
 *   assertEquals(path.normalize("C:\\Users\\user\\..\\temp\\.\\file.txt"), "C:\\Users\\temp\\file.txt");
 * } else {
 *   assertEquals(path.normalize("/home/user/../temp/./file.txt"), "/home/temp/file.txt");
 * }
 *
 * // Resolve absolute path
 * if (Deno.build.os === "windows") {
 *   const resolved = path.resolve("C:\\foo", "docs", "file.txt");
 *   assertEquals(resolved, "C:\\foo\\docs\\file.txt");
 *   assertEquals(path.isAbsolute(resolved), true);
 * } else {
 *   const resolved = path.resolve("/foo", "docs", "file.txt");
 *   assertEquals(resolved, "/foo/docs/file.txt");
 *   assertEquals(path.isAbsolute(resolved), true);
 * }
 *
 * // Get relative path
 * if (Deno.build.os === "windows") {
 *   assertEquals(path.relative("C:\\Users", "C:\\Users\\docs\\file.txt"), "docs\\file.txt");
 *   assertEquals(path.relative("C:\\Users", "D:\\Programs"), "D:\\Programs");
 * } else {
 *   assertEquals(path.relative("/home/user", "/home/user/docs/file.txt"), "docs/file.txt");
 *   assertEquals(path.relative("/home/user", "/var/data"), "../../var/data");
 * }
 * ```
 *
 * ## Path Parsing and Formatting
 *
 * ```ts
 * import * as path from "@std/path";
 * import { assertEquals } from "@std/assert";
 *
 * if (Deno.build.os === "windows") {
 *   const parsedWindows = path.parse("C:\\Users\\user\\file.txt");
 *   assertEquals(parsedWindows.root, "C:\\");
 *   assertEquals(parsedWindows.dir, "C:\\Users\\user");
 *   assertEquals(parsedWindows.base, "file.txt");
 *   assertEquals(parsedWindows.ext, ".txt");
 *   assertEquals(parsedWindows.name, "file");
 *
 *   // Format path from components (Windows)
 *   assertEquals(
 *     path.format({ dir: "C:\\Users\\user", base: "file.txt" }),
 *     "C:\\Users\\user\\file.txt"
 *   );
 * } else {
 *   const parsedPosix = path.parse("/home/user/file.txt");
 *   assertEquals(parsedPosix.root, "/");
 *   assertEquals(parsedPosix.dir, "/home/user");
 *   assertEquals(parsedPosix.base, "file.txt");
 *   assertEquals(parsedPosix.ext, ".txt");
 *   assertEquals(parsedPosix.name, "file");
 *
 *   // Format path from components (POSIX)
 *   assertEquals(
 *     path.format({ dir: "/home/user", base: "file.txt" }),
 *     "/home/user/file.txt"
 *   );
 * }
 * ```
 *
 * ## URL Conversion
 *
 * ```ts
 * import * as path from "@std/path";
 * import { assertEquals } from "@std/assert";
 *
 * // Convert between file URLs and paths
 * if (Deno.build.os === "windows") {
 *   assertEquals(path.fromFileUrl("file:///C:/Users/user/file.txt"), "C:\\Users\\user\\file.txt");
 *   assertEquals(path.toFileUrl("C:\\Users\\user\\file.txt").href, "file:///C:/Users/user/file.txt");
 * } else {
 *   assertEquals(path.fromFileUrl("file:///home/user/file.txt"), "/home/user/file.txt");
 *   assertEquals(path.toFileUrl("/home/user/file.txt").href, "file:///home/user/file.txt");
 * }
 * ```
 *
 * ## Path Properties
 *
 * ```ts
 * import * as path from "@std/path";
 * import { assertEquals } from "@std/assert";
 *
 * // Check if path is absolute
 * if (Deno.build.os === "windows") {
 *   assertEquals(path.isAbsolute("C:\\Users"), true);
 *   assertEquals(path.isAbsolute("\\\\Server\\share"), true);
 *   assertEquals(path.isAbsolute("C:relative\\path"), false);
 *   assertEquals(path.isAbsolute("..\\relative\\path"), false);
 * } else {
 *   assertEquals(path.isAbsolute("/home/user"), true);
 *   assertEquals(path.isAbsolute("./relative/path"), false);
 *   assertEquals(path.isAbsolute("../relative/path"), false);
 * }
 *
 * // Convert to namespaced path (Windows-specific)
 * if (Deno.build.os === "windows") {
 *   assertEquals(path.toNamespacedPath("C:\\Users\\file.txt"), "\\\\?\\C:\\Users\\file.txt");
 *   assertEquals(path.toNamespacedPath("\\\\server\\share\\file.txt"), "\\\\?\\UNC\\server\\share\\file.txt");
 * } else {
 *   // On POSIX, toNamespacedPath returns the path unchanged
 *   assertEquals(path.toNamespacedPath("/home/user/file.txt"), "/home/user/file.txt");
 * }
 * ```
 *
 * ## Glob Pattern Utilities
 *
 * ```ts
 * import * as path from "@std/path";
 * import { assertEquals } from "@std/assert";
 *
 * // Check if a string is a glob pattern
 * assertEquals(path.isGlob("*.txt"), true);
 *
 * // Convert glob pattern to RegExp
 * const pattern = path.globToRegExp("*.txt");
 * assertEquals(pattern.test("file.txt"), true);
 *
 * // Join multiple glob patterns
 * if (Deno.build.os === "windows") {
 *   assertEquals(path.joinGlobs(["src", "**\\*.ts"]), "src\\**\\*.ts");
 * } else {
 *   assertEquals(path.joinGlobs(["src", "**\/*.ts"]), "src/**\/*.ts");
 * }
 *
 * // Normalize a glob pattern
 * if (Deno.build.os === "windows") {
 *   assertEquals(path.normalizeGlob("src\\..\\**\\*.ts"), "**\\*.ts");
 * } else {
 *   assertEquals(path.normalizeGlob("src/../**\/*.ts"), "**\/*.ts");
 * }
 * ```
 *
 * For POSIX-specific functions:
 *
 * ```ts
 * import { fromFileUrl } from "@std/path/posix/from-file-url";
 * import { assertEquals } from "@std/assert";
 *
 * assertEquals(fromFileUrl("file:///home/foo"), "/home/foo");
 * ```
 *
 * For Windows-specific functions:
 *
 * ```ts
 * import { fromFileUrl } from "@std/path/windows/from-file-url";
 * import { assertEquals } from "@std/assert";
 *
 * assertEquals(fromFileUrl("file:///home/foo"), "\\home\\foo");
 * ```
 *
 * Functions for working with URLs can be found in
 * {@link ./doc/posix/~ | @std/path/posix}.
 *
 * @module
 */ export * from "./basename.ts";
export * from "./constants.ts";
export * from "./dirname.ts";
export * from "./extname.ts";
export * from "./format.ts";
export * from "./from_file_url.ts";
export * from "./is_absolute.ts";
export * from "./join.ts";
export * from "./normalize.ts";
export * from "./parse.ts";
export * from "./relative.ts";
export * from "./resolve.ts";
export * from "./to_file_url.ts";
export * from "./to_namespaced_path.ts";
export * from "./common.ts";
export * from "./types.ts";
export * from "./glob_to_regexp.ts";
export * from "./is_glob.ts";
export * from "./join_globs.ts";
export * from "./normalize_glob.ts";
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGU6Ly8vaG9tZS9ydW5uZXIvd29yay9jcmVhdGUtcHVyZXNjcmlwdC1kZW5vLXByb2plY3QvY3JlYXRlLXB1cmVzY3JpcHQtZGVuby1wcm9qZWN0L3ZlbmRvci9Ac3RkL3BhdGhAMS4wLjkvbW9kLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAyMDE4LTIwMjUgdGhlIERlbm8gYXV0aG9ycy4gTUlUIGxpY2Vuc2UuXG4vLyBDb3B5cmlnaHQgdGhlIEJyb3dzZXJpZnkgYXV0aG9ycy4gTUlUIExpY2Vuc2UuXG4vLyBQb3J0ZWQgbW9zdGx5IGZyb20gaHR0cHM6Ly9naXRodWIuY29tL2Jyb3dzZXJpZnkvcGF0aC1icm93c2VyaWZ5L1xuLy8gVGhpcyBtb2R1bGUgaXMgYnJvd3NlciBjb21wYXRpYmxlLlxuXG4vKipcbiAqIFV0aWxpdGllcyBmb3Igd29ya2luZyB3aXRoIE9TLXNwZWNpZmljIGZpbGUgcGF0aHMuXG4gKlxuICogRnVuY3Rpb25zIGZyb20gdGhpcyBtb2R1bGUgd2lsbCBhdXRvbWF0aWNhbGx5IHN3aXRjaCB0byBzdXBwb3J0IHRoZSBwYXRoIHN0eWxlXG4gKiBvZiB0aGUgY3VycmVudCBPUywgZWl0aGVyIGB3aW5kb3dzYCBmb3IgTWljcm9zb2Z0IFdpbmRvd3MsIG9yIGBwb3NpeGAgZm9yXG4gKiBldmVyeSBvdGhlciBvcGVyYXRpbmcgc3lzdGVtLCBlZy4gTGludXgsIE1hY09TLCBCU0QgZXRjLlxuICpcbiAqIFRvIHVzZSBmdW5jdGlvbnMgZm9yIGEgc3BlY2lmaWMgcGF0aCBzdHlsZSByZWdhcmRsZXNzIG9mIHRoZSBjdXJyZW50IE9TXG4gKiBpbXBvcnQgdGhlIG1vZHVsZXMgZnJvbSB0aGUgcGxhdGZvcm0gc3ViIGRpcmVjdG9yeSBpbnN0ZWFkLlxuICpcbiAqICMjIEJhc2ljIFBhdGggT3BlcmF0aW9uc1xuICpcbiAqIGBgYHRzXG4gKiBpbXBvcnQgKiBhcyBwYXRoIGZyb20gXCJAc3RkL3BhdGhcIjtcbiAqIGltcG9ydCB7IGFzc2VydEVxdWFscyB9IGZyb20gXCJAc3RkL2Fzc2VydFwiO1xuICpcbiAqIC8vIEdldCBjb21wb25lbnRzIG9mIGEgcGF0aFxuICogaWYgKERlbm8uYnVpbGQub3MgPT09IFwid2luZG93c1wiKSB7XG4gKiAgIGFzc2VydEVxdWFscyhwYXRoLmJhc2VuYW1lKFwiQzpcXFxcVXNlcnNcXFxcdXNlclxcXFxmaWxlLnR4dFwiKSwgXCJmaWxlLnR4dFwiKTtcbiAqICAgYXNzZXJ0RXF1YWxzKHBhdGguZGlybmFtZShcIkM6XFxcXFVzZXJzXFxcXHVzZXJcXFxcZmlsZS50eHRcIiksIFwiQzpcXFxcVXNlcnNcXFxcdXNlclwiKTtcbiAqICAgYXNzZXJ0RXF1YWxzKHBhdGguZXh0bmFtZShcIkM6XFxcXFVzZXJzXFxcXHVzZXJcXFxcZmlsZS50eHRcIiksIFwiLnR4dFwiKTtcbiAqIH0gZWxzZSB7XG4gKiAgIGFzc2VydEVxdWFscyhwYXRoLmJhc2VuYW1lKFwiL2hvbWUvdXNlci9maWxlLnR4dFwiKSwgXCJmaWxlLnR4dFwiKTtcbiAqICAgYXNzZXJ0RXF1YWxzKHBhdGguZGlybmFtZShcIi9ob21lL3VzZXIvZmlsZS50eHRcIiksIFwiL2hvbWUvdXNlclwiKTtcbiAqICAgYXNzZXJ0RXF1YWxzKHBhdGguZXh0bmFtZShcIi9ob21lL3VzZXIvZmlsZS50eHRcIiksIFwiLnR4dFwiKTtcbiAqIH1cbiAqXG4gKiAvLyBKb2luIHBhdGggc2VnbWVudHNcbiAqIGlmIChEZW5vLmJ1aWxkLm9zID09PSBcIndpbmRvd3NcIikge1xuICogICBhc3NlcnRFcXVhbHMocGF0aC5qb2luKFwiQzpcXFxcXCIsIFwiVXNlcnNcIiwgXCJkb2NzXCIsIFwiZmlsZS50eHRcIiksIFwiQzpcXFxcVXNlcnNcXFxcZG9jc1xcXFxmaWxlLnR4dFwiKTtcbiAqIH0gZWxzZSB7XG4gKiAgIGFzc2VydEVxdWFscyhwYXRoLmpvaW4oXCIvaG9tZVwiLCBcInVzZXJcIiwgXCJkb2NzXCIsIFwiZmlsZS50eHRcIiksIFwiL2hvbWUvdXNlci9kb2NzL2ZpbGUudHh0XCIpO1xuICogfVxuICpcbiAqIC8vIE5vcm1hbGl6ZSBhIHBhdGhcbiAqIGlmIChEZW5vLmJ1aWxkLm9zID09PSBcIndpbmRvd3NcIikge1xuICogICBhc3NlcnRFcXVhbHMocGF0aC5ub3JtYWxpemUoXCJDOlxcXFxVc2Vyc1xcXFx1c2VyXFxcXC4uXFxcXHRlbXBcXFxcLlxcXFxmaWxlLnR4dFwiKSwgXCJDOlxcXFxVc2Vyc1xcXFx0ZW1wXFxcXGZpbGUudHh0XCIpO1xuICogfSBlbHNlIHtcbiAqICAgYXNzZXJ0RXF1YWxzKHBhdGgubm9ybWFsaXplKFwiL2hvbWUvdXNlci8uLi90ZW1wLy4vZmlsZS50eHRcIiksIFwiL2hvbWUvdGVtcC9maWxlLnR4dFwiKTtcbiAqIH1cbiAqXG4gKiAvLyBSZXNvbHZlIGFic29sdXRlIHBhdGhcbiAqIGlmIChEZW5vLmJ1aWxkLm9zID09PSBcIndpbmRvd3NcIikge1xuICogICBjb25zdCByZXNvbHZlZCA9IHBhdGgucmVzb2x2ZShcIkM6XFxcXGZvb1wiLCBcImRvY3NcIiwgXCJmaWxlLnR4dFwiKTtcbiAqICAgYXNzZXJ0RXF1YWxzKHJlc29sdmVkLCBcIkM6XFxcXGZvb1xcXFxkb2NzXFxcXGZpbGUudHh0XCIpO1xuICogICBhc3NlcnRFcXVhbHMocGF0aC5pc0Fic29sdXRlKHJlc29sdmVkKSwgdHJ1ZSk7XG4gKiB9IGVsc2Uge1xuICogICBjb25zdCByZXNvbHZlZCA9IHBhdGgucmVzb2x2ZShcIi9mb29cIiwgXCJkb2NzXCIsIFwiZmlsZS50eHRcIik7XG4gKiAgIGFzc2VydEVxdWFscyhyZXNvbHZlZCwgXCIvZm9vL2RvY3MvZmlsZS50eHRcIik7XG4gKiAgIGFzc2VydEVxdWFscyhwYXRoLmlzQWJzb2x1dGUocmVzb2x2ZWQpLCB0cnVlKTtcbiAqIH1cbiAqXG4gKiAvLyBHZXQgcmVsYXRpdmUgcGF0aFxuICogaWYgKERlbm8uYnVpbGQub3MgPT09IFwid2luZG93c1wiKSB7XG4gKiAgIGFzc2VydEVxdWFscyhwYXRoLnJlbGF0aXZlKFwiQzpcXFxcVXNlcnNcIiwgXCJDOlxcXFxVc2Vyc1xcXFxkb2NzXFxcXGZpbGUudHh0XCIpLCBcImRvY3NcXFxcZmlsZS50eHRcIik7XG4gKiAgIGFzc2VydEVxdWFscyhwYXRoLnJlbGF0aXZlKFwiQzpcXFxcVXNlcnNcIiwgXCJEOlxcXFxQcm9ncmFtc1wiKSwgXCJEOlxcXFxQcm9ncmFtc1wiKTtcbiAqIH0gZWxzZSB7XG4gKiAgIGFzc2VydEVxdWFscyhwYXRoLnJlbGF0aXZlKFwiL2hvbWUvdXNlclwiLCBcIi9ob21lL3VzZXIvZG9jcy9maWxlLnR4dFwiKSwgXCJkb2NzL2ZpbGUudHh0XCIpO1xuICogICBhc3NlcnRFcXVhbHMocGF0aC5yZWxhdGl2ZShcIi9ob21lL3VzZXJcIiwgXCIvdmFyL2RhdGFcIiksIFwiLi4vLi4vdmFyL2RhdGFcIik7XG4gKiB9XG4gKiBgYGBcbiAqXG4gKiAjIyBQYXRoIFBhcnNpbmcgYW5kIEZvcm1hdHRpbmdcbiAqXG4gKiBgYGB0c1xuICogaW1wb3J0ICogYXMgcGF0aCBmcm9tIFwiQHN0ZC9wYXRoXCI7XG4gKiBpbXBvcnQgeyBhc3NlcnRFcXVhbHMgfSBmcm9tIFwiQHN0ZC9hc3NlcnRcIjtcbiAqXG4gKiBpZiAoRGVuby5idWlsZC5vcyA9PT0gXCJ3aW5kb3dzXCIpIHtcbiAqICAgY29uc3QgcGFyc2VkV2luZG93cyA9IHBhdGgucGFyc2UoXCJDOlxcXFxVc2Vyc1xcXFx1c2VyXFxcXGZpbGUudHh0XCIpO1xuICogICBhc3NlcnRFcXVhbHMocGFyc2VkV2luZG93cy5yb290LCBcIkM6XFxcXFwiKTtcbiAqICAgYXNzZXJ0RXF1YWxzKHBhcnNlZFdpbmRvd3MuZGlyLCBcIkM6XFxcXFVzZXJzXFxcXHVzZXJcIik7XG4gKiAgIGFzc2VydEVxdWFscyhwYXJzZWRXaW5kb3dzLmJhc2UsIFwiZmlsZS50eHRcIik7XG4gKiAgIGFzc2VydEVxdWFscyhwYXJzZWRXaW5kb3dzLmV4dCwgXCIudHh0XCIpO1xuICogICBhc3NlcnRFcXVhbHMocGFyc2VkV2luZG93cy5uYW1lLCBcImZpbGVcIik7XG4gKlxuICogICAvLyBGb3JtYXQgcGF0aCBmcm9tIGNvbXBvbmVudHMgKFdpbmRvd3MpXG4gKiAgIGFzc2VydEVxdWFscyhcbiAqICAgICBwYXRoLmZvcm1hdCh7IGRpcjogXCJDOlxcXFxVc2Vyc1xcXFx1c2VyXCIsIGJhc2U6IFwiZmlsZS50eHRcIiB9KSxcbiAqICAgICBcIkM6XFxcXFVzZXJzXFxcXHVzZXJcXFxcZmlsZS50eHRcIlxuICogICApO1xuICogfSBlbHNlIHtcbiAqICAgY29uc3QgcGFyc2VkUG9zaXggPSBwYXRoLnBhcnNlKFwiL2hvbWUvdXNlci9maWxlLnR4dFwiKTtcbiAqICAgYXNzZXJ0RXF1YWxzKHBhcnNlZFBvc2l4LnJvb3QsIFwiL1wiKTtcbiAqICAgYXNzZXJ0RXF1YWxzKHBhcnNlZFBvc2l4LmRpciwgXCIvaG9tZS91c2VyXCIpO1xuICogICBhc3NlcnRFcXVhbHMocGFyc2VkUG9zaXguYmFzZSwgXCJmaWxlLnR4dFwiKTtcbiAqICAgYXNzZXJ0RXF1YWxzKHBhcnNlZFBvc2l4LmV4dCwgXCIudHh0XCIpO1xuICogICBhc3NlcnRFcXVhbHMocGFyc2VkUG9zaXgubmFtZSwgXCJmaWxlXCIpO1xuICpcbiAqICAgLy8gRm9ybWF0IHBhdGggZnJvbSBjb21wb25lbnRzIChQT1NJWClcbiAqICAgYXNzZXJ0RXF1YWxzKFxuICogICAgIHBhdGguZm9ybWF0KHsgZGlyOiBcIi9ob21lL3VzZXJcIiwgYmFzZTogXCJmaWxlLnR4dFwiIH0pLFxuICogICAgIFwiL2hvbWUvdXNlci9maWxlLnR4dFwiXG4gKiAgICk7XG4gKiB9XG4gKiBgYGBcbiAqXG4gKiAjIyBVUkwgQ29udmVyc2lvblxuICpcbiAqIGBgYHRzXG4gKiBpbXBvcnQgKiBhcyBwYXRoIGZyb20gXCJAc3RkL3BhdGhcIjtcbiAqIGltcG9ydCB7IGFzc2VydEVxdWFscyB9IGZyb20gXCJAc3RkL2Fzc2VydFwiO1xuICpcbiAqIC8vIENvbnZlcnQgYmV0d2VlbiBmaWxlIFVSTHMgYW5kIHBhdGhzXG4gKiBpZiAoRGVuby5idWlsZC5vcyA9PT0gXCJ3aW5kb3dzXCIpIHtcbiAqICAgYXNzZXJ0RXF1YWxzKHBhdGguZnJvbUZpbGVVcmwoXCJmaWxlOi8vL0M6L1VzZXJzL3VzZXIvZmlsZS50eHRcIiksIFwiQzpcXFxcVXNlcnNcXFxcdXNlclxcXFxmaWxlLnR4dFwiKTtcbiAqICAgYXNzZXJ0RXF1YWxzKHBhdGgudG9GaWxlVXJsKFwiQzpcXFxcVXNlcnNcXFxcdXNlclxcXFxmaWxlLnR4dFwiKS5ocmVmLCBcImZpbGU6Ly8vQzovVXNlcnMvdXNlci9maWxlLnR4dFwiKTtcbiAqIH0gZWxzZSB7XG4gKiAgIGFzc2VydEVxdWFscyhwYXRoLmZyb21GaWxlVXJsKFwiZmlsZTovLy9ob21lL3VzZXIvZmlsZS50eHRcIiksIFwiL2hvbWUvdXNlci9maWxlLnR4dFwiKTtcbiAqICAgYXNzZXJ0RXF1YWxzKHBhdGgudG9GaWxlVXJsKFwiL2hvbWUvdXNlci9maWxlLnR4dFwiKS5ocmVmLCBcImZpbGU6Ly8vaG9tZS91c2VyL2ZpbGUudHh0XCIpO1xuICogfVxuICogYGBgXG4gKlxuICogIyMgUGF0aCBQcm9wZXJ0aWVzXG4gKlxuICogYGBgdHNcbiAqIGltcG9ydCAqIGFzIHBhdGggZnJvbSBcIkBzdGQvcGF0aFwiO1xuICogaW1wb3J0IHsgYXNzZXJ0RXF1YWxzIH0gZnJvbSBcIkBzdGQvYXNzZXJ0XCI7XG4gKlxuICogLy8gQ2hlY2sgaWYgcGF0aCBpcyBhYnNvbHV0ZVxuICogaWYgKERlbm8uYnVpbGQub3MgPT09IFwid2luZG93c1wiKSB7XG4gKiAgIGFzc2VydEVxdWFscyhwYXRoLmlzQWJzb2x1dGUoXCJDOlxcXFxVc2Vyc1wiKSwgdHJ1ZSk7XG4gKiAgIGFzc2VydEVxdWFscyhwYXRoLmlzQWJzb2x1dGUoXCJcXFxcXFxcXFNlcnZlclxcXFxzaGFyZVwiKSwgdHJ1ZSk7XG4gKiAgIGFzc2VydEVxdWFscyhwYXRoLmlzQWJzb2x1dGUoXCJDOnJlbGF0aXZlXFxcXHBhdGhcIiksIGZhbHNlKTtcbiAqICAgYXNzZXJ0RXF1YWxzKHBhdGguaXNBYnNvbHV0ZShcIi4uXFxcXHJlbGF0aXZlXFxcXHBhdGhcIiksIGZhbHNlKTtcbiAqIH0gZWxzZSB7XG4gKiAgIGFzc2VydEVxdWFscyhwYXRoLmlzQWJzb2x1dGUoXCIvaG9tZS91c2VyXCIpLCB0cnVlKTtcbiAqICAgYXNzZXJ0RXF1YWxzKHBhdGguaXNBYnNvbHV0ZShcIi4vcmVsYXRpdmUvcGF0aFwiKSwgZmFsc2UpO1xuICogICBhc3NlcnRFcXVhbHMocGF0aC5pc0Fic29sdXRlKFwiLi4vcmVsYXRpdmUvcGF0aFwiKSwgZmFsc2UpO1xuICogfVxuICpcbiAqIC8vIENvbnZlcnQgdG8gbmFtZXNwYWNlZCBwYXRoIChXaW5kb3dzLXNwZWNpZmljKVxuICogaWYgKERlbm8uYnVpbGQub3MgPT09IFwid2luZG93c1wiKSB7XG4gKiAgIGFzc2VydEVxdWFscyhwYXRoLnRvTmFtZXNwYWNlZFBhdGgoXCJDOlxcXFxVc2Vyc1xcXFxmaWxlLnR4dFwiKSwgXCJcXFxcXFxcXD9cXFxcQzpcXFxcVXNlcnNcXFxcZmlsZS50eHRcIik7XG4gKiAgIGFzc2VydEVxdWFscyhwYXRoLnRvTmFtZXNwYWNlZFBhdGgoXCJcXFxcXFxcXHNlcnZlclxcXFxzaGFyZVxcXFxmaWxlLnR4dFwiKSwgXCJcXFxcXFxcXD9cXFxcVU5DXFxcXHNlcnZlclxcXFxzaGFyZVxcXFxmaWxlLnR4dFwiKTtcbiAqIH0gZWxzZSB7XG4gKiAgIC8vIE9uIFBPU0lYLCB0b05hbWVzcGFjZWRQYXRoIHJldHVybnMgdGhlIHBhdGggdW5jaGFuZ2VkXG4gKiAgIGFzc2VydEVxdWFscyhwYXRoLnRvTmFtZXNwYWNlZFBhdGgoXCIvaG9tZS91c2VyL2ZpbGUudHh0XCIpLCBcIi9ob21lL3VzZXIvZmlsZS50eHRcIik7XG4gKiB9XG4gKiBgYGBcbiAqXG4gKiAjIyBHbG9iIFBhdHRlcm4gVXRpbGl0aWVzXG4gKlxuICogYGBgdHNcbiAqIGltcG9ydCAqIGFzIHBhdGggZnJvbSBcIkBzdGQvcGF0aFwiO1xuICogaW1wb3J0IHsgYXNzZXJ0RXF1YWxzIH0gZnJvbSBcIkBzdGQvYXNzZXJ0XCI7XG4gKlxuICogLy8gQ2hlY2sgaWYgYSBzdHJpbmcgaXMgYSBnbG9iIHBhdHRlcm5cbiAqIGFzc2VydEVxdWFscyhwYXRoLmlzR2xvYihcIioudHh0XCIpLCB0cnVlKTtcbiAqXG4gKiAvLyBDb252ZXJ0IGdsb2IgcGF0dGVybiB0byBSZWdFeHBcbiAqIGNvbnN0IHBhdHRlcm4gPSBwYXRoLmdsb2JUb1JlZ0V4cChcIioudHh0XCIpO1xuICogYXNzZXJ0RXF1YWxzKHBhdHRlcm4udGVzdChcImZpbGUudHh0XCIpLCB0cnVlKTtcbiAqXG4gKiAvLyBKb2luIG11bHRpcGxlIGdsb2IgcGF0dGVybnNcbiAqIGlmIChEZW5vLmJ1aWxkLm9zID09PSBcIndpbmRvd3NcIikge1xuICogICBhc3NlcnRFcXVhbHMocGF0aC5qb2luR2xvYnMoW1wic3JjXCIsIFwiKipcXFxcKi50c1wiXSksIFwic3JjXFxcXCoqXFxcXCoudHNcIik7XG4gKiB9IGVsc2Uge1xuICogICBhc3NlcnRFcXVhbHMocGF0aC5qb2luR2xvYnMoW1wic3JjXCIsIFwiKipcXC8qLnRzXCJdKSwgXCJzcmMvKipcXC8qLnRzXCIpO1xuICogfVxuICpcbiAqIC8vIE5vcm1hbGl6ZSBhIGdsb2IgcGF0dGVyblxuICogaWYgKERlbm8uYnVpbGQub3MgPT09IFwid2luZG93c1wiKSB7XG4gKiAgIGFzc2VydEVxdWFscyhwYXRoLm5vcm1hbGl6ZUdsb2IoXCJzcmNcXFxcLi5cXFxcKipcXFxcKi50c1wiKSwgXCIqKlxcXFwqLnRzXCIpO1xuICogfSBlbHNlIHtcbiAqICAgYXNzZXJ0RXF1YWxzKHBhdGgubm9ybWFsaXplR2xvYihcInNyYy8uLi8qKlxcLyoudHNcIiksIFwiKipcXC8qLnRzXCIpO1xuICogfVxuICogYGBgXG4gKlxuICogRm9yIFBPU0lYLXNwZWNpZmljIGZ1bmN0aW9uczpcbiAqXG4gKiBgYGB0c1xuICogaW1wb3J0IHsgZnJvbUZpbGVVcmwgfSBmcm9tIFwiQHN0ZC9wYXRoL3Bvc2l4L2Zyb20tZmlsZS11cmxcIjtcbiAqIGltcG9ydCB7IGFzc2VydEVxdWFscyB9IGZyb20gXCJAc3RkL2Fzc2VydFwiO1xuICpcbiAqIGFzc2VydEVxdWFscyhmcm9tRmlsZVVybChcImZpbGU6Ly8vaG9tZS9mb29cIiksIFwiL2hvbWUvZm9vXCIpO1xuICogYGBgXG4gKlxuICogRm9yIFdpbmRvd3Mtc3BlY2lmaWMgZnVuY3Rpb25zOlxuICpcbiAqIGBgYHRzXG4gKiBpbXBvcnQgeyBmcm9tRmlsZVVybCB9IGZyb20gXCJAc3RkL3BhdGgvd2luZG93cy9mcm9tLWZpbGUtdXJsXCI7XG4gKiBpbXBvcnQgeyBhc3NlcnRFcXVhbHMgfSBmcm9tIFwiQHN0ZC9hc3NlcnRcIjtcbiAqXG4gKiBhc3NlcnRFcXVhbHMoZnJvbUZpbGVVcmwoXCJmaWxlOi8vL2hvbWUvZm9vXCIpLCBcIlxcXFxob21lXFxcXGZvb1wiKTtcbiAqIGBgYFxuICpcbiAqIEZ1bmN0aW9ucyBmb3Igd29ya2luZyB3aXRoIFVSTHMgY2FuIGJlIGZvdW5kIGluXG4gKiB7QGxpbmsgLi9kb2MvcG9zaXgvfiB8IEBzdGQvcGF0aC9wb3NpeH0uXG4gKlxuICogQG1vZHVsZVxuICovXG5leHBvcnQgKiBmcm9tIFwiLi9iYXNlbmFtZS50c1wiO1xuZXhwb3J0ICogZnJvbSBcIi4vY29uc3RhbnRzLnRzXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9kaXJuYW1lLnRzXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9leHRuYW1lLnRzXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9mb3JtYXQudHNcIjtcbmV4cG9ydCAqIGZyb20gXCIuL2Zyb21fZmlsZV91cmwudHNcIjtcbmV4cG9ydCAqIGZyb20gXCIuL2lzX2Fic29sdXRlLnRzXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9qb2luLnRzXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9ub3JtYWxpemUudHNcIjtcbmV4cG9ydCAqIGZyb20gXCIuL3BhcnNlLnRzXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9yZWxhdGl2ZS50c1wiO1xuZXhwb3J0ICogZnJvbSBcIi4vcmVzb2x2ZS50c1wiO1xuZXhwb3J0ICogZnJvbSBcIi4vdG9fZmlsZV91cmwudHNcIjtcbmV4cG9ydCAqIGZyb20gXCIuL3RvX25hbWVzcGFjZWRfcGF0aC50c1wiO1xuZXhwb3J0ICogZnJvbSBcIi4vY29tbW9uLnRzXCI7XG5leHBvcnQgKiBmcm9tIFwiLi90eXBlcy50c1wiO1xuZXhwb3J0ICogZnJvbSBcIi4vZ2xvYl90b19yZWdleHAudHNcIjtcbmV4cG9ydCAqIGZyb20gXCIuL2lzX2dsb2IudHNcIjtcbmV4cG9ydCAqIGZyb20gXCIuL2pvaW5fZ2xvYnMudHNcIjtcbmV4cG9ydCAqIGZyb20gXCIuL25vcm1hbGl6ZV9nbG9iLnRzXCI7XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEscURBQXFEO0FBQ3JELGlEQUFpRDtBQUNqRCxvRUFBb0U7QUFDcEUscUNBQXFDO0FBRXJDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztDQStMQyxHQUNELGNBQWMsZ0JBQWdCO0FBQzlCLGNBQWMsaUJBQWlCO0FBQy9CLGNBQWMsZUFBZTtBQUM3QixjQUFjLGVBQWU7QUFDN0IsY0FBYyxjQUFjO0FBQzVCLGNBQWMscUJBQXFCO0FBQ25DLGNBQWMsbUJBQW1CO0FBQ2pDLGNBQWMsWUFBWTtBQUMxQixjQUFjLGlCQUFpQjtBQUMvQixjQUFjLGFBQWE7QUFDM0IsY0FBYyxnQkFBZ0I7QUFDOUIsY0FBYyxlQUFlO0FBQzdCLGNBQWMsbUJBQW1CO0FBQ2pDLGNBQWMsMEJBQTBCO0FBQ3hDLGNBQWMsY0FBYztBQUM1QixjQUFjLGFBQWE7QUFDM0IsY0FBYyxzQkFBc0I7QUFDcEMsY0FBYyxlQUFlO0FBQzdCLGNBQWMsa0JBQWtCO0FBQ2hDLGNBQWMsc0JBQXNCIn0=
// denoCacheMetadata=5940517104871791111,18190757426312990696