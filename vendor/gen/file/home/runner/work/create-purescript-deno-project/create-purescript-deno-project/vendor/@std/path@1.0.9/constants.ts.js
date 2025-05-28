// Copyright 2018-2025 the Deno authors. MIT license.
// This module is browser compatible.
import { isWindows } from "./_os.ts";
/**
 * The character used to separate entries in the PATH environment variable.
 * On Windows, this is `;`. On all other platforms, this is `:`.
 */ export const DELIMITER = isWindows ? ";" : ":";
/**
 * The character used to separate components of a file path.
 * On Windows, this is `\`. On all other platforms, this is `/`.
 */ export const SEPARATOR = isWindows ? "\\" : "/";
/**
 * A regular expression that matches one or more path separators.
 */ export const SEPARATOR_PATTERN = isWindows ? /[\\/]+/ : /\/+/;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGU6Ly8vaG9tZS9ydW5uZXIvd29yay9jcmVhdGUtcHVyZXNjcmlwdC1kZW5vLXByb2plY3QvY3JlYXRlLXB1cmVzY3JpcHQtZGVuby1wcm9qZWN0L3ZlbmRvci9Ac3RkL3BhdGhAMS4wLjkvY29uc3RhbnRzLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAyMDE4LTIwMjUgdGhlIERlbm8gYXV0aG9ycy4gTUlUIGxpY2Vuc2UuXG4vLyBUaGlzIG1vZHVsZSBpcyBicm93c2VyIGNvbXBhdGlibGUuXG5pbXBvcnQgeyBpc1dpbmRvd3MgfSBmcm9tIFwiLi9fb3MudHNcIjtcblxuLyoqXG4gKiBUaGUgY2hhcmFjdGVyIHVzZWQgdG8gc2VwYXJhdGUgZW50cmllcyBpbiB0aGUgUEFUSCBlbnZpcm9ubWVudCB2YXJpYWJsZS5cbiAqIE9uIFdpbmRvd3MsIHRoaXMgaXMgYDtgLiBPbiBhbGwgb3RoZXIgcGxhdGZvcm1zLCB0aGlzIGlzIGA6YC5cbiAqL1xuZXhwb3J0IGNvbnN0IERFTElNSVRFUiA9IGlzV2luZG93cyA/IFwiO1wiIGFzIGNvbnN0IDogXCI6XCIgYXMgY29uc3Q7XG4vKipcbiAqIFRoZSBjaGFyYWN0ZXIgdXNlZCB0byBzZXBhcmF0ZSBjb21wb25lbnRzIG9mIGEgZmlsZSBwYXRoLlxuICogT24gV2luZG93cywgdGhpcyBpcyBgXFxgLiBPbiBhbGwgb3RoZXIgcGxhdGZvcm1zLCB0aGlzIGlzIGAvYC5cbiAqL1xuZXhwb3J0IGNvbnN0IFNFUEFSQVRPUiA9IGlzV2luZG93cyA/IFwiXFxcXFwiIGFzIGNvbnN0IDogXCIvXCIgYXMgY29uc3Q7XG4vKipcbiAqIEEgcmVndWxhciBleHByZXNzaW9uIHRoYXQgbWF0Y2hlcyBvbmUgb3IgbW9yZSBwYXRoIHNlcGFyYXRvcnMuXG4gKi9cbmV4cG9ydCBjb25zdCBTRVBBUkFUT1JfUEFUVEVSTiA9IGlzV2luZG93cyA/IC9bXFxcXC9dKy8gOiAvXFwvKy87XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEscURBQXFEO0FBQ3JELHFDQUFxQztBQUNyQyxTQUFTLFNBQVMsUUFBUSxXQUFXO0FBRXJDOzs7Q0FHQyxHQUNELE9BQU8sTUFBTSxZQUFZLFlBQVksTUFBZSxJQUFhO0FBQ2pFOzs7Q0FHQyxHQUNELE9BQU8sTUFBTSxZQUFZLFlBQVksT0FBZ0IsSUFBYTtBQUNsRTs7Q0FFQyxHQUNELE9BQU8sTUFBTSxvQkFBb0IsWUFBWSxXQUFXLE1BQU0ifQ==
// denoCacheMetadata=16683151571257402773,16940320944540890076