// Copyright 2018-2025 the Deno authors. MIT license.
// This module is browser compatible.
import { _format, assertArg } from "../_common/format.ts";
/**
 * Generate a path from `ParsedPath` object.
 *
 * @example Usage
 * ```ts
 * import { format } from "@std/path/windows/format";
 * import { assertEquals } from "@std/assert";
 *
 * const path = format({
 *   root: "C:\\",
 *   dir: "C:\\path\\dir",
 *   base: "file.txt",
 *   ext: ".txt",
 *   name: "file"
 * });
 * assertEquals(path, "C:\\path\\dir\\file.txt");
 * ```
 *
 * @param pathObject The path object to format.
 * @returns The formatted path.
 */ export function format(pathObject) {
  assertArg(pathObject);
  return _format("\\", pathObject);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGU6Ly8vaG9tZS9ydW5uZXIvd29yay9jcmVhdGUtcHVyZXNjcmlwdC1kZW5vLXByb2plY3QvY3JlYXRlLXB1cmVzY3JpcHQtZGVuby1wcm9qZWN0L3ZlbmRvci9Ac3RkL3BhdGhAMS4wLjkvd2luZG93cy9mb3JtYXQudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IDIwMTgtMjAyNSB0aGUgRGVubyBhdXRob3JzLiBNSVQgbGljZW5zZS5cbi8vIFRoaXMgbW9kdWxlIGlzIGJyb3dzZXIgY29tcGF0aWJsZS5cblxuaW1wb3J0IHsgX2Zvcm1hdCwgYXNzZXJ0QXJnIH0gZnJvbSBcIi4uL19jb21tb24vZm9ybWF0LnRzXCI7XG5pbXBvcnQgdHlwZSB7IFBhcnNlZFBhdGggfSBmcm9tIFwiLi4vdHlwZXMudHNcIjtcblxuLyoqXG4gKiBHZW5lcmF0ZSBhIHBhdGggZnJvbSBgUGFyc2VkUGF0aGAgb2JqZWN0LlxuICpcbiAqIEBleGFtcGxlIFVzYWdlXG4gKiBgYGB0c1xuICogaW1wb3J0IHsgZm9ybWF0IH0gZnJvbSBcIkBzdGQvcGF0aC93aW5kb3dzL2Zvcm1hdFwiO1xuICogaW1wb3J0IHsgYXNzZXJ0RXF1YWxzIH0gZnJvbSBcIkBzdGQvYXNzZXJ0XCI7XG4gKlxuICogY29uc3QgcGF0aCA9IGZvcm1hdCh7XG4gKiAgIHJvb3Q6IFwiQzpcXFxcXCIsXG4gKiAgIGRpcjogXCJDOlxcXFxwYXRoXFxcXGRpclwiLFxuICogICBiYXNlOiBcImZpbGUudHh0XCIsXG4gKiAgIGV4dDogXCIudHh0XCIsXG4gKiAgIG5hbWU6IFwiZmlsZVwiXG4gKiB9KTtcbiAqIGFzc2VydEVxdWFscyhwYXRoLCBcIkM6XFxcXHBhdGhcXFxcZGlyXFxcXGZpbGUudHh0XCIpO1xuICogYGBgXG4gKlxuICogQHBhcmFtIHBhdGhPYmplY3QgVGhlIHBhdGggb2JqZWN0IHRvIGZvcm1hdC5cbiAqIEByZXR1cm5zIFRoZSBmb3JtYXR0ZWQgcGF0aC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZvcm1hdChwYXRoT2JqZWN0OiBQYXJ0aWFsPFBhcnNlZFBhdGg+KTogc3RyaW5nIHtcbiAgYXNzZXJ0QXJnKHBhdGhPYmplY3QpO1xuICByZXR1cm4gX2Zvcm1hdChcIlxcXFxcIiwgcGF0aE9iamVjdCk7XG59XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEscURBQXFEO0FBQ3JELHFDQUFxQztBQUVyQyxTQUFTLE9BQU8sRUFBRSxTQUFTLFFBQVEsdUJBQXVCO0FBRzFEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztDQW9CQyxHQUNELE9BQU8sU0FBUyxPQUFPLFVBQStCO0VBQ3BELFVBQVU7RUFDVixPQUFPLFFBQVEsTUFBTTtBQUN2QiJ9
// denoCacheMetadata=7982955156825033215,11025088838942156490