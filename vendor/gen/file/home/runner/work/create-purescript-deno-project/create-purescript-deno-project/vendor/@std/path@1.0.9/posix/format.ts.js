// Copyright 2018-2025 the Deno authors. MIT license.
// This module is browser compatible.
import { _format, assertArg } from "../_common/format.ts";
/**
 * Generate a path from `ParsedPath` object.
 *
 * @example Usage
 * ```ts
 * import { format } from "@std/path/posix/format";
 * import { assertEquals } from "@std/assert";
 *
 * const path = format({
 *   root: "/",
 *   dir: "/path/dir",
 *   base: "file.txt",
 *   ext: ".txt",
 *   name: "file"
 * });
 * assertEquals(path, "/path/dir/file.txt");
 * ```
 *
 * @param pathObject The path object to format.
 * @returns The formatted path.
 */ export function format(pathObject) {
  assertArg(pathObject);
  return _format("/", pathObject);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGU6Ly8vaG9tZS9ydW5uZXIvd29yay9jcmVhdGUtcHVyZXNjcmlwdC1kZW5vLXByb2plY3QvY3JlYXRlLXB1cmVzY3JpcHQtZGVuby1wcm9qZWN0L3ZlbmRvci9Ac3RkL3BhdGhAMS4wLjkvcG9zaXgvZm9ybWF0LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAyMDE4LTIwMjUgdGhlIERlbm8gYXV0aG9ycy4gTUlUIGxpY2Vuc2UuXG4vLyBUaGlzIG1vZHVsZSBpcyBicm93c2VyIGNvbXBhdGlibGUuXG5cbmltcG9ydCB7IF9mb3JtYXQsIGFzc2VydEFyZyB9IGZyb20gXCIuLi9fY29tbW9uL2Zvcm1hdC50c1wiO1xuaW1wb3J0IHR5cGUgeyBQYXJzZWRQYXRoIH0gZnJvbSBcIi4uL3R5cGVzLnRzXCI7XG5cbi8qKlxuICogR2VuZXJhdGUgYSBwYXRoIGZyb20gYFBhcnNlZFBhdGhgIG9iamVjdC5cbiAqXG4gKiBAZXhhbXBsZSBVc2FnZVxuICogYGBgdHNcbiAqIGltcG9ydCB7IGZvcm1hdCB9IGZyb20gXCJAc3RkL3BhdGgvcG9zaXgvZm9ybWF0XCI7XG4gKiBpbXBvcnQgeyBhc3NlcnRFcXVhbHMgfSBmcm9tIFwiQHN0ZC9hc3NlcnRcIjtcbiAqXG4gKiBjb25zdCBwYXRoID0gZm9ybWF0KHtcbiAqICAgcm9vdDogXCIvXCIsXG4gKiAgIGRpcjogXCIvcGF0aC9kaXJcIixcbiAqICAgYmFzZTogXCJmaWxlLnR4dFwiLFxuICogICBleHQ6IFwiLnR4dFwiLFxuICogICBuYW1lOiBcImZpbGVcIlxuICogfSk7XG4gKiBhc3NlcnRFcXVhbHMocGF0aCwgXCIvcGF0aC9kaXIvZmlsZS50eHRcIik7XG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0gcGF0aE9iamVjdCBUaGUgcGF0aCBvYmplY3QgdG8gZm9ybWF0LlxuICogQHJldHVybnMgVGhlIGZvcm1hdHRlZCBwYXRoLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZm9ybWF0KHBhdGhPYmplY3Q6IFBhcnRpYWw8UGFyc2VkUGF0aD4pOiBzdHJpbmcge1xuICBhc3NlcnRBcmcocGF0aE9iamVjdCk7XG4gIHJldHVybiBfZm9ybWF0KFwiL1wiLCBwYXRoT2JqZWN0KTtcbn1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxxREFBcUQ7QUFDckQscUNBQXFDO0FBRXJDLFNBQVMsT0FBTyxFQUFFLFNBQVMsUUFBUSx1QkFBdUI7QUFHMUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0NBb0JDLEdBQ0QsT0FBTyxTQUFTLE9BQU8sVUFBK0I7RUFDcEQsVUFBVTtFQUNWLE9BQU8sUUFBUSxLQUFLO0FBQ3RCIn0=
// denoCacheMetadata=14662322123595235360,16460282516806103809