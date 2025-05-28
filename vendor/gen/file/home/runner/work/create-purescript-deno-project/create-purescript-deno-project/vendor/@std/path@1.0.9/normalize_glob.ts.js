// Copyright 2018-2025 the Deno authors. MIT license.
// This module is browser compatible.
import { isWindows } from "./_os.ts";
import { normalizeGlob as posixNormalizeGlob } from "./posix/normalize_glob.ts";
import { normalizeGlob as windowsNormalizeGlob } from "./windows/normalize_glob.ts";
/**
 * Normalizes a glob string.
 *
 * Behaves like
 * {@linkcode https://jsr.io/@std/path/doc/~/normalize | normalize()}, but
 * doesn't collapse "**\/.." when `globstar` is true.
 *
 * @example Usage
 * ```ts
 * import { normalizeGlob } from "@std/path/normalize-glob";
 * import { assertEquals } from "@std/assert";
 *
 * if (Deno.build.os === "windows") {
 *   assertEquals(normalizeGlob("foo\\bar\\..\\baz"), "foo\\baz");
 *   assertEquals(normalizeGlob("foo\\**\\..\\bar\\..\\baz", { globstar: true }), "foo\\**\\..\\baz");
 * } else {
 *   assertEquals(normalizeGlob("foo/bar/../baz"), "foo/baz");
 *   assertEquals(normalizeGlob("foo/**\/../bar/../baz", { globstar: true }), "foo/**\/../baz");
 * }
 * ```
 *
 * @param glob Glob string to normalize.
 * @param options Glob options.
 * @returns The normalized glob string.
 */ export function normalizeGlob(glob, options = {}) {
  return isWindows ? windowsNormalizeGlob(glob, options) : posixNormalizeGlob(glob, options);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGU6Ly8vaG9tZS9ydW5uZXIvd29yay9jcmVhdGUtcHVyZXNjcmlwdC1kZW5vLXByb2plY3QvY3JlYXRlLXB1cmVzY3JpcHQtZGVuby1wcm9qZWN0L3ZlbmRvci9Ac3RkL3BhdGhAMS4wLjkvbm9ybWFsaXplX2dsb2IudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IDIwMTgtMjAyNSB0aGUgRGVubyBhdXRob3JzLiBNSVQgbGljZW5zZS5cbi8vIFRoaXMgbW9kdWxlIGlzIGJyb3dzZXIgY29tcGF0aWJsZS5cblxuaW1wb3J0IHR5cGUgeyBHbG9iT3B0aW9ucyB9IGZyb20gXCIuL19jb21tb24vZ2xvYl90b19yZWdfZXhwLnRzXCI7XG5pbXBvcnQgeyBpc1dpbmRvd3MgfSBmcm9tIFwiLi9fb3MudHNcIjtcbmltcG9ydCB7IG5vcm1hbGl6ZUdsb2IgYXMgcG9zaXhOb3JtYWxpemVHbG9iIH0gZnJvbSBcIi4vcG9zaXgvbm9ybWFsaXplX2dsb2IudHNcIjtcbmltcG9ydCB7XG4gIG5vcm1hbGl6ZUdsb2IgYXMgd2luZG93c05vcm1hbGl6ZUdsb2IsXG59IGZyb20gXCIuL3dpbmRvd3Mvbm9ybWFsaXplX2dsb2IudHNcIjtcblxuZXhwb3J0IHR5cGUgeyBHbG9iT3B0aW9ucyB9O1xuXG4vKipcbiAqIE5vcm1hbGl6ZXMgYSBnbG9iIHN0cmluZy5cbiAqXG4gKiBCZWhhdmVzIGxpa2VcbiAqIHtAbGlua2NvZGUgaHR0cHM6Ly9qc3IuaW8vQHN0ZC9wYXRoL2RvYy9+L25vcm1hbGl6ZSB8IG5vcm1hbGl6ZSgpfSwgYnV0XG4gKiBkb2Vzbid0IGNvbGxhcHNlIFwiKipcXC8uLlwiIHdoZW4gYGdsb2JzdGFyYCBpcyB0cnVlLlxuICpcbiAqIEBleGFtcGxlIFVzYWdlXG4gKiBgYGB0c1xuICogaW1wb3J0IHsgbm9ybWFsaXplR2xvYiB9IGZyb20gXCJAc3RkL3BhdGgvbm9ybWFsaXplLWdsb2JcIjtcbiAqIGltcG9ydCB7IGFzc2VydEVxdWFscyB9IGZyb20gXCJAc3RkL2Fzc2VydFwiO1xuICpcbiAqIGlmIChEZW5vLmJ1aWxkLm9zID09PSBcIndpbmRvd3NcIikge1xuICogICBhc3NlcnRFcXVhbHMobm9ybWFsaXplR2xvYihcImZvb1xcXFxiYXJcXFxcLi5cXFxcYmF6XCIpLCBcImZvb1xcXFxiYXpcIik7XG4gKiAgIGFzc2VydEVxdWFscyhub3JtYWxpemVHbG9iKFwiZm9vXFxcXCoqXFxcXC4uXFxcXGJhclxcXFwuLlxcXFxiYXpcIiwgeyBnbG9ic3RhcjogdHJ1ZSB9KSwgXCJmb29cXFxcKipcXFxcLi5cXFxcYmF6XCIpO1xuICogfSBlbHNlIHtcbiAqICAgYXNzZXJ0RXF1YWxzKG5vcm1hbGl6ZUdsb2IoXCJmb28vYmFyLy4uL2JhelwiKSwgXCJmb28vYmF6XCIpO1xuICogICBhc3NlcnRFcXVhbHMobm9ybWFsaXplR2xvYihcImZvby8qKlxcLy4uL2Jhci8uLi9iYXpcIiwgeyBnbG9ic3RhcjogdHJ1ZSB9KSwgXCJmb28vKipcXC8uLi9iYXpcIik7XG4gKiB9XG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0gZ2xvYiBHbG9iIHN0cmluZyB0byBub3JtYWxpemUuXG4gKiBAcGFyYW0gb3B0aW9ucyBHbG9iIG9wdGlvbnMuXG4gKiBAcmV0dXJucyBUaGUgbm9ybWFsaXplZCBnbG9iIHN0cmluZy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG5vcm1hbGl6ZUdsb2IoXG4gIGdsb2I6IHN0cmluZyxcbiAgb3B0aW9uczogR2xvYk9wdGlvbnMgPSB7fSxcbik6IHN0cmluZyB7XG4gIHJldHVybiBpc1dpbmRvd3NcbiAgICA/IHdpbmRvd3NOb3JtYWxpemVHbG9iKGdsb2IsIG9wdGlvbnMpXG4gICAgOiBwb3NpeE5vcm1hbGl6ZUdsb2IoZ2xvYiwgb3B0aW9ucyk7XG59XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEscURBQXFEO0FBQ3JELHFDQUFxQztBQUdyQyxTQUFTLFNBQVMsUUFBUSxXQUFXO0FBQ3JDLFNBQVMsaUJBQWlCLGtCQUFrQixRQUFRLDRCQUE0QjtBQUNoRixTQUNFLGlCQUFpQixvQkFBb0IsUUFDaEMsOEJBQThCO0FBSXJDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Q0F3QkMsR0FDRCxPQUFPLFNBQVMsY0FDZCxJQUFZLEVBQ1osVUFBdUIsQ0FBQyxDQUFDO0VBRXpCLE9BQU8sWUFDSCxxQkFBcUIsTUFBTSxXQUMzQixtQkFBbUIsTUFBTTtBQUMvQiJ9
// denoCacheMetadata=5014055645066026523,5275407255634296670