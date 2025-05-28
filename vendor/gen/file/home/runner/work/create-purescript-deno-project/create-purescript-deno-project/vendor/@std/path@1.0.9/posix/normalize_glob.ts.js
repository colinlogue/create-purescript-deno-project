// Copyright 2018-2025 the Deno authors. MIT license.
// This module is browser compatible.
import { normalize } from "./normalize.ts";
import { SEPARATOR_PATTERN } from "./constants.ts";
/**
 * Like normalize(), but doesn't collapse "**\/.." when `globstar` is true.
 *
 * @example Usage
 * ```ts
 * import { normalizeGlob } from "@std/path/posix/normalize-glob";
 * import { assertEquals } from "@std/assert";
 *
 * const path = normalizeGlob("foo/bar/../*", { globstar: true });
 * assertEquals(path, "foo/*");
 * ```
 *
 * @param glob The glob to normalize.
 * @param options The options to use.
 * @returns The normalized path.
 */ export function normalizeGlob(glob, options = {}) {
  const { globstar = false } = options;
  if (glob.match(/\0/g)) {
    throw new Error(`Glob contains invalid characters: "${glob}"`);
  }
  if (!globstar) {
    return normalize(glob);
  }
  const s = SEPARATOR_PATTERN.source;
  const badParentPattern = new RegExp(`(?<=(${s}|^)\\*\\*${s})\\.\\.(?=${s}|$)`, "g");
  return normalize(glob.replace(badParentPattern, "\0")).replace(/\0/g, "..");
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGU6Ly8vaG9tZS9ydW5uZXIvd29yay9jcmVhdGUtcHVyZXNjcmlwdC1kZW5vLXByb2plY3QvY3JlYXRlLXB1cmVzY3JpcHQtZGVuby1wcm9qZWN0L3ZlbmRvci9Ac3RkL3BhdGhAMS4wLjkvcG9zaXgvbm9ybWFsaXplX2dsb2IudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IDIwMTgtMjAyNSB0aGUgRGVubyBhdXRob3JzLiBNSVQgbGljZW5zZS5cbi8vIFRoaXMgbW9kdWxlIGlzIGJyb3dzZXIgY29tcGF0aWJsZS5cblxuaW1wb3J0IHR5cGUgeyBHbG9iT3B0aW9ucyB9IGZyb20gXCIuLi9fY29tbW9uL2dsb2JfdG9fcmVnX2V4cC50c1wiO1xuaW1wb3J0IHsgbm9ybWFsaXplIH0gZnJvbSBcIi4vbm9ybWFsaXplLnRzXCI7XG5pbXBvcnQgeyBTRVBBUkFUT1JfUEFUVEVSTiB9IGZyb20gXCIuL2NvbnN0YW50cy50c1wiO1xuXG5leHBvcnQgdHlwZSB7IEdsb2JPcHRpb25zIH07XG5cbi8qKlxuICogTGlrZSBub3JtYWxpemUoKSwgYnV0IGRvZXNuJ3QgY29sbGFwc2UgXCIqKlxcLy4uXCIgd2hlbiBgZ2xvYnN0YXJgIGlzIHRydWUuXG4gKlxuICogQGV4YW1wbGUgVXNhZ2VcbiAqIGBgYHRzXG4gKiBpbXBvcnQgeyBub3JtYWxpemVHbG9iIH0gZnJvbSBcIkBzdGQvcGF0aC9wb3NpeC9ub3JtYWxpemUtZ2xvYlwiO1xuICogaW1wb3J0IHsgYXNzZXJ0RXF1YWxzIH0gZnJvbSBcIkBzdGQvYXNzZXJ0XCI7XG4gKlxuICogY29uc3QgcGF0aCA9IG5vcm1hbGl6ZUdsb2IoXCJmb28vYmFyLy4uLypcIiwgeyBnbG9ic3RhcjogdHJ1ZSB9KTtcbiAqIGFzc2VydEVxdWFscyhwYXRoLCBcImZvby8qXCIpO1xuICogYGBgXG4gKlxuICogQHBhcmFtIGdsb2IgVGhlIGdsb2IgdG8gbm9ybWFsaXplLlxuICogQHBhcmFtIG9wdGlvbnMgVGhlIG9wdGlvbnMgdG8gdXNlLlxuICogQHJldHVybnMgVGhlIG5vcm1hbGl6ZWQgcGF0aC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG5vcm1hbGl6ZUdsb2IoXG4gIGdsb2I6IHN0cmluZyxcbiAgb3B0aW9uczogUGljazxHbG9iT3B0aW9ucywgXCJnbG9ic3RhclwiPiA9IHt9LFxuKTogc3RyaW5nIHtcbiAgY29uc3QgeyBnbG9ic3RhciA9IGZhbHNlIH06IEdsb2JPcHRpb25zID0gb3B0aW9ucztcbiAgaWYgKGdsb2IubWF0Y2goL1xcMC9nKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihgR2xvYiBjb250YWlucyBpbnZhbGlkIGNoYXJhY3RlcnM6IFwiJHtnbG9ifVwiYCk7XG4gIH1cbiAgaWYgKCFnbG9ic3Rhcikge1xuICAgIHJldHVybiBub3JtYWxpemUoZ2xvYik7XG4gIH1cbiAgY29uc3QgcyA9IFNFUEFSQVRPUl9QQVRURVJOLnNvdXJjZTtcbiAgY29uc3QgYmFkUGFyZW50UGF0dGVybiA9IG5ldyBSZWdFeHAoXG4gICAgYCg/PD0oJHtzfXxeKVxcXFwqXFxcXCoke3N9KVxcXFwuXFxcXC4oPz0ke3N9fCQpYCxcbiAgICBcImdcIixcbiAgKTtcbiAgcmV0dXJuIG5vcm1hbGl6ZShnbG9iLnJlcGxhY2UoYmFkUGFyZW50UGF0dGVybiwgXCJcXDBcIikpLnJlcGxhY2UoL1xcMC9nLCBcIi4uXCIpO1xufVxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLHFEQUFxRDtBQUNyRCxxQ0FBcUM7QUFHckMsU0FBUyxTQUFTLFFBQVEsaUJBQWlCO0FBQzNDLFNBQVMsaUJBQWlCLFFBQVEsaUJBQWlCO0FBSW5EOzs7Ozs7Ozs7Ozs7Ozs7Q0FlQyxHQUNELE9BQU8sU0FBUyxjQUNkLElBQVksRUFDWixVQUF5QyxDQUFDLENBQUM7RUFFM0MsTUFBTSxFQUFFLFdBQVcsS0FBSyxFQUFFLEdBQWdCO0VBQzFDLElBQUksS0FBSyxLQUFLLENBQUMsUUFBUTtJQUNyQixNQUFNLElBQUksTUFBTSxDQUFDLG1DQUFtQyxFQUFFLEtBQUssQ0FBQyxDQUFDO0VBQy9EO0VBQ0EsSUFBSSxDQUFDLFVBQVU7SUFDYixPQUFPLFVBQVU7RUFDbkI7RUFDQSxNQUFNLElBQUksa0JBQWtCLE1BQU07RUFDbEMsTUFBTSxtQkFBbUIsSUFBSSxPQUMzQixDQUFDLEtBQUssRUFBRSxFQUFFLFNBQVMsRUFBRSxFQUFFLFVBQVUsRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUN6QztFQUVGLE9BQU8sVUFBVSxLQUFLLE9BQU8sQ0FBQyxrQkFBa0IsT0FBTyxPQUFPLENBQUMsT0FBTztBQUN4RSJ9
// denoCacheMetadata=12441440739563265104,12977899681096251287