// Copyright 2018-2025 the Deno authors. MIT license.
// This module is browser compatible.
import { assertArgs, lastPathSegment, stripSuffix } from "../_common/basename.ts";
import { fromFileUrl } from "./from_file_url.ts";
import { stripTrailingSeparators } from "../_common/strip_trailing_separators.ts";
import { isPosixPathSeparator } from "./_util.ts";
/**
 * Return the last portion of a `path`.
 * Trailing directory separators are ignored, and optional suffix is removed.
 *
 * @example Usage
 * ```ts
 * import { basename } from "@std/path/posix/basename";
 * import { assertEquals } from "@std/assert";
 *
 * assertEquals(basename("/home/user/Documents/"), "Documents");
 * assertEquals(basename("/home/user/Documents/image.png"), "image.png");
 * assertEquals(basename("/home/user/Documents/image.png", ".png"), "image");
 * assertEquals(basename(new URL("file:///home/user/Documents/image.png")), "image.png");
 * assertEquals(basename(new URL("file:///home/user/Documents/image.png"), ".png"), "image");
 * ```
 *
 * @example Working with URLs
 *
 * Note: This function doesn't automatically strip hash and query parts from
 * URLs. If your URL contains a hash or query, remove them before passing the
 * URL to the function. This can be done by passing the URL to `new URL(url)`,
 * and setting the `hash` and `search` properties to empty strings.
 *
 * ```ts
 * import { basename } from "@std/path/posix/basename";
 * import { assertEquals } from "@std/assert";
 *
 * assertEquals(basename("https://deno.land/std/path/mod.ts"), "mod.ts");
 * assertEquals(basename("https://deno.land/std/path/mod.ts", ".ts"), "mod");
 * assertEquals(basename("https://deno.land/std/path/mod.ts?a=b"), "mod.ts?a=b");
 * assertEquals(basename("https://deno.land/std/path/mod.ts#header"), "mod.ts#header");
 * ```
 *
 * @param path The path to extract the name from.
 * @param suffix The suffix to remove from extracted name.
 * @returns The extracted name.
 */ export function basename(path, suffix = "") {
  if (path instanceof URL) {
    path = fromFileUrl(path);
  }
  assertArgs(path, suffix);
  const lastSegment = lastPathSegment(path, isPosixPathSeparator);
  const strippedSegment = stripTrailingSeparators(lastSegment, isPosixPathSeparator);
  return suffix ? stripSuffix(strippedSegment, suffix) : strippedSegment;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGU6Ly8vaG9tZS9ydW5uZXIvd29yay9jcmVhdGUtcHVyZXNjcmlwdC1kZW5vLXByb2plY3QvY3JlYXRlLXB1cmVzY3JpcHQtZGVuby1wcm9qZWN0L3ZlbmRvci9Ac3RkL3BhdGhAMS4wLjkvcG9zaXgvYmFzZW5hbWUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IDIwMTgtMjAyNSB0aGUgRGVubyBhdXRob3JzLiBNSVQgbGljZW5zZS5cbi8vIFRoaXMgbW9kdWxlIGlzIGJyb3dzZXIgY29tcGF0aWJsZS5cblxuaW1wb3J0IHtcbiAgYXNzZXJ0QXJncyxcbiAgbGFzdFBhdGhTZWdtZW50LFxuICBzdHJpcFN1ZmZpeCxcbn0gZnJvbSBcIi4uL19jb21tb24vYmFzZW5hbWUudHNcIjtcbmltcG9ydCB7IGZyb21GaWxlVXJsIH0gZnJvbSBcIi4vZnJvbV9maWxlX3VybC50c1wiO1xuaW1wb3J0IHsgc3RyaXBUcmFpbGluZ1NlcGFyYXRvcnMgfSBmcm9tIFwiLi4vX2NvbW1vbi9zdHJpcF90cmFpbGluZ19zZXBhcmF0b3JzLnRzXCI7XG5pbXBvcnQgeyBpc1Bvc2l4UGF0aFNlcGFyYXRvciB9IGZyb20gXCIuL191dGlsLnRzXCI7XG5cbi8qKlxuICogUmV0dXJuIHRoZSBsYXN0IHBvcnRpb24gb2YgYSBgcGF0aGAuXG4gKiBUcmFpbGluZyBkaXJlY3Rvcnkgc2VwYXJhdG9ycyBhcmUgaWdub3JlZCwgYW5kIG9wdGlvbmFsIHN1ZmZpeCBpcyByZW1vdmVkLlxuICpcbiAqIEBleGFtcGxlIFVzYWdlXG4gKiBgYGB0c1xuICogaW1wb3J0IHsgYmFzZW5hbWUgfSBmcm9tIFwiQHN0ZC9wYXRoL3Bvc2l4L2Jhc2VuYW1lXCI7XG4gKiBpbXBvcnQgeyBhc3NlcnRFcXVhbHMgfSBmcm9tIFwiQHN0ZC9hc3NlcnRcIjtcbiAqXG4gKiBhc3NlcnRFcXVhbHMoYmFzZW5hbWUoXCIvaG9tZS91c2VyL0RvY3VtZW50cy9cIiksIFwiRG9jdW1lbnRzXCIpO1xuICogYXNzZXJ0RXF1YWxzKGJhc2VuYW1lKFwiL2hvbWUvdXNlci9Eb2N1bWVudHMvaW1hZ2UucG5nXCIpLCBcImltYWdlLnBuZ1wiKTtcbiAqIGFzc2VydEVxdWFscyhiYXNlbmFtZShcIi9ob21lL3VzZXIvRG9jdW1lbnRzL2ltYWdlLnBuZ1wiLCBcIi5wbmdcIiksIFwiaW1hZ2VcIik7XG4gKiBhc3NlcnRFcXVhbHMoYmFzZW5hbWUobmV3IFVSTChcImZpbGU6Ly8vaG9tZS91c2VyL0RvY3VtZW50cy9pbWFnZS5wbmdcIikpLCBcImltYWdlLnBuZ1wiKTtcbiAqIGFzc2VydEVxdWFscyhiYXNlbmFtZShuZXcgVVJMKFwiZmlsZTovLy9ob21lL3VzZXIvRG9jdW1lbnRzL2ltYWdlLnBuZ1wiKSwgXCIucG5nXCIpLCBcImltYWdlXCIpO1xuICogYGBgXG4gKlxuICogQGV4YW1wbGUgV29ya2luZyB3aXRoIFVSTHNcbiAqXG4gKiBOb3RlOiBUaGlzIGZ1bmN0aW9uIGRvZXNuJ3QgYXV0b21hdGljYWxseSBzdHJpcCBoYXNoIGFuZCBxdWVyeSBwYXJ0cyBmcm9tXG4gKiBVUkxzLiBJZiB5b3VyIFVSTCBjb250YWlucyBhIGhhc2ggb3IgcXVlcnksIHJlbW92ZSB0aGVtIGJlZm9yZSBwYXNzaW5nIHRoZVxuICogVVJMIHRvIHRoZSBmdW5jdGlvbi4gVGhpcyBjYW4gYmUgZG9uZSBieSBwYXNzaW5nIHRoZSBVUkwgdG8gYG5ldyBVUkwodXJsKWAsXG4gKiBhbmQgc2V0dGluZyB0aGUgYGhhc2hgIGFuZCBgc2VhcmNoYCBwcm9wZXJ0aWVzIHRvIGVtcHR5IHN0cmluZ3MuXG4gKlxuICogYGBgdHNcbiAqIGltcG9ydCB7IGJhc2VuYW1lIH0gZnJvbSBcIkBzdGQvcGF0aC9wb3NpeC9iYXNlbmFtZVwiO1xuICogaW1wb3J0IHsgYXNzZXJ0RXF1YWxzIH0gZnJvbSBcIkBzdGQvYXNzZXJ0XCI7XG4gKlxuICogYXNzZXJ0RXF1YWxzKGJhc2VuYW1lKFwiaHR0cHM6Ly9kZW5vLmxhbmQvc3RkL3BhdGgvbW9kLnRzXCIpLCBcIm1vZC50c1wiKTtcbiAqIGFzc2VydEVxdWFscyhiYXNlbmFtZShcImh0dHBzOi8vZGVuby5sYW5kL3N0ZC9wYXRoL21vZC50c1wiLCBcIi50c1wiKSwgXCJtb2RcIik7XG4gKiBhc3NlcnRFcXVhbHMoYmFzZW5hbWUoXCJodHRwczovL2Rlbm8ubGFuZC9zdGQvcGF0aC9tb2QudHM/YT1iXCIpLCBcIm1vZC50cz9hPWJcIik7XG4gKiBhc3NlcnRFcXVhbHMoYmFzZW5hbWUoXCJodHRwczovL2Rlbm8ubGFuZC9zdGQvcGF0aC9tb2QudHMjaGVhZGVyXCIpLCBcIm1vZC50cyNoZWFkZXJcIik7XG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0gcGF0aCBUaGUgcGF0aCB0byBleHRyYWN0IHRoZSBuYW1lIGZyb20uXG4gKiBAcGFyYW0gc3VmZml4IFRoZSBzdWZmaXggdG8gcmVtb3ZlIGZyb20gZXh0cmFjdGVkIG5hbWUuXG4gKiBAcmV0dXJucyBUaGUgZXh0cmFjdGVkIG5hbWUuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBiYXNlbmFtZShwYXRoOiBzdHJpbmcgfCBVUkwsIHN1ZmZpeCA9IFwiXCIpOiBzdHJpbmcge1xuICBpZiAocGF0aCBpbnN0YW5jZW9mIFVSTCkge1xuICAgIHBhdGggPSBmcm9tRmlsZVVybChwYXRoKTtcbiAgfVxuICBhc3NlcnRBcmdzKHBhdGgsIHN1ZmZpeCk7XG5cbiAgY29uc3QgbGFzdFNlZ21lbnQgPSBsYXN0UGF0aFNlZ21lbnQocGF0aCwgaXNQb3NpeFBhdGhTZXBhcmF0b3IpO1xuICBjb25zdCBzdHJpcHBlZFNlZ21lbnQgPSBzdHJpcFRyYWlsaW5nU2VwYXJhdG9ycyhcbiAgICBsYXN0U2VnbWVudCxcbiAgICBpc1Bvc2l4UGF0aFNlcGFyYXRvcixcbiAgKTtcbiAgcmV0dXJuIHN1ZmZpeCA/IHN0cmlwU3VmZml4KHN0cmlwcGVkU2VnbWVudCwgc3VmZml4KSA6IHN0cmlwcGVkU2VnbWVudDtcbn1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxxREFBcUQ7QUFDckQscUNBQXFDO0FBRXJDLFNBQ0UsVUFBVSxFQUNWLGVBQWUsRUFDZixXQUFXLFFBQ04seUJBQXlCO0FBQ2hDLFNBQVMsV0FBVyxRQUFRLHFCQUFxQjtBQUNqRCxTQUFTLHVCQUF1QixRQUFRLDBDQUEwQztBQUNsRixTQUFTLG9CQUFvQixRQUFRLGFBQWE7QUFFbEQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztDQW9DQyxHQUNELE9BQU8sU0FBUyxTQUFTLElBQWtCLEVBQUUsU0FBUyxFQUFFO0VBQ3RELElBQUksZ0JBQWdCLEtBQUs7SUFDdkIsT0FBTyxZQUFZO0VBQ3JCO0VBQ0EsV0FBVyxNQUFNO0VBRWpCLE1BQU0sY0FBYyxnQkFBZ0IsTUFBTTtFQUMxQyxNQUFNLGtCQUFrQix3QkFDdEIsYUFDQTtFQUVGLE9BQU8sU0FBUyxZQUFZLGlCQUFpQixVQUFVO0FBQ3pEIn0=
// denoCacheMetadata=6493970719687382702,14676180587044197457