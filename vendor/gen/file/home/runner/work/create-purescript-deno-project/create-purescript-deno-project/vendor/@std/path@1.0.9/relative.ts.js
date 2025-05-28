// Copyright 2018-2025 the Deno authors. MIT license.
// This module is browser compatible.
import { isWindows } from "./_os.ts";
import { relative as posixRelative } from "./posix/relative.ts";
import { relative as windowsRelative } from "./windows/relative.ts";
/**
 * Return the relative path from `from` to `to` based on current working
 * directory.
 *
 * @example Usage
 * ```ts
 * import { relative } from "@std/path/relative";
 * import { assertEquals } from "@std/assert";
 *
 * if (Deno.build.os === "windows") {
 *   const path = relative("C:\\foobar\\test\\aaa", "C:\\foobar\\impl\\bbb");
 *   assertEquals(path, "..\\..\\impl\\bbb");
 * } else {
 *   const path = relative("/data/foobar/test/aaa", "/data/foobar/impl/bbb");
 *   assertEquals(path, "../../impl/bbb");
 * }
 * ```
 *
 * @param from Path in current working directory.
 * @param to Path in current working directory.
 * @returns The relative path from `from` to `to`.
 */ export function relative(from, to) {
  return isWindows ? windowsRelative(from, to) : posixRelative(from, to);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGU6Ly8vaG9tZS9ydW5uZXIvd29yay9jcmVhdGUtcHVyZXNjcmlwdC1kZW5vLXByb2plY3QvY3JlYXRlLXB1cmVzY3JpcHQtZGVuby1wcm9qZWN0L3ZlbmRvci9Ac3RkL3BhdGhAMS4wLjkvcmVsYXRpdmUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IDIwMTgtMjAyNSB0aGUgRGVubyBhdXRob3JzLiBNSVQgbGljZW5zZS5cbi8vIFRoaXMgbW9kdWxlIGlzIGJyb3dzZXIgY29tcGF0aWJsZS5cblxuaW1wb3J0IHsgaXNXaW5kb3dzIH0gZnJvbSBcIi4vX29zLnRzXCI7XG5pbXBvcnQgeyByZWxhdGl2ZSBhcyBwb3NpeFJlbGF0aXZlIH0gZnJvbSBcIi4vcG9zaXgvcmVsYXRpdmUudHNcIjtcbmltcG9ydCB7IHJlbGF0aXZlIGFzIHdpbmRvd3NSZWxhdGl2ZSB9IGZyb20gXCIuL3dpbmRvd3MvcmVsYXRpdmUudHNcIjtcblxuLyoqXG4gKiBSZXR1cm4gdGhlIHJlbGF0aXZlIHBhdGggZnJvbSBgZnJvbWAgdG8gYHRvYCBiYXNlZCBvbiBjdXJyZW50IHdvcmtpbmdcbiAqIGRpcmVjdG9yeS5cbiAqXG4gKiBAZXhhbXBsZSBVc2FnZVxuICogYGBgdHNcbiAqIGltcG9ydCB7IHJlbGF0aXZlIH0gZnJvbSBcIkBzdGQvcGF0aC9yZWxhdGl2ZVwiO1xuICogaW1wb3J0IHsgYXNzZXJ0RXF1YWxzIH0gZnJvbSBcIkBzdGQvYXNzZXJ0XCI7XG4gKlxuICogaWYgKERlbm8uYnVpbGQub3MgPT09IFwid2luZG93c1wiKSB7XG4gKiAgIGNvbnN0IHBhdGggPSByZWxhdGl2ZShcIkM6XFxcXGZvb2JhclxcXFx0ZXN0XFxcXGFhYVwiLCBcIkM6XFxcXGZvb2JhclxcXFxpbXBsXFxcXGJiYlwiKTtcbiAqICAgYXNzZXJ0RXF1YWxzKHBhdGgsIFwiLi5cXFxcLi5cXFxcaW1wbFxcXFxiYmJcIik7XG4gKiB9IGVsc2Uge1xuICogICBjb25zdCBwYXRoID0gcmVsYXRpdmUoXCIvZGF0YS9mb29iYXIvdGVzdC9hYWFcIiwgXCIvZGF0YS9mb29iYXIvaW1wbC9iYmJcIik7XG4gKiAgIGFzc2VydEVxdWFscyhwYXRoLCBcIi4uLy4uL2ltcGwvYmJiXCIpO1xuICogfVxuICogYGBgXG4gKlxuICogQHBhcmFtIGZyb20gUGF0aCBpbiBjdXJyZW50IHdvcmtpbmcgZGlyZWN0b3J5LlxuICogQHBhcmFtIHRvIFBhdGggaW4gY3VycmVudCB3b3JraW5nIGRpcmVjdG9yeS5cbiAqIEByZXR1cm5zIFRoZSByZWxhdGl2ZSBwYXRoIGZyb20gYGZyb21gIHRvIGB0b2AuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZWxhdGl2ZShmcm9tOiBzdHJpbmcsIHRvOiBzdHJpbmcpOiBzdHJpbmcge1xuICByZXR1cm4gaXNXaW5kb3dzID8gd2luZG93c1JlbGF0aXZlKGZyb20sIHRvKSA6IHBvc2l4UmVsYXRpdmUoZnJvbSwgdG8pO1xufVxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLHFEQUFxRDtBQUNyRCxxQ0FBcUM7QUFFckMsU0FBUyxTQUFTLFFBQVEsV0FBVztBQUNyQyxTQUFTLFlBQVksYUFBYSxRQUFRLHNCQUFzQjtBQUNoRSxTQUFTLFlBQVksZUFBZSxRQUFRLHdCQUF3QjtBQUVwRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0NBcUJDLEdBQ0QsT0FBTyxTQUFTLFNBQVMsSUFBWSxFQUFFLEVBQVU7RUFDL0MsT0FBTyxZQUFZLGdCQUFnQixNQUFNLE1BQU0sY0FBYyxNQUFNO0FBQ3JFIn0=
// denoCacheMetadata=8867354105115324230,10749010101263206637