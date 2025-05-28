// Copyright 2018-2025 the Deno authors. MIT license.
// This module is browser compatible.
/**
 * Command line arguments parser based on
 * {@link https://github.com/minimistjs/minimist | minimist}.
 *
 * See {@linkcode parseArgs} for more information.
 *
 * @example Usage
 * ```ts
 * import { parseArgs } from "@std/cli/parse-args";
 * import { assertEquals } from "@std/assert/equals";
 *
 * // For proper use, one should use `parseArgs(Deno.args)`
 * assertEquals(parseArgs(["--foo", "--bar=baz", "./quux.txt"]), {
 *   foo: true,
 *   bar: "baz",
 *   _: ["./quux.txt"],
 * });
 * ```
 *
 * @example `string` and `boolean` options
 *
 * Use `string` and `boolean` options to specify the type of the argument.
 *
 * ```ts
 * import { parseArgs } from "@std/cli/parse-args";
 * import { assertEquals } from "@std/assert/equals";
 *
 * const args = parseArgs(["--foo", "--bar", "baz"], {
 *   boolean: ["foo"],
 *   string: ["bar"],
 * });
 *
 * assertEquals(args, { foo: true, bar: "baz", _: [] });
 * ```
 *
 * @example `collect` option
 *
 * `collect` option tells the parser to treat the option as an array. All
 * values will be collected into one array. If a non-collectable option is used
 * multiple times, the last value is used.
 *
 * ```ts
 * import { parseArgs } from "@std/cli/parse-args";
 * import { assertEquals } from "@std/assert/equals";
 *
 * const args = parseArgs(["--foo", "bar", "--foo", "baz"], {
 *  collect: ["foo"],
 * });
 *
 * assertEquals(args, { foo: ["bar", "baz"], _: [] });
 * ```
 *
 * @example `negatable` option
 *
 * `negatable` option tells the parser to treat the option can be negated by
 * prefixing them with `--no-`, like `--no-config`.
 *
 * ```ts
 * import { parseArgs } from "@std/cli/parse-args";
 * import { assertEquals } from "@std/assert/equals";
 *
 * const args = parseArgs(["--no-foo"], {
 *   boolean: ["foo"],
 *   negatable: ["foo"],
 * });
 *
 * assertEquals(args, { foo: false, _: [] });
 * ```
 *
 * @module
 */ /** Combines recursively all intersection types and returns a new single type.
 * @internal
 */ const FLAG_REGEXP = /^(?:-(?:(?<doubleDash>-)(?<negated>no-)?)?)(?<key>.+?)(?:=(?<value>.+?))?$/s;
const LETTER_REGEXP = /[A-Za-z]/;
const NUMBER_REGEXP = /-?\d+(\.\d*)?(e-?\d+)?$/;
const HYPHEN_REGEXP = /^(-|--)[^-]/;
const VALUE_REGEXP = /=(?<value>.+)/;
const FLAG_NAME_REGEXP = /^--[^=]+$/;
const SPECIAL_CHAR_REGEXP = /\W/;
const NON_WHITESPACE_REGEXP = /\S/;
function isNumber(string) {
  return NON_WHITESPACE_REGEXP.test(string) && Number.isFinite(Number(string));
}
function setNested(object, keys, value, collect = false) {
  keys = [
    ...keys
  ];
  const key = keys.pop();
  keys.forEach((key)=>object = object[key] ??= {});
  if (collect) {
    const v = object[key];
    if (Array.isArray(v)) {
      v.push(value);
      return;
    }
    value = v ? [
      v,
      value
    ] : [
      value
    ];
  }
  object[key] = value;
}
function hasNested(object, keys) {
  for (const key of keys){
    const value = object[key];
    if (!Object.hasOwn(object, key)) return false;
    object = value;
  }
  return true;
}
function aliasIsBoolean(aliasMap, booleanSet, key) {
  const set = aliasMap.get(key);
  if (set === undefined) return false;
  for (const alias of set)if (booleanSet.has(alias)) return true;
  return false;
}
function isBooleanString(value) {
  return value === "true" || value === "false";
}
function parseBooleanString(value) {
  return value !== "false";
}
/**
 * Take a set of command line arguments, optionally with a set of options, and
 * return an object representing the flags found in the passed arguments.
 *
 * By default, any arguments starting with `-` or `--` are considered boolean
 * flags. If the argument name is followed by an equal sign (`=`) it is
 * considered a key-value pair. Any arguments which could not be parsed are
 * available in the `_` property of the returned object.
 *
 * By default, this module tries to determine the type of all arguments
 * automatically and the return type of this function will have an index
 * signature with `any` as value (`{ [x: string]: any }`).
 *
 * If the `string`, `boolean` or `collect` option is set, the return value of
 * this function will be fully typed and the index signature of the return
 * type will change to `{ [x: string]: unknown }`.
 *
 * Any arguments after `'--'` will not be parsed and will end up in `parsedArgs._`.
 *
 * Numeric-looking arguments will be returned as numbers unless `options.string`
 * or `options.boolean` is set for that argument name.
 *
 * See {@linkcode ParseOptions} for more information.
 *
 * @param args An array of command line arguments.
 * @param options Options for the parse function.
 *
 * @typeParam TArgs Type of result.
 * @typeParam TDoubleDash Used by `TArgs` for the result.
 * @typeParam TBooleans Used by `TArgs` for the result.
 * @typeParam TStrings Used by `TArgs` for the result.
 * @typeParam TCollectable Used by `TArgs` for the result.
 * @typeParam TNegatable Used by `TArgs` for the result.
 * @typeParam TDefaults Used by `TArgs` for the result.
 * @typeParam TAliases Used by `TArgs` for the result.
 * @typeParam TAliasArgNames Used by `TArgs` for the result.
 * @typeParam TAliasNames Used by `TArgs` for the result.
 *
 * @return The parsed arguments.
 *
 * @example Usage
 * ```ts
 * import { parseArgs } from "@std/cli/parse-args";
 * import { assertEquals } from "@std/assert/equals";
 *
 * // For proper use, one should use `parseArgs(Deno.args)`
 * assertEquals(parseArgs(["--foo", "--bar=baz", "./quux.txt"]), {
 *   foo: true,
 *   bar: "baz",
 *   _: ["./quux.txt"],
 * });
 * ```
 *
 * @example `string` and `boolean` options
 *
 * Use `string` and `boolean` options to specify the type of the argument.
 *
 * ```ts
 * import { parseArgs } from "@std/cli/parse-args";
 * import { assertEquals } from "@std/assert/equals";
 *
 * const args = parseArgs(["--foo", "--bar", "baz"], {
 *   boolean: ["foo"],
 *   string: ["bar"],
 * });
 *
 * assertEquals(args, { foo: true, bar: "baz", _: [] });
 * ```
 *
 * @example `collect` option
 *
 * `collect` option tells the parser to treat the option as an array. All
 * values will be collected into one array. If a non-collectable option is used
 * multiple times, the last value is used.
 *
 * ```ts
 * import { parseArgs } from "@std/cli/parse-args";
 * import { assertEquals } from "@std/assert/equals";
 *
 * const args = parseArgs(["--foo", "bar", "--foo", "baz"], {
 *  collect: ["foo"],
 * });
 *
 * assertEquals(args, { foo: ["bar", "baz"], _: [] });
 * ```
 *
 * @example `negatable` option
 *
 * `negatable` option tells the parser to treat the option can be negated by
 * prefixing them with `--no-`, like `--no-config`.
 *
 * ```ts
 * import { parseArgs } from "@std/cli/parse-args";
 * import { assertEquals } from "@std/assert/equals";
 *
 * const args = parseArgs(["--no-foo"], {
 *   boolean: ["foo"],
 *   negatable: ["foo"],
 * });
 *
 * assertEquals(args, { foo: false, _: [] });
 * ```
 */ export function parseArgs(args, options) {
  const { "--": doubleDash = false, alias = {}, boolean = false, default: defaults = {}, stopEarly = false, string = [], collect = [], negatable = [], unknown: unknownFn = (i)=>i } = options ?? {};
  const aliasMap = new Map();
  const booleanSet = new Set();
  const stringSet = new Set();
  const collectSet = new Set();
  const negatableSet = new Set();
  let allBools = false;
  if (alias) {
    for (const [key, value] of Object.entries(alias)){
      if (value === undefined) {
        throw new TypeError("Alias value must be defined");
      }
      const aliases = Array.isArray(value) ? value : [
        value
      ];
      aliasMap.set(key, new Set(aliases));
      aliases.forEach((alias)=>aliasMap.set(alias, new Set([
          key,
          ...aliases.filter((it)=>it !== alias)
        ])));
    }
  }
  if (boolean) {
    if (typeof boolean === "boolean") {
      allBools = boolean;
    } else {
      const booleanArgs = Array.isArray(boolean) ? boolean : [
        boolean
      ];
      for (const key of booleanArgs.filter(Boolean)){
        booleanSet.add(key);
        aliasMap.get(key)?.forEach((al)=>{
          booleanSet.add(al);
        });
      }
    }
  }
  if (string) {
    const stringArgs = Array.isArray(string) ? string : [
      string
    ];
    for (const key of stringArgs.filter(Boolean)){
      stringSet.add(key);
      aliasMap.get(key)?.forEach((al)=>stringSet.add(al));
    }
  }
  if (collect) {
    const collectArgs = Array.isArray(collect) ? collect : [
      collect
    ];
    for (const key of collectArgs.filter(Boolean)){
      collectSet.add(key);
      aliasMap.get(key)?.forEach((al)=>collectSet.add(al));
    }
  }
  if (negatable) {
    const negatableArgs = Array.isArray(negatable) ? negatable : [
      negatable
    ];
    for (const key of negatableArgs.filter(Boolean)){
      negatableSet.add(key);
      aliasMap.get(key)?.forEach((alias)=>negatableSet.add(alias));
    }
  }
  const argv = {
    _: []
  };
  function setArgument(key, value, arg, collect) {
    if (!booleanSet.has(key) && !stringSet.has(key) && !aliasMap.has(key) && !(allBools && FLAG_NAME_REGEXP.test(arg)) && unknownFn?.(arg, key, value) === false) {
      return;
    }
    if (typeof value === "string" && !stringSet.has(key)) {
      value = isNumber(value) ? Number(value) : value;
    }
    const collectable = collect && collectSet.has(key);
    setNested(argv, key.split("."), value, collectable);
    aliasMap.get(key)?.forEach((key)=>{
      setNested(argv, key.split("."), value, collectable);
    });
  }
  let notFlags = [];
  // all args after "--" are not parsed
  const index = args.indexOf("--");
  if (index !== -1) {
    notFlags = args.slice(index + 1);
    args = args.slice(0, index);
  }
  argsLoop: for(let i = 0; i < args.length; i++){
    const arg = args[i];
    const groups = arg.match(FLAG_REGEXP)?.groups;
    if (groups) {
      const { doubleDash, negated } = groups;
      let key = groups.key;
      let value = groups.value;
      if (doubleDash) {
        if (value) {
          if (booleanSet.has(key)) value = parseBooleanString(value);
          setArgument(key, value, arg, true);
          continue;
        }
        if (negated) {
          if (negatableSet.has(key)) {
            setArgument(key, false, arg, false);
            continue;
          }
          key = `no-${key}`;
        }
        const next = args[i + 1];
        if (next) {
          if (!booleanSet.has(key) && !allBools && !next.startsWith("-") && (!aliasMap.has(key) || !aliasIsBoolean(aliasMap, booleanSet, key))) {
            value = next;
            i++;
            setArgument(key, value, arg, true);
            continue;
          }
          if (isBooleanString(next)) {
            value = parseBooleanString(next);
            i++;
            setArgument(key, value, arg, true);
            continue;
          }
        }
        value = stringSet.has(key) ? "" : true;
        setArgument(key, value, arg, true);
        continue;
      }
      const letters = arg.slice(1, -1).split("");
      for (const [j, letter] of letters.entries()){
        const next = arg.slice(j + 2);
        if (next === "-") {
          setArgument(letter, next, arg, true);
          continue;
        }
        if (LETTER_REGEXP.test(letter)) {
          const groups = VALUE_REGEXP.exec(next)?.groups;
          if (groups) {
            setArgument(letter, groups.value, arg, true);
            continue argsLoop;
          }
          if (NUMBER_REGEXP.test(next)) {
            setArgument(letter, next, arg, true);
            continue argsLoop;
          }
        }
        if (letters[j + 1]?.match(SPECIAL_CHAR_REGEXP)) {
          setArgument(letter, arg.slice(j + 2), arg, true);
          continue argsLoop;
        }
        setArgument(letter, stringSet.has(letter) ? "" : true, arg, true);
      }
      key = arg.slice(-1);
      if (key === "-") continue;
      const nextArg = args[i + 1];
      if (nextArg) {
        if (!HYPHEN_REGEXP.test(nextArg) && !booleanSet.has(key) && (!aliasMap.has(key) || !aliasIsBoolean(aliasMap, booleanSet, key))) {
          setArgument(key, nextArg, arg, true);
          i++;
          continue;
        }
        if (isBooleanString(nextArg)) {
          const value = parseBooleanString(nextArg);
          setArgument(key, value, arg, true);
          i++;
          continue;
        }
      }
      setArgument(key, stringSet.has(key) ? "" : true, arg, true);
      continue;
    }
    if (unknownFn?.(arg) !== false) {
      argv._.push(stringSet.has("_") || !isNumber(arg) ? arg : Number(arg));
    }
    if (stopEarly) {
      argv._.push(...args.slice(i + 1));
      break;
    }
  }
  for (const [key, value] of Object.entries(defaults)){
    const keys = key.split(".");
    if (!hasNested(argv, keys)) {
      setNested(argv, keys, value);
      aliasMap.get(key)?.forEach((key)=>setNested(argv, key.split("."), value));
    }
  }
  for (const key of booleanSet.keys()){
    const keys = key.split(".");
    if (!hasNested(argv, keys)) {
      const value = collectSet.has(key) ? [] : false;
      setNested(argv, keys, value);
    }
  }
  for (const key of stringSet.keys()){
    const keys = key.split(".");
    if (!hasNested(argv, keys) && collectSet.has(key)) {
      setNested(argv, keys, []);
    }
  }
  if (doubleDash) {
    argv["--"] = notFlags;
  } else {
    argv._.push(...notFlags);
  }
  return argv;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGU6Ly8vaG9tZS9ydW5uZXIvd29yay9jcmVhdGUtcHVyZXNjcmlwdC1kZW5vLXByb2plY3QvY3JlYXRlLXB1cmVzY3JpcHQtZGVuby1wcm9qZWN0L3ZlbmRvci9Ac3RkL2NsaUAxLjAuMTcvcGFyc2VfYXJncy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgMjAxOC0yMDI1IHRoZSBEZW5vIGF1dGhvcnMuIE1JVCBsaWNlbnNlLlxuLy8gVGhpcyBtb2R1bGUgaXMgYnJvd3NlciBjb21wYXRpYmxlLlxuXG4vKipcbiAqIENvbW1hbmQgbGluZSBhcmd1bWVudHMgcGFyc2VyIGJhc2VkIG9uXG4gKiB7QGxpbmsgaHR0cHM6Ly9naXRodWIuY29tL21pbmltaXN0anMvbWluaW1pc3QgfCBtaW5pbWlzdH0uXG4gKlxuICogU2VlIHtAbGlua2NvZGUgcGFyc2VBcmdzfSBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cbiAqXG4gKiBAZXhhbXBsZSBVc2FnZVxuICogYGBgdHNcbiAqIGltcG9ydCB7IHBhcnNlQXJncyB9IGZyb20gXCJAc3RkL2NsaS9wYXJzZS1hcmdzXCI7XG4gKiBpbXBvcnQgeyBhc3NlcnRFcXVhbHMgfSBmcm9tIFwiQHN0ZC9hc3NlcnQvZXF1YWxzXCI7XG4gKlxuICogLy8gRm9yIHByb3BlciB1c2UsIG9uZSBzaG91bGQgdXNlIGBwYXJzZUFyZ3MoRGVuby5hcmdzKWBcbiAqIGFzc2VydEVxdWFscyhwYXJzZUFyZ3MoW1wiLS1mb29cIiwgXCItLWJhcj1iYXpcIiwgXCIuL3F1dXgudHh0XCJdKSwge1xuICogICBmb286IHRydWUsXG4gKiAgIGJhcjogXCJiYXpcIixcbiAqICAgXzogW1wiLi9xdXV4LnR4dFwiXSxcbiAqIH0pO1xuICogYGBgXG4gKlxuICogQGV4YW1wbGUgYHN0cmluZ2AgYW5kIGBib29sZWFuYCBvcHRpb25zXG4gKlxuICogVXNlIGBzdHJpbmdgIGFuZCBgYm9vbGVhbmAgb3B0aW9ucyB0byBzcGVjaWZ5IHRoZSB0eXBlIG9mIHRoZSBhcmd1bWVudC5cbiAqXG4gKiBgYGB0c1xuICogaW1wb3J0IHsgcGFyc2VBcmdzIH0gZnJvbSBcIkBzdGQvY2xpL3BhcnNlLWFyZ3NcIjtcbiAqIGltcG9ydCB7IGFzc2VydEVxdWFscyB9IGZyb20gXCJAc3RkL2Fzc2VydC9lcXVhbHNcIjtcbiAqXG4gKiBjb25zdCBhcmdzID0gcGFyc2VBcmdzKFtcIi0tZm9vXCIsIFwiLS1iYXJcIiwgXCJiYXpcIl0sIHtcbiAqICAgYm9vbGVhbjogW1wiZm9vXCJdLFxuICogICBzdHJpbmc6IFtcImJhclwiXSxcbiAqIH0pO1xuICpcbiAqIGFzc2VydEVxdWFscyhhcmdzLCB7IGZvbzogdHJ1ZSwgYmFyOiBcImJhelwiLCBfOiBbXSB9KTtcbiAqIGBgYFxuICpcbiAqIEBleGFtcGxlIGBjb2xsZWN0YCBvcHRpb25cbiAqXG4gKiBgY29sbGVjdGAgb3B0aW9uIHRlbGxzIHRoZSBwYXJzZXIgdG8gdHJlYXQgdGhlIG9wdGlvbiBhcyBhbiBhcnJheS4gQWxsXG4gKiB2YWx1ZXMgd2lsbCBiZSBjb2xsZWN0ZWQgaW50byBvbmUgYXJyYXkuIElmIGEgbm9uLWNvbGxlY3RhYmxlIG9wdGlvbiBpcyB1c2VkXG4gKiBtdWx0aXBsZSB0aW1lcywgdGhlIGxhc3QgdmFsdWUgaXMgdXNlZC5cbiAqXG4gKiBgYGB0c1xuICogaW1wb3J0IHsgcGFyc2VBcmdzIH0gZnJvbSBcIkBzdGQvY2xpL3BhcnNlLWFyZ3NcIjtcbiAqIGltcG9ydCB7IGFzc2VydEVxdWFscyB9IGZyb20gXCJAc3RkL2Fzc2VydC9lcXVhbHNcIjtcbiAqXG4gKiBjb25zdCBhcmdzID0gcGFyc2VBcmdzKFtcIi0tZm9vXCIsIFwiYmFyXCIsIFwiLS1mb29cIiwgXCJiYXpcIl0sIHtcbiAqICBjb2xsZWN0OiBbXCJmb29cIl0sXG4gKiB9KTtcbiAqXG4gKiBhc3NlcnRFcXVhbHMoYXJncywgeyBmb286IFtcImJhclwiLCBcImJhelwiXSwgXzogW10gfSk7XG4gKiBgYGBcbiAqXG4gKiBAZXhhbXBsZSBgbmVnYXRhYmxlYCBvcHRpb25cbiAqXG4gKiBgbmVnYXRhYmxlYCBvcHRpb24gdGVsbHMgdGhlIHBhcnNlciB0byB0cmVhdCB0aGUgb3B0aW9uIGNhbiBiZSBuZWdhdGVkIGJ5XG4gKiBwcmVmaXhpbmcgdGhlbSB3aXRoIGAtLW5vLWAsIGxpa2UgYC0tbm8tY29uZmlnYC5cbiAqXG4gKiBgYGB0c1xuICogaW1wb3J0IHsgcGFyc2VBcmdzIH0gZnJvbSBcIkBzdGQvY2xpL3BhcnNlLWFyZ3NcIjtcbiAqIGltcG9ydCB7IGFzc2VydEVxdWFscyB9IGZyb20gXCJAc3RkL2Fzc2VydC9lcXVhbHNcIjtcbiAqXG4gKiBjb25zdCBhcmdzID0gcGFyc2VBcmdzKFtcIi0tbm8tZm9vXCJdLCB7XG4gKiAgIGJvb2xlYW46IFtcImZvb1wiXSxcbiAqICAgbmVnYXRhYmxlOiBbXCJmb29cIl0sXG4gKiB9KTtcbiAqXG4gKiBhc3NlcnRFcXVhbHMoYXJncywgeyBmb286IGZhbHNlLCBfOiBbXSB9KTtcbiAqIGBgYFxuICpcbiAqIEBtb2R1bGVcbiAqL1xuXG4vKiogQ29tYmluZXMgcmVjdXJzaXZlbHkgYWxsIGludGVyc2VjdGlvbiB0eXBlcyBhbmQgcmV0dXJucyBhIG5ldyBzaW5nbGUgdHlwZS5cbiAqIEBpbnRlcm5hbFxuICovXG50eXBlIElkPFRSZWNvcmQ+ID0gVFJlY29yZCBleHRlbmRzIFJlY29yZDxzdHJpbmcsIHVua25vd24+XG4gID8gVFJlY29yZCBleHRlbmRzIGluZmVyIEluZmVycmVkUmVjb3JkXG4gICAgPyB7IFtLZXkgaW4ga2V5b2YgSW5mZXJyZWRSZWNvcmRdOiBJZDxJbmZlcnJlZFJlY29yZFtLZXldPiB9XG4gIDogbmV2ZXJcbiAgOiBUUmVjb3JkO1xuXG4vKiogQ29udmVydHMgYSB1bmlvbiB0eXBlIGBBIHwgQiB8IENgIGludG8gYW4gaW50ZXJzZWN0aW9uIHR5cGUgYEEgJiBCICYgQ2AuXG4gKiBAaW50ZXJuYWxcbiAqL1xudHlwZSBVbmlvblRvSW50ZXJzZWN0aW9uPFRWYWx1ZT4gPVxuICAoVFZhbHVlIGV4dGVuZHMgdW5rbm93biA/IChhcmdzOiBUVmFsdWUpID0+IHVua25vd24gOiBuZXZlcikgZXh0ZW5kc1xuICAgIChhcmdzOiBpbmZlciBSKSA9PiB1bmtub3duID8gUiBleHRlbmRzIFJlY29yZDxzdHJpbmcsIHVua25vd24+ID8gUiA6IG5ldmVyXG4gICAgOiBuZXZlcjtcblxuLyoqIEBpbnRlcm5hbCAqL1xudHlwZSBCb29sZWFuVHlwZSA9IGJvb2xlYW4gfCBzdHJpbmcgfCB1bmRlZmluZWQ7XG4vKiogQGludGVybmFsICovXG50eXBlIFN0cmluZ1R5cGUgPSBzdHJpbmcgfCB1bmRlZmluZWQ7XG4vKiogQGludGVybmFsICovXG50eXBlIEFyZ1R5cGUgPSBTdHJpbmdUeXBlIHwgQm9vbGVhblR5cGU7XG5cbi8qKiBAaW50ZXJuYWwgKi9cbnR5cGUgQ29sbGVjdGFibGUgPSBzdHJpbmcgfCB1bmRlZmluZWQ7XG4vKiogQGludGVybmFsICovXG50eXBlIE5lZ2F0YWJsZSA9IHN0cmluZyB8IHVuZGVmaW5lZDtcblxudHlwZSBVc2VUeXBlczxcbiAgVEJvb2xlYW5zIGV4dGVuZHMgQm9vbGVhblR5cGUsXG4gIFRTdHJpbmdzIGV4dGVuZHMgU3RyaW5nVHlwZSxcbiAgVENvbGxlY3RhYmxlIGV4dGVuZHMgQ29sbGVjdGFibGUsXG4+ID0gdW5kZWZpbmVkIGV4dGVuZHMgKFxuICAmIChmYWxzZSBleHRlbmRzIFRCb29sZWFucyA/IHVuZGVmaW5lZCA6IFRCb29sZWFucylcbiAgJiBUQ29sbGVjdGFibGVcbiAgJiBUU3RyaW5nc1xuKSA/IGZhbHNlXG4gIDogdHJ1ZTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgcmVjb3JkIHdpdGggYWxsIGF2YWlsYWJsZSBmbGFncyB3aXRoIHRoZSBjb3JyZXNwb25kaW5nIHR5cGUgYW5kXG4gKiBkZWZhdWx0IHR5cGUuXG4gKiBAaW50ZXJuYWxcbiAqL1xudHlwZSBWYWx1ZXM8XG4gIFRCb29sZWFucyBleHRlbmRzIEJvb2xlYW5UeXBlLFxuICBUU3RyaW5ncyBleHRlbmRzIFN0cmluZ1R5cGUsXG4gIFRDb2xsZWN0YWJsZSBleHRlbmRzIENvbGxlY3RhYmxlLFxuICBUTmVnYXRhYmxlIGV4dGVuZHMgTmVnYXRhYmxlLFxuICBURGVmYXVsdCBleHRlbmRzIFJlY29yZDxzdHJpbmcsIHVua25vd24+IHwgdW5kZWZpbmVkLFxuICBUQWxpYXNlcyBleHRlbmRzIEFsaWFzZXMgfCB1bmRlZmluZWQsXG4+ID0gVXNlVHlwZXM8VEJvb2xlYW5zLCBUU3RyaW5ncywgVENvbGxlY3RhYmxlPiBleHRlbmRzIHRydWUgP1xuICAgICYgUmVjb3JkPHN0cmluZywgdW5rbm93bj5cbiAgICAmIEFkZEFsaWFzZXM8XG4gICAgICBTcHJlYWREZWZhdWx0czxcbiAgICAgICAgJiBDb2xsZWN0VmFsdWVzPFRTdHJpbmdzLCBzdHJpbmcsIFRDb2xsZWN0YWJsZSwgVE5lZ2F0YWJsZT5cbiAgICAgICAgJiBSZWN1cnNpdmVSZXF1aXJlZDxDb2xsZWN0VmFsdWVzPFRCb29sZWFucywgYm9vbGVhbiwgVENvbGxlY3RhYmxlPj5cbiAgICAgICAgJiBDb2xsZWN0VW5rbm93blZhbHVlczxcbiAgICAgICAgICBUQm9vbGVhbnMsXG4gICAgICAgICAgVFN0cmluZ3MsXG4gICAgICAgICAgVENvbGxlY3RhYmxlLFxuICAgICAgICAgIFROZWdhdGFibGVcbiAgICAgICAgPixcbiAgICAgICAgRGVkb3RSZWNvcmQ8VERlZmF1bHQ+XG4gICAgICA+LFxuICAgICAgVEFsaWFzZXNcbiAgICA+XG4gIC8vIGRlbm8tbGludC1pZ25vcmUgbm8tZXhwbGljaXQtYW55XG4gIDogUmVjb3JkPHN0cmluZywgYW55PjtcblxuLyoqIEBpbnRlcm5hbCAqL1xudHlwZSBBbGlhc2VzPFRBcmdOYW1lcyA9IHN0cmluZywgVEFsaWFzTmFtZXMgZXh0ZW5kcyBzdHJpbmcgPSBzdHJpbmc+ID0gUGFydGlhbDxcbiAgUmVjb3JkPEV4dHJhY3Q8VEFyZ05hbWVzLCBzdHJpbmc+LCBUQWxpYXNOYW1lcyB8IFJlYWRvbmx5QXJyYXk8VEFsaWFzTmFtZXM+PlxuPjtcblxudHlwZSBBZGRBbGlhc2VzPFxuICBUQXJncyxcbiAgVEFsaWFzZXMgZXh0ZW5kcyBBbGlhc2VzIHwgdW5kZWZpbmVkLFxuPiA9IHtcbiAgW1RBcmdOYW1lIGluIGtleW9mIFRBcmdzIGFzIEFsaWFzTmFtZXM8VEFyZ05hbWUsIFRBbGlhc2VzPl06IFRBcmdzW1RBcmdOYW1lXTtcbn07XG5cbnR5cGUgQWxpYXNOYW1lczxcbiAgVEFyZ05hbWUsXG4gIFRBbGlhc2VzIGV4dGVuZHMgQWxpYXNlcyB8IHVuZGVmaW5lZCxcbj4gPSBUQXJnTmFtZSBleHRlbmRzIGtleW9mIFRBbGlhc2VzXG4gID8gc3RyaW5nIGV4dGVuZHMgVEFsaWFzZXNbVEFyZ05hbWVdID8gVEFyZ05hbWVcbiAgOiBUQWxpYXNlc1tUQXJnTmFtZV0gZXh0ZW5kcyBzdHJpbmcgPyBUQXJnTmFtZSB8IFRBbGlhc2VzW1RBcmdOYW1lXVxuICA6IFRBbGlhc2VzW1RBcmdOYW1lXSBleHRlbmRzIEFycmF5PHN0cmluZz5cbiAgICA/IFRBcmdOYW1lIHwgVEFsaWFzZXNbVEFyZ05hbWVdW251bWJlcl1cbiAgOiBUQXJnTmFtZVxuICA6IFRBcmdOYW1lO1xuXG4vKipcbiAqIFNwcmVhZHMgYWxsIGRlZmF1bHQgdmFsdWVzIG9mIFJlY29yZCBgVERlZmF1bHRzYCBpbnRvIFJlY29yZCBgVEFyZ3NgXG4gKiBhbmQgbWFrZXMgZGVmYXVsdCB2YWx1ZXMgcmVxdWlyZWQuXG4gKlxuICogKipFeGFtcGxlOioqXG4gKiBgU3ByZWFkVmFsdWVzPHsgZm9vPzogYm9vbGVhbiwgYmFyPzogbnVtYmVyIH0sIHsgZm9vOiBudW1iZXIgfT5gXG4gKlxuICogKipSZXN1bHQ6KiogYHsgZm9vOiBib29sZWFuIHwgbnVtYmVyLCBiYXI/OiBudW1iZXIgfWBcbiAqL1xudHlwZSBTcHJlYWREZWZhdWx0czxUQXJncywgVERlZmF1bHRzPiA9IFREZWZhdWx0cyBleHRlbmRzIHVuZGVmaW5lZCA/IFRBcmdzXG4gIDogVEFyZ3MgZXh0ZW5kcyBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPiA/XG4gICAgICAmIE9taXQ8VEFyZ3MsIGtleW9mIFREZWZhdWx0cz5cbiAgICAgICYge1xuICAgICAgICBbRGVmYXVsdCBpbiBrZXlvZiBURGVmYXVsdHNdOiBEZWZhdWx0IGV4dGVuZHMga2V5b2YgVEFyZ3NcbiAgICAgICAgICA/IChUQXJnc1tEZWZhdWx0XSAmIFREZWZhdWx0c1tEZWZhdWx0XSB8IFREZWZhdWx0c1tEZWZhdWx0XSkgZXh0ZW5kc1xuICAgICAgICAgICAgUmVjb3JkPHN0cmluZywgdW5rbm93bj5cbiAgICAgICAgICAgID8gTm9uTnVsbGFibGU8U3ByZWFkRGVmYXVsdHM8VEFyZ3NbRGVmYXVsdF0sIFREZWZhdWx0c1tEZWZhdWx0XT4+XG4gICAgICAgICAgOiBURGVmYXVsdHNbRGVmYXVsdF0gfCBOb25OdWxsYWJsZTxUQXJnc1tEZWZhdWx0XT5cbiAgICAgICAgICA6IHVua25vd247XG4gICAgICB9XG4gIDogbmV2ZXI7XG5cbi8qKlxuICogRGVmaW5lcyB0aGUgUmVjb3JkIGZvciB0aGUgYGRlZmF1bHRgIG9wdGlvbiB0byBhZGRcbiAqIGF1dG8tc3VnZ2VzdGlvbiBzdXBwb3J0IGZvciBJREUncy5cbiAqIEBpbnRlcm5hbFxuICovXG50eXBlIERlZmF1bHRzPFRCb29sZWFucyBleHRlbmRzIEJvb2xlYW5UeXBlLCBUU3RyaW5ncyBleHRlbmRzIFN0cmluZ1R5cGU+ID0gSWQ8XG4gIFVuaW9uVG9JbnRlcnNlY3Rpb248XG4gICAgJiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPlxuICAgIC8vIERlZG90dGVkIGF1dG8gc3VnZ2VzdGlvbnM6IHsgZm9vOiB7IGJhcjogdW5rbm93biB9IH1cbiAgICAmIE1hcFR5cGVzPFRTdHJpbmdzLCB1bmtub3duPlxuICAgICYgTWFwVHlwZXM8VEJvb2xlYW5zLCB1bmtub3duPlxuICAgIC8vIEZsYXQgYXV0byBzdWdnZXN0aW9uczogeyBcImZvby5iYXJcIjogdW5rbm93biB9XG4gICAgJiBNYXBEZWZhdWx0czxUQm9vbGVhbnM+XG4gICAgJiBNYXBEZWZhdWx0czxUU3RyaW5ncz5cbiAgPlxuPjtcblxudHlwZSBNYXBEZWZhdWx0czxUQXJnTmFtZXMgZXh0ZW5kcyBBcmdUeXBlPiA9IFBhcnRpYWw8XG4gIFJlY29yZDxUQXJnTmFtZXMgZXh0ZW5kcyBzdHJpbmcgPyBUQXJnTmFtZXMgOiBzdHJpbmcsIHVua25vd24+XG4+O1xuXG50eXBlIFJlY3Vyc2l2ZVJlcXVpcmVkPFRSZWNvcmQ+ID0gVFJlY29yZCBleHRlbmRzIFJlY29yZDxzdHJpbmcsIHVua25vd24+ID8ge1xuICAgIFtLZXkgaW4ga2V5b2YgVFJlY29yZF0tPzogUmVjdXJzaXZlUmVxdWlyZWQ8VFJlY29yZFtLZXldPjtcbiAgfVxuICA6IFRSZWNvcmQ7XG5cbi8qKiBTYW1lIGFzIGBNYXBUeXBlc2AgYnV0IGFsc28gc3VwcG9ydHMgY29sbGVjdGFibGUgb3B0aW9ucy4gKi9cbnR5cGUgQ29sbGVjdFZhbHVlczxcbiAgVEFyZ05hbWVzIGV4dGVuZHMgQXJnVHlwZSxcbiAgVFR5cGUsXG4gIFRDb2xsZWN0YWJsZSBleHRlbmRzIENvbGxlY3RhYmxlLFxuICBUTmVnYXRhYmxlIGV4dGVuZHMgTmVnYXRhYmxlID0gdW5kZWZpbmVkLFxuPiA9IFVuaW9uVG9JbnRlcnNlY3Rpb248XG4gIEV4dHJhY3Q8VEFyZ05hbWVzLCBUQ29sbGVjdGFibGU+IGV4dGVuZHMgc3RyaW5nID9cbiAgICAgICYgKEV4Y2x1ZGU8VEFyZ05hbWVzLCBUQ29sbGVjdGFibGU+IGV4dGVuZHMgbmV2ZXIgPyBSZWNvcmQ8bmV2ZXIsIG5ldmVyPlxuICAgICAgICA6IE1hcFR5cGVzPEV4Y2x1ZGU8VEFyZ05hbWVzLCBUQ29sbGVjdGFibGU+LCBUVHlwZSwgVE5lZ2F0YWJsZT4pXG4gICAgICAmIChFeHRyYWN0PFRBcmdOYW1lcywgVENvbGxlY3RhYmxlPiBleHRlbmRzIG5ldmVyID8gUmVjb3JkPG5ldmVyLCBuZXZlcj5cbiAgICAgICAgOiBSZWN1cnNpdmVSZXF1aXJlZDxcbiAgICAgICAgICBNYXBUeXBlczxFeHRyYWN0PFRBcmdOYW1lcywgVENvbGxlY3RhYmxlPiwgQXJyYXk8VFR5cGU+LCBUTmVnYXRhYmxlPlxuICAgICAgICA+KVxuICAgIDogTWFwVHlwZXM8VEFyZ05hbWVzLCBUVHlwZSwgVE5lZ2F0YWJsZT5cbj47XG5cbi8qKiBTYW1lIGFzIGBSZWNvcmRgIGJ1dCBhbHNvIHN1cHBvcnRzIGRvdHRlZCBhbmQgbmVnYXRhYmxlIG9wdGlvbnMuICovXG50eXBlIE1hcFR5cGVzPFxuICBUQXJnTmFtZXMgZXh0ZW5kcyBBcmdUeXBlLFxuICBUVHlwZSxcbiAgVE5lZ2F0YWJsZSBleHRlbmRzIE5lZ2F0YWJsZSA9IHVuZGVmaW5lZCxcbj4gPSB1bmRlZmluZWQgZXh0ZW5kcyBUQXJnTmFtZXMgPyBSZWNvcmQ8bmV2ZXIsIG5ldmVyPlxuICA6IFRBcmdOYW1lcyBleHRlbmRzIGAke2luZmVyIE5hbWV9LiR7aW5mZXIgUmVzdH1gID8ge1xuICAgICAgW0tleSBpbiBOYW1lXT86IE1hcFR5cGVzPFxuICAgICAgICBSZXN0LFxuICAgICAgICBUVHlwZSxcbiAgICAgICAgVE5lZ2F0YWJsZSBleHRlbmRzIGAke05hbWV9LiR7aW5mZXIgTmVnYXRlfWAgPyBOZWdhdGUgOiB1bmRlZmluZWRcbiAgICAgID47XG4gICAgfVxuICA6IFRBcmdOYW1lcyBleHRlbmRzIHN0cmluZyA/IFBhcnRpYWw8XG4gICAgICBSZWNvcmQ8VEFyZ05hbWVzLCBUTmVnYXRhYmxlIGV4dGVuZHMgVEFyZ05hbWVzID8gVFR5cGUgfCBmYWxzZSA6IFRUeXBlPlxuICAgID5cbiAgOiBSZWNvcmQ8bmV2ZXIsIG5ldmVyPjtcblxudHlwZSBDb2xsZWN0VW5rbm93blZhbHVlczxcbiAgVEJvb2xlYW5zIGV4dGVuZHMgQm9vbGVhblR5cGUsXG4gIFRTdHJpbmdzIGV4dGVuZHMgU3RyaW5nVHlwZSxcbiAgVENvbGxlY3RhYmxlIGV4dGVuZHMgQ29sbGVjdGFibGUsXG4gIFROZWdhdGFibGUgZXh0ZW5kcyBOZWdhdGFibGUsXG4+ID0gVW5pb25Ub0ludGVyc2VjdGlvbjxcbiAgVENvbGxlY3RhYmxlIGV4dGVuZHMgVEJvb2xlYW5zICYgVFN0cmluZ3MgPyBSZWNvcmQ8bmV2ZXIsIG5ldmVyPlxuICAgIDogRGVkb3RSZWNvcmQ8XG4gICAgICAvLyBVbmtub3duIGNvbGxlY3RhYmxlICYgbm9uLW5lZ2F0YWJsZSBhcmdzLlxuICAgICAgJiBSZWNvcmQ8XG4gICAgICAgIEV4Y2x1ZGU8XG4gICAgICAgICAgRXh0cmFjdDxFeGNsdWRlPFRDb2xsZWN0YWJsZSwgVE5lZ2F0YWJsZT4sIHN0cmluZz4sXG4gICAgICAgICAgRXh0cmFjdDxUU3RyaW5ncyB8IFRCb29sZWFucywgc3RyaW5nPlxuICAgICAgICA+LFxuICAgICAgICBBcnJheTx1bmtub3duPlxuICAgICAgPlxuICAgICAgLy8gVW5rbm93biBjb2xsZWN0YWJsZSAmIG5lZ2F0YWJsZSBhcmdzLlxuICAgICAgJiBSZWNvcmQ8XG4gICAgICAgIEV4Y2x1ZGU8XG4gICAgICAgICAgRXh0cmFjdDxFeHRyYWN0PFRDb2xsZWN0YWJsZSwgVE5lZ2F0YWJsZT4sIHN0cmluZz4sXG4gICAgICAgICAgRXh0cmFjdDxUU3RyaW5ncyB8IFRCb29sZWFucywgc3RyaW5nPlxuICAgICAgICA+LFxuICAgICAgICBBcnJheTx1bmtub3duPiB8IGZhbHNlXG4gICAgICA+XG4gICAgPlxuPjtcblxuLyoqIENvbnZlcnRzIGB7IFwiZm9vLmJhci5iYXpcIjogdW5rbm93biB9YCBpbnRvIGB7IGZvbzogeyBiYXI6IHsgYmF6OiB1bmtub3duIH0gfSB9YC4gKi9cbnR5cGUgRGVkb3RSZWNvcmQ8VFJlY29yZD4gPSBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPiBleHRlbmRzIFRSZWNvcmQgPyBUUmVjb3JkXG4gIDogVFJlY29yZCBleHRlbmRzIFJlY29yZDxzdHJpbmcsIHVua25vd24+ID8gVW5pb25Ub0ludGVyc2VjdGlvbjxcbiAgICAgIFZhbHVlT2Y8XG4gICAgICAgIHtcbiAgICAgICAgICBbS2V5IGluIGtleW9mIFRSZWNvcmRdOiBLZXkgZXh0ZW5kcyBzdHJpbmcgPyBEZWRvdDxLZXksIFRSZWNvcmRbS2V5XT5cbiAgICAgICAgICAgIDogbmV2ZXI7XG4gICAgICAgIH1cbiAgICAgID5cbiAgICA+XG4gIDogVFJlY29yZDtcblxudHlwZSBEZWRvdDxUS2V5IGV4dGVuZHMgc3RyaW5nLCBUVmFsdWU+ID0gVEtleSBleHRlbmRzXG4gIGAke2luZmVyIE5hbWV9LiR7aW5mZXIgUmVzdH1gID8geyBbS2V5IGluIE5hbWVdOiBEZWRvdDxSZXN0LCBUVmFsdWU+IH1cbiAgOiB7IFtLZXkgaW4gVEtleV06IFRWYWx1ZSB9O1xuXG50eXBlIFZhbHVlT2Y8VFZhbHVlPiA9IFRWYWx1ZVtrZXlvZiBUVmFsdWVdO1xuXG4vKiogVGhlIHZhbHVlIHJldHVybmVkIGZyb20ge0BsaW5rY29kZSBwYXJzZUFyZ3N9LiAqL1xuZXhwb3J0IHR5cGUgQXJnczxcbiAgLy8gZGVuby1saW50LWlnbm9yZSBuby1leHBsaWNpdC1hbnlcbiAgVEFyZ3MgZXh0ZW5kcyBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPiA9IFJlY29yZDxzdHJpbmcsIGFueT4sXG4gIFREb3VibGVEYXNoIGV4dGVuZHMgYm9vbGVhbiB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZCxcbj4gPSBJZDxcbiAgJiBUQXJnc1xuICAmIHtcbiAgICAvKiogQ29udGFpbnMgYWxsIHRoZSBhcmd1bWVudHMgdGhhdCBkaWRuJ3QgaGF2ZSBhbiBvcHRpb24gYXNzb2NpYXRlZCB3aXRoXG4gICAgICogdGhlbS4gKi9cbiAgICBfOiBBcnJheTxzdHJpbmcgfCBudW1iZXI+O1xuICB9XG4gICYgKGJvb2xlYW4gZXh0ZW5kcyBURG91YmxlRGFzaCA/IERvdWJsZURhc2hcbiAgICA6IHRydWUgZXh0ZW5kcyBURG91YmxlRGFzaCA/IFJlcXVpcmVkPERvdWJsZURhc2g+XG4gICAgOiBSZWNvcmQ8bmV2ZXIsIG5ldmVyPilcbj47XG5cbi8qKiBAaW50ZXJuYWwgKi9cbnR5cGUgRG91YmxlRGFzaCA9IHtcbiAgLyoqIENvbnRhaW5zIGFsbCB0aGUgYXJndW1lbnRzIHRoYXQgYXBwZWFyIGFmdGVyIHRoZSBkb3VibGUgZGFzaDogXCItLVwiLiAqL1xuICBcIi0tXCI/OiBBcnJheTxzdHJpbmc+O1xufTtcblxuLyoqIE9wdGlvbnMgZm9yIHtAbGlua2NvZGUgcGFyc2VBcmdzfS4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgUGFyc2VPcHRpb25zPFxuICBUQm9vbGVhbnMgZXh0ZW5kcyBCb29sZWFuVHlwZSA9IEJvb2xlYW5UeXBlLFxuICBUU3RyaW5ncyBleHRlbmRzIFN0cmluZ1R5cGUgPSBTdHJpbmdUeXBlLFxuICBUQ29sbGVjdGFibGUgZXh0ZW5kcyBDb2xsZWN0YWJsZSA9IENvbGxlY3RhYmxlLFxuICBUTmVnYXRhYmxlIGV4dGVuZHMgTmVnYXRhYmxlID0gTmVnYXRhYmxlLFxuICBURGVmYXVsdCBleHRlbmRzIFJlY29yZDxzdHJpbmcsIHVua25vd24+IHwgdW5kZWZpbmVkID1cbiAgICB8IFJlY29yZDxzdHJpbmcsIHVua25vd24+XG4gICAgfCB1bmRlZmluZWQsXG4gIFRBbGlhc2VzIGV4dGVuZHMgQWxpYXNlcyB8IHVuZGVmaW5lZCA9IEFsaWFzZXMgfCB1bmRlZmluZWQsXG4gIFREb3VibGVEYXNoIGV4dGVuZHMgYm9vbGVhbiB8IHVuZGVmaW5lZCA9IGJvb2xlYW4gfCB1bmRlZmluZWQsXG4+IHtcbiAgLyoqXG4gICAqIFdoZW4gYHRydWVgLCBwb3B1bGF0ZSB0aGUgcmVzdWx0IGBfYCB3aXRoIGV2ZXJ5dGhpbmcgYmVmb3JlIHRoZSBgLS1gIGFuZFxuICAgKiB0aGUgcmVzdWx0IGBbJy0tJ11gIHdpdGggZXZlcnl0aGluZyBhZnRlciB0aGUgYC0tYC5cbiAgICpcbiAgICogQGRlZmF1bHQge2ZhbHNlfVxuICAgKlxuICAgKiBAZXhhbXBsZSBEb3VibGUgZGFzaCBvcHRpb24gaXMgZmFsc2VcbiAgICogYGBgdHNcbiAgICogLy8gJCBkZW5vIHJ1biBleGFtcGxlLnRzIC0tIGEgYXJnMVxuICAgKiBpbXBvcnQgeyBwYXJzZUFyZ3MgfSBmcm9tIFwiQHN0ZC9jbGkvcGFyc2UtYXJnc1wiO1xuICAgKiBjb25zdCBhcmdzID0gcGFyc2VBcmdzKERlbm8uYXJncywgeyBcIi0tXCI6IGZhbHNlIH0pOyAvLyBhcmdzIGVxdWFscyB7IF86IFsgXCJhXCIsIFwiYXJnMVwiIF0gfVxuICAgKiBgYGBcbiAgICpcbiAgICogQGV4YW1wbGUgRG91YmxlIGRhc2ggb3B0aW9uIGlzIHRydWVcbiAgICogYGBgdHNcbiAgICogLy8gJCBkZW5vIHJ1biBleGFtcGxlLnRzIC0tIGEgYXJnMVxuICAgKiBpbXBvcnQgeyBwYXJzZUFyZ3MgfSBmcm9tIFwiQHN0ZC9jbGkvcGFyc2UtYXJnc1wiO1xuICAgKiBjb25zdCBhcmdzID0gcGFyc2VBcmdzKERlbm8uYXJncywgeyBcIi0tXCI6IHRydWUgfSk7IC8vIGFyZ3MgZXF1YWxzIHsgXzogW10sIC0tOiBbIFwiYVwiLCBcImFyZzFcIiBdIH1cbiAgICogYGBgXG4gICAqL1xuICBcIi0tXCI/OiBURG91YmxlRGFzaDtcblxuICAvKipcbiAgICogQW4gb2JqZWN0IG1hcHBpbmcgc3RyaW5nIG5hbWVzIHRvIHN0cmluZ3Mgb3IgYXJyYXlzIG9mIHN0cmluZyBhcmd1bWVudFxuICAgKiBuYW1lcyB0byB1c2UgYXMgYWxpYXNlcy5cbiAgICpcbiAgICogQGRlZmF1bHQge3t9fVxuICAgKi9cbiAgYWxpYXM/OiBUQWxpYXNlcztcblxuICAvKipcbiAgICogQSBib29sZWFuLCBzdHJpbmcgb3IgYXJyYXkgb2Ygc3RyaW5ncyB0byBhbHdheXMgdHJlYXQgYXMgYm9vbGVhbnMuIElmXG4gICAqIGB0cnVlYCB3aWxsIHRyZWF0IGFsbCBkb3VibGUgaHlwaGVuYXRlZCBhcmd1bWVudHMgd2l0aG91dCBlcXVhbCBzaWducyBhc1xuICAgKiBgYm9vbGVhbmAgKGUuZy4gYWZmZWN0cyBgLS1mb29gLCBub3QgYC1mYCBvciBgLS1mb289YmFyYCkuXG4gICAqICBBbGwgYGJvb2xlYW5gIGFyZ3VtZW50cyB3aWxsIGJlIHNldCB0byBgZmFsc2VgIGJ5IGRlZmF1bHQuXG4gICAqXG4gICAqIEBkZWZhdWx0IHtmYWxzZX1cbiAgICovXG4gIGJvb2xlYW4/OiBUQm9vbGVhbnMgfCBSZWFkb25seUFycmF5PEV4dHJhY3Q8VEJvb2xlYW5zLCBzdHJpbmc+PjtcblxuICAvKipcbiAgICogQW4gb2JqZWN0IG1hcHBpbmcgc3RyaW5nIGFyZ3VtZW50IG5hbWVzIHRvIGRlZmF1bHQgdmFsdWVzLlxuICAgKlxuICAgKiBAZGVmYXVsdCB7e319XG4gICAqL1xuICBkZWZhdWx0PzogVERlZmF1bHQgJiBEZWZhdWx0czxUQm9vbGVhbnMsIFRTdHJpbmdzPjtcblxuICAvKipcbiAgICogV2hlbiBgdHJ1ZWAsIHBvcHVsYXRlIHRoZSByZXN1bHQgYF9gIHdpdGggZXZlcnl0aGluZyBhZnRlciB0aGUgZmlyc3RcbiAgICogbm9uLW9wdGlvbi5cbiAgICpcbiAgICogQGRlZmF1bHQge2ZhbHNlfVxuICAgKi9cbiAgc3RvcEVhcmx5PzogYm9vbGVhbjtcblxuICAvKipcbiAgICogQSBzdHJpbmcgb3IgYXJyYXkgb2Ygc3RyaW5ncyBhcmd1bWVudCBuYW1lcyB0byBhbHdheXMgdHJlYXQgYXMgc3RyaW5ncy5cbiAgICpcbiAgICogQGRlZmF1bHQge1tdfVxuICAgKi9cbiAgc3RyaW5nPzogVFN0cmluZ3MgfCBSZWFkb25seUFycmF5PEV4dHJhY3Q8VFN0cmluZ3MsIHN0cmluZz4+O1xuXG4gIC8qKlxuICAgKiBBIHN0cmluZyBvciBhcnJheSBvZiBzdHJpbmdzIGFyZ3VtZW50IG5hbWVzIHRvIGFsd2F5cyB0cmVhdCBhcyBhcnJheXMuXG4gICAqIENvbGxlY3RhYmxlIG9wdGlvbnMgY2FuIGJlIHVzZWQgbXVsdGlwbGUgdGltZXMuIEFsbCB2YWx1ZXMgd2lsbCBiZVxuICAgKiBjb2xsZWN0ZWQgaW50byBvbmUgYXJyYXkuIElmIGEgbm9uLWNvbGxlY3RhYmxlIG9wdGlvbiBpcyB1c2VkIG11bHRpcGxlXG4gICAqIHRpbWVzLCB0aGUgbGFzdCB2YWx1ZSBpcyB1c2VkLlxuICAgKlxuICAgKiBAZGVmYXVsdCB7W119XG4gICAqL1xuICBjb2xsZWN0PzogVENvbGxlY3RhYmxlIHwgUmVhZG9ubHlBcnJheTxFeHRyYWN0PFRDb2xsZWN0YWJsZSwgc3RyaW5nPj47XG5cbiAgLyoqXG4gICAqIEEgc3RyaW5nIG9yIGFycmF5IG9mIHN0cmluZ3MgYXJndW1lbnQgbmFtZXMgd2hpY2ggY2FuIGJlIG5lZ2F0ZWRcbiAgICogYnkgcHJlZml4aW5nIHRoZW0gd2l0aCBgLS1uby1gLCBsaWtlIGAtLW5vLWNvbmZpZ2AuXG4gICAqXG4gICAqIEBkZWZhdWx0IHtbXX1cbiAgICovXG4gIG5lZ2F0YWJsZT86IFROZWdhdGFibGUgfCBSZWFkb25seUFycmF5PEV4dHJhY3Q8VE5lZ2F0YWJsZSwgc3RyaW5nPj47XG5cbiAgLyoqXG4gICAqIEEgZnVuY3Rpb24gd2hpY2ggaXMgaW52b2tlZCB3aXRoIGEgY29tbWFuZCBsaW5lIHBhcmFtZXRlciBub3QgZGVmaW5lZCBpblxuICAgKiB0aGUgYG9wdGlvbnNgIGNvbmZpZ3VyYXRpb24gb2JqZWN0LiBJZiB0aGUgZnVuY3Rpb24gcmV0dXJucyBgZmFsc2VgLCB0aGVcbiAgICogdW5rbm93biBvcHRpb24gaXMgbm90IGFkZGVkIHRvIGBwYXJzZWRBcmdzYC5cbiAgICpcbiAgICogQGRlZmF1bHQge3Vua25vd259XG4gICAqL1xuICB1bmtub3duPzogKGFyZzogc3RyaW5nLCBrZXk/OiBzdHJpbmcsIHZhbHVlPzogdW5rbm93bikgPT4gdW5rbm93bjtcbn1cblxuaW50ZXJmYWNlIE5lc3RlZE1hcHBpbmcge1xuICBba2V5OiBzdHJpbmddOiBOZXN0ZWRNYXBwaW5nIHwgdW5rbm93bjtcbn1cblxuY29uc3QgRkxBR19SRUdFWFAgPVxuICAvXig/Oi0oPzooPzxkb3VibGVEYXNoPi0pKD88bmVnYXRlZD5uby0pPyk/KSg/PGtleT4uKz8pKD86PSg/PHZhbHVlPi4rPykpPyQvcztcbmNvbnN0IExFVFRFUl9SRUdFWFAgPSAvW0EtWmEtel0vO1xuY29uc3QgTlVNQkVSX1JFR0VYUCA9IC8tP1xcZCsoXFwuXFxkKik/KGUtP1xcZCspPyQvO1xuY29uc3QgSFlQSEVOX1JFR0VYUCA9IC9eKC18LS0pW14tXS87XG5jb25zdCBWQUxVRV9SRUdFWFAgPSAvPSg/PHZhbHVlPi4rKS87XG5jb25zdCBGTEFHX05BTUVfUkVHRVhQID0gL14tLVtePV0rJC87XG5jb25zdCBTUEVDSUFMX0NIQVJfUkVHRVhQID0gL1xcVy87XG5cbmNvbnN0IE5PTl9XSElURVNQQUNFX1JFR0VYUCA9IC9cXFMvO1xuXG5mdW5jdGlvbiBpc051bWJlcihzdHJpbmc6IHN0cmluZyk6IGJvb2xlYW4ge1xuICByZXR1cm4gTk9OX1dISVRFU1BBQ0VfUkVHRVhQLnRlc3Qoc3RyaW5nKSAmJiBOdW1iZXIuaXNGaW5pdGUoTnVtYmVyKHN0cmluZykpO1xufVxuXG5mdW5jdGlvbiBzZXROZXN0ZWQoXG4gIG9iamVjdDogTmVzdGVkTWFwcGluZyxcbiAga2V5czogc3RyaW5nW10sXG4gIHZhbHVlOiB1bmtub3duLFxuICBjb2xsZWN0ID0gZmFsc2UsXG4pIHtcbiAga2V5cyA9IFsuLi5rZXlzXTtcbiAgY29uc3Qga2V5ID0ga2V5cy5wb3AoKSE7XG5cbiAga2V5cy5mb3JFYWNoKChrZXkpID0+IG9iamVjdCA9IChvYmplY3Rba2V5XSA/Pz0ge30pIGFzIE5lc3RlZE1hcHBpbmcpO1xuXG4gIGlmIChjb2xsZWN0KSB7XG4gICAgY29uc3QgdiA9IG9iamVjdFtrZXldO1xuICAgIGlmIChBcnJheS5pc0FycmF5KHYpKSB7XG4gICAgICB2LnB1c2godmFsdWUpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhbHVlID0gdiA/IFt2LCB2YWx1ZV0gOiBbdmFsdWVdO1xuICB9XG5cbiAgb2JqZWN0W2tleV0gPSB2YWx1ZTtcbn1cblxuZnVuY3Rpb24gaGFzTmVzdGVkKG9iamVjdDogTmVzdGVkTWFwcGluZywga2V5czogc3RyaW5nW10pOiBib29sZWFuIHtcbiAgZm9yIChjb25zdCBrZXkgb2Yga2V5cykge1xuICAgIGNvbnN0IHZhbHVlID0gb2JqZWN0W2tleV07XG4gICAgaWYgKCFPYmplY3QuaGFzT3duKG9iamVjdCwga2V5KSkgcmV0dXJuIGZhbHNlO1xuICAgIG9iamVjdCA9IHZhbHVlIGFzIE5lc3RlZE1hcHBpbmc7XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIGFsaWFzSXNCb29sZWFuKFxuICBhbGlhc01hcDogTWFwPHN0cmluZywgU2V0PHN0cmluZz4+LFxuICBib29sZWFuU2V0OiBTZXQ8c3RyaW5nPixcbiAga2V5OiBzdHJpbmcsXG4pOiBib29sZWFuIHtcbiAgY29uc3Qgc2V0ID0gYWxpYXNNYXAuZ2V0KGtleSk7XG4gIGlmIChzZXQgPT09IHVuZGVmaW5lZCkgcmV0dXJuIGZhbHNlO1xuICBmb3IgKGNvbnN0IGFsaWFzIG9mIHNldCkgaWYgKGJvb2xlYW5TZXQuaGFzKGFsaWFzKSkgcmV0dXJuIHRydWU7XG4gIHJldHVybiBmYWxzZTtcbn1cblxuZnVuY3Rpb24gaXNCb29sZWFuU3RyaW5nKHZhbHVlOiBzdHJpbmcpIHtcbiAgcmV0dXJuIHZhbHVlID09PSBcInRydWVcIiB8fCB2YWx1ZSA9PT0gXCJmYWxzZVwiO1xufVxuXG5mdW5jdGlvbiBwYXJzZUJvb2xlYW5TdHJpbmcodmFsdWU6IHVua25vd24pIHtcbiAgcmV0dXJuIHZhbHVlICE9PSBcImZhbHNlXCI7XG59XG5cbi8qKlxuICogVGFrZSBhIHNldCBvZiBjb21tYW5kIGxpbmUgYXJndW1lbnRzLCBvcHRpb25hbGx5IHdpdGggYSBzZXQgb2Ygb3B0aW9ucywgYW5kXG4gKiByZXR1cm4gYW4gb2JqZWN0IHJlcHJlc2VudGluZyB0aGUgZmxhZ3MgZm91bmQgaW4gdGhlIHBhc3NlZCBhcmd1bWVudHMuXG4gKlxuICogQnkgZGVmYXVsdCwgYW55IGFyZ3VtZW50cyBzdGFydGluZyB3aXRoIGAtYCBvciBgLS1gIGFyZSBjb25zaWRlcmVkIGJvb2xlYW5cbiAqIGZsYWdzLiBJZiB0aGUgYXJndW1lbnQgbmFtZSBpcyBmb2xsb3dlZCBieSBhbiBlcXVhbCBzaWduIChgPWApIGl0IGlzXG4gKiBjb25zaWRlcmVkIGEga2V5LXZhbHVlIHBhaXIuIEFueSBhcmd1bWVudHMgd2hpY2ggY291bGQgbm90IGJlIHBhcnNlZCBhcmVcbiAqIGF2YWlsYWJsZSBpbiB0aGUgYF9gIHByb3BlcnR5IG9mIHRoZSByZXR1cm5lZCBvYmplY3QuXG4gKlxuICogQnkgZGVmYXVsdCwgdGhpcyBtb2R1bGUgdHJpZXMgdG8gZGV0ZXJtaW5lIHRoZSB0eXBlIG9mIGFsbCBhcmd1bWVudHNcbiAqIGF1dG9tYXRpY2FsbHkgYW5kIHRoZSByZXR1cm4gdHlwZSBvZiB0aGlzIGZ1bmN0aW9uIHdpbGwgaGF2ZSBhbiBpbmRleFxuICogc2lnbmF0dXJlIHdpdGggYGFueWAgYXMgdmFsdWUgKGB7IFt4OiBzdHJpbmddOiBhbnkgfWApLlxuICpcbiAqIElmIHRoZSBgc3RyaW5nYCwgYGJvb2xlYW5gIG9yIGBjb2xsZWN0YCBvcHRpb24gaXMgc2V0LCB0aGUgcmV0dXJuIHZhbHVlIG9mXG4gKiB0aGlzIGZ1bmN0aW9uIHdpbGwgYmUgZnVsbHkgdHlwZWQgYW5kIHRoZSBpbmRleCBzaWduYXR1cmUgb2YgdGhlIHJldHVyblxuICogdHlwZSB3aWxsIGNoYW5nZSB0byBgeyBbeDogc3RyaW5nXTogdW5rbm93biB9YC5cbiAqXG4gKiBBbnkgYXJndW1lbnRzIGFmdGVyIGAnLS0nYCB3aWxsIG5vdCBiZSBwYXJzZWQgYW5kIHdpbGwgZW5kIHVwIGluIGBwYXJzZWRBcmdzLl9gLlxuICpcbiAqIE51bWVyaWMtbG9va2luZyBhcmd1bWVudHMgd2lsbCBiZSByZXR1cm5lZCBhcyBudW1iZXJzIHVubGVzcyBgb3B0aW9ucy5zdHJpbmdgXG4gKiBvciBgb3B0aW9ucy5ib29sZWFuYCBpcyBzZXQgZm9yIHRoYXQgYXJndW1lbnQgbmFtZS5cbiAqXG4gKiBTZWUge0BsaW5rY29kZSBQYXJzZU9wdGlvbnN9IGZvciBtb3JlIGluZm9ybWF0aW9uLlxuICpcbiAqIEBwYXJhbSBhcmdzIEFuIGFycmF5IG9mIGNvbW1hbmQgbGluZSBhcmd1bWVudHMuXG4gKiBAcGFyYW0gb3B0aW9ucyBPcHRpb25zIGZvciB0aGUgcGFyc2UgZnVuY3Rpb24uXG4gKlxuICogQHR5cGVQYXJhbSBUQXJncyBUeXBlIG9mIHJlc3VsdC5cbiAqIEB0eXBlUGFyYW0gVERvdWJsZURhc2ggVXNlZCBieSBgVEFyZ3NgIGZvciB0aGUgcmVzdWx0LlxuICogQHR5cGVQYXJhbSBUQm9vbGVhbnMgVXNlZCBieSBgVEFyZ3NgIGZvciB0aGUgcmVzdWx0LlxuICogQHR5cGVQYXJhbSBUU3RyaW5ncyBVc2VkIGJ5IGBUQXJnc2AgZm9yIHRoZSByZXN1bHQuXG4gKiBAdHlwZVBhcmFtIFRDb2xsZWN0YWJsZSBVc2VkIGJ5IGBUQXJnc2AgZm9yIHRoZSByZXN1bHQuXG4gKiBAdHlwZVBhcmFtIFROZWdhdGFibGUgVXNlZCBieSBgVEFyZ3NgIGZvciB0aGUgcmVzdWx0LlxuICogQHR5cGVQYXJhbSBURGVmYXVsdHMgVXNlZCBieSBgVEFyZ3NgIGZvciB0aGUgcmVzdWx0LlxuICogQHR5cGVQYXJhbSBUQWxpYXNlcyBVc2VkIGJ5IGBUQXJnc2AgZm9yIHRoZSByZXN1bHQuXG4gKiBAdHlwZVBhcmFtIFRBbGlhc0FyZ05hbWVzIFVzZWQgYnkgYFRBcmdzYCBmb3IgdGhlIHJlc3VsdC5cbiAqIEB0eXBlUGFyYW0gVEFsaWFzTmFtZXMgVXNlZCBieSBgVEFyZ3NgIGZvciB0aGUgcmVzdWx0LlxuICpcbiAqIEByZXR1cm4gVGhlIHBhcnNlZCBhcmd1bWVudHMuXG4gKlxuICogQGV4YW1wbGUgVXNhZ2VcbiAqIGBgYHRzXG4gKiBpbXBvcnQgeyBwYXJzZUFyZ3MgfSBmcm9tIFwiQHN0ZC9jbGkvcGFyc2UtYXJnc1wiO1xuICogaW1wb3J0IHsgYXNzZXJ0RXF1YWxzIH0gZnJvbSBcIkBzdGQvYXNzZXJ0L2VxdWFsc1wiO1xuICpcbiAqIC8vIEZvciBwcm9wZXIgdXNlLCBvbmUgc2hvdWxkIHVzZSBgcGFyc2VBcmdzKERlbm8uYXJncylgXG4gKiBhc3NlcnRFcXVhbHMocGFyc2VBcmdzKFtcIi0tZm9vXCIsIFwiLS1iYXI9YmF6XCIsIFwiLi9xdXV4LnR4dFwiXSksIHtcbiAqICAgZm9vOiB0cnVlLFxuICogICBiYXI6IFwiYmF6XCIsXG4gKiAgIF86IFtcIi4vcXV1eC50eHRcIl0sXG4gKiB9KTtcbiAqIGBgYFxuICpcbiAqIEBleGFtcGxlIGBzdHJpbmdgIGFuZCBgYm9vbGVhbmAgb3B0aW9uc1xuICpcbiAqIFVzZSBgc3RyaW5nYCBhbmQgYGJvb2xlYW5gIG9wdGlvbnMgdG8gc3BlY2lmeSB0aGUgdHlwZSBvZiB0aGUgYXJndW1lbnQuXG4gKlxuICogYGBgdHNcbiAqIGltcG9ydCB7IHBhcnNlQXJncyB9IGZyb20gXCJAc3RkL2NsaS9wYXJzZS1hcmdzXCI7XG4gKiBpbXBvcnQgeyBhc3NlcnRFcXVhbHMgfSBmcm9tIFwiQHN0ZC9hc3NlcnQvZXF1YWxzXCI7XG4gKlxuICogY29uc3QgYXJncyA9IHBhcnNlQXJncyhbXCItLWZvb1wiLCBcIi0tYmFyXCIsIFwiYmF6XCJdLCB7XG4gKiAgIGJvb2xlYW46IFtcImZvb1wiXSxcbiAqICAgc3RyaW5nOiBbXCJiYXJcIl0sXG4gKiB9KTtcbiAqXG4gKiBhc3NlcnRFcXVhbHMoYXJncywgeyBmb286IHRydWUsIGJhcjogXCJiYXpcIiwgXzogW10gfSk7XG4gKiBgYGBcbiAqXG4gKiBAZXhhbXBsZSBgY29sbGVjdGAgb3B0aW9uXG4gKlxuICogYGNvbGxlY3RgIG9wdGlvbiB0ZWxscyB0aGUgcGFyc2VyIHRvIHRyZWF0IHRoZSBvcHRpb24gYXMgYW4gYXJyYXkuIEFsbFxuICogdmFsdWVzIHdpbGwgYmUgY29sbGVjdGVkIGludG8gb25lIGFycmF5LiBJZiBhIG5vbi1jb2xsZWN0YWJsZSBvcHRpb24gaXMgdXNlZFxuICogbXVsdGlwbGUgdGltZXMsIHRoZSBsYXN0IHZhbHVlIGlzIHVzZWQuXG4gKlxuICogYGBgdHNcbiAqIGltcG9ydCB7IHBhcnNlQXJncyB9IGZyb20gXCJAc3RkL2NsaS9wYXJzZS1hcmdzXCI7XG4gKiBpbXBvcnQgeyBhc3NlcnRFcXVhbHMgfSBmcm9tIFwiQHN0ZC9hc3NlcnQvZXF1YWxzXCI7XG4gKlxuICogY29uc3QgYXJncyA9IHBhcnNlQXJncyhbXCItLWZvb1wiLCBcImJhclwiLCBcIi0tZm9vXCIsIFwiYmF6XCJdLCB7XG4gKiAgY29sbGVjdDogW1wiZm9vXCJdLFxuICogfSk7XG4gKlxuICogYXNzZXJ0RXF1YWxzKGFyZ3MsIHsgZm9vOiBbXCJiYXJcIiwgXCJiYXpcIl0sIF86IFtdIH0pO1xuICogYGBgXG4gKlxuICogQGV4YW1wbGUgYG5lZ2F0YWJsZWAgb3B0aW9uXG4gKlxuICogYG5lZ2F0YWJsZWAgb3B0aW9uIHRlbGxzIHRoZSBwYXJzZXIgdG8gdHJlYXQgdGhlIG9wdGlvbiBjYW4gYmUgbmVnYXRlZCBieVxuICogcHJlZml4aW5nIHRoZW0gd2l0aCBgLS1uby1gLCBsaWtlIGAtLW5vLWNvbmZpZ2AuXG4gKlxuICogYGBgdHNcbiAqIGltcG9ydCB7IHBhcnNlQXJncyB9IGZyb20gXCJAc3RkL2NsaS9wYXJzZS1hcmdzXCI7XG4gKiBpbXBvcnQgeyBhc3NlcnRFcXVhbHMgfSBmcm9tIFwiQHN0ZC9hc3NlcnQvZXF1YWxzXCI7XG4gKlxuICogY29uc3QgYXJncyA9IHBhcnNlQXJncyhbXCItLW5vLWZvb1wiXSwge1xuICogICBib29sZWFuOiBbXCJmb29cIl0sXG4gKiAgIG5lZ2F0YWJsZTogW1wiZm9vXCJdLFxuICogfSk7XG4gKlxuICogYXNzZXJ0RXF1YWxzKGFyZ3MsIHsgZm9vOiBmYWxzZSwgXzogW10gfSk7XG4gKiBgYGBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlQXJnczxcbiAgVEFyZ3MgZXh0ZW5kcyBWYWx1ZXM8XG4gICAgVEJvb2xlYW5zLFxuICAgIFRTdHJpbmdzLFxuICAgIFRDb2xsZWN0YWJsZSxcbiAgICBUTmVnYXRhYmxlLFxuICAgIFREZWZhdWx0cyxcbiAgICBUQWxpYXNlc1xuICA+LFxuICBURG91YmxlRGFzaCBleHRlbmRzIGJvb2xlYW4gfCB1bmRlZmluZWQgPSB1bmRlZmluZWQsXG4gIFRCb29sZWFucyBleHRlbmRzIEJvb2xlYW5UeXBlID0gdW5kZWZpbmVkLFxuICBUU3RyaW5ncyBleHRlbmRzIFN0cmluZ1R5cGUgPSB1bmRlZmluZWQsXG4gIFRDb2xsZWN0YWJsZSBleHRlbmRzIENvbGxlY3RhYmxlID0gdW5kZWZpbmVkLFxuICBUTmVnYXRhYmxlIGV4dGVuZHMgTmVnYXRhYmxlID0gdW5kZWZpbmVkLFxuICBURGVmYXVsdHMgZXh0ZW5kcyBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPiB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZCxcbiAgVEFsaWFzZXMgZXh0ZW5kcyBBbGlhc2VzPFRBbGlhc0FyZ05hbWVzLCBUQWxpYXNOYW1lcz4gfCB1bmRlZmluZWQgPSB1bmRlZmluZWQsXG4gIFRBbGlhc0FyZ05hbWVzIGV4dGVuZHMgc3RyaW5nID0gc3RyaW5nLFxuICBUQWxpYXNOYW1lcyBleHRlbmRzIHN0cmluZyA9IHN0cmluZyxcbj4oXG4gIGFyZ3M6IHN0cmluZ1tdLFxuICBvcHRpb25zPzogUGFyc2VPcHRpb25zPFxuICAgIFRCb29sZWFucyxcbiAgICBUU3RyaW5ncyxcbiAgICBUQ29sbGVjdGFibGUsXG4gICAgVE5lZ2F0YWJsZSxcbiAgICBURGVmYXVsdHMsXG4gICAgVEFsaWFzZXMsXG4gICAgVERvdWJsZURhc2hcbiAgPixcbik6IEFyZ3M8VEFyZ3MsIFREb3VibGVEYXNoPiB7XG4gIGNvbnN0IHtcbiAgICBcIi0tXCI6IGRvdWJsZURhc2ggPSBmYWxzZSxcbiAgICBhbGlhcyA9IHt9IGFzIE5vbk51bGxhYmxlPFRBbGlhc2VzPixcbiAgICBib29sZWFuID0gZmFsc2UsXG4gICAgZGVmYXVsdDogZGVmYXVsdHMgPSB7fSBhcyBURGVmYXVsdHMgJiBEZWZhdWx0czxUQm9vbGVhbnMsIFRTdHJpbmdzPixcbiAgICBzdG9wRWFybHkgPSBmYWxzZSxcbiAgICBzdHJpbmcgPSBbXSxcbiAgICBjb2xsZWN0ID0gW10sXG4gICAgbmVnYXRhYmxlID0gW10sXG4gICAgdW5rbm93bjogdW5rbm93bkZuID0gKGk6IHN0cmluZyk6IHVua25vd24gPT4gaSxcbiAgfSA9IG9wdGlvbnMgPz8ge307XG4gIGNvbnN0IGFsaWFzTWFwOiBNYXA8c3RyaW5nLCBTZXQ8c3RyaW5nPj4gPSBuZXcgTWFwKCk7XG4gIGNvbnN0IGJvb2xlYW5TZXQgPSBuZXcgU2V0PHN0cmluZz4oKTtcbiAgY29uc3Qgc3RyaW5nU2V0ID0gbmV3IFNldDxzdHJpbmc+KCk7XG4gIGNvbnN0IGNvbGxlY3RTZXQgPSBuZXcgU2V0PHN0cmluZz4oKTtcbiAgY29uc3QgbmVnYXRhYmxlU2V0ID0gbmV3IFNldDxzdHJpbmc+KCk7XG5cbiAgbGV0IGFsbEJvb2xzID0gZmFsc2U7XG5cbiAgaWYgKGFsaWFzKSB7XG4gICAgZm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2YgT2JqZWN0LmVudHJpZXMoYWxpYXMpKSB7XG4gICAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQWxpYXMgdmFsdWUgbXVzdCBiZSBkZWZpbmVkXCIpO1xuICAgICAgfVxuICAgICAgY29uc3QgYWxpYXNlcyA9IEFycmF5LmlzQXJyYXkodmFsdWUpID8gdmFsdWUgOiBbdmFsdWVdO1xuICAgICAgYWxpYXNNYXAuc2V0KGtleSwgbmV3IFNldChhbGlhc2VzKSk7XG4gICAgICBhbGlhc2VzLmZvckVhY2goKGFsaWFzKSA9PlxuICAgICAgICBhbGlhc01hcC5zZXQoXG4gICAgICAgICAgYWxpYXMsXG4gICAgICAgICAgbmV3IFNldChba2V5LCAuLi5hbGlhc2VzLmZpbHRlcigoaXQpID0+IGl0ICE9PSBhbGlhcyldKSxcbiAgICAgICAgKVxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBpZiAoYm9vbGVhbikge1xuICAgIGlmICh0eXBlb2YgYm9vbGVhbiA9PT0gXCJib29sZWFuXCIpIHtcbiAgICAgIGFsbEJvb2xzID0gYm9vbGVhbjtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgYm9vbGVhbkFyZ3MgPSBBcnJheS5pc0FycmF5KGJvb2xlYW4pID8gYm9vbGVhbiA6IFtib29sZWFuXTtcbiAgICAgIGZvciAoY29uc3Qga2V5IG9mIGJvb2xlYW5BcmdzLmZpbHRlcihCb29sZWFuKSkge1xuICAgICAgICBib29sZWFuU2V0LmFkZChrZXkpO1xuICAgICAgICBhbGlhc01hcC5nZXQoa2V5KT8uZm9yRWFjaCgoYWwpID0+IHtcbiAgICAgICAgICBib29sZWFuU2V0LmFkZChhbCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGlmIChzdHJpbmcpIHtcbiAgICBjb25zdCBzdHJpbmdBcmdzID0gQXJyYXkuaXNBcnJheShzdHJpbmcpID8gc3RyaW5nIDogW3N0cmluZ107XG4gICAgZm9yIChjb25zdCBrZXkgb2Ygc3RyaW5nQXJncy5maWx0ZXIoQm9vbGVhbikpIHtcbiAgICAgIHN0cmluZ1NldC5hZGQoa2V5KTtcbiAgICAgIGFsaWFzTWFwLmdldChrZXkpPy5mb3JFYWNoKChhbCkgPT4gc3RyaW5nU2V0LmFkZChhbCkpO1xuICAgIH1cbiAgfVxuXG4gIGlmIChjb2xsZWN0KSB7XG4gICAgY29uc3QgY29sbGVjdEFyZ3MgPSBBcnJheS5pc0FycmF5KGNvbGxlY3QpID8gY29sbGVjdCA6IFtjb2xsZWN0XTtcbiAgICBmb3IgKGNvbnN0IGtleSBvZiBjb2xsZWN0QXJncy5maWx0ZXIoQm9vbGVhbikpIHtcbiAgICAgIGNvbGxlY3RTZXQuYWRkKGtleSk7XG4gICAgICBhbGlhc01hcC5nZXQoa2V5KT8uZm9yRWFjaCgoYWwpID0+IGNvbGxlY3RTZXQuYWRkKGFsKSk7XG4gICAgfVxuICB9XG5cbiAgaWYgKG5lZ2F0YWJsZSkge1xuICAgIGNvbnN0IG5lZ2F0YWJsZUFyZ3MgPSBBcnJheS5pc0FycmF5KG5lZ2F0YWJsZSkgPyBuZWdhdGFibGUgOiBbbmVnYXRhYmxlXTtcbiAgICBmb3IgKGNvbnN0IGtleSBvZiBuZWdhdGFibGVBcmdzLmZpbHRlcihCb29sZWFuKSkge1xuICAgICAgbmVnYXRhYmxlU2V0LmFkZChrZXkpO1xuICAgICAgYWxpYXNNYXAuZ2V0KGtleSk/LmZvckVhY2goKGFsaWFzKSA9PiBuZWdhdGFibGVTZXQuYWRkKGFsaWFzKSk7XG4gICAgfVxuICB9XG5cbiAgY29uc3QgYXJndjogQXJncyA9IHsgXzogW10gfTtcblxuICBmdW5jdGlvbiBzZXRBcmd1bWVudChcbiAgICBrZXk6IHN0cmluZyxcbiAgICB2YWx1ZTogc3RyaW5nIHwgbnVtYmVyIHwgYm9vbGVhbixcbiAgICBhcmc6IHN0cmluZyxcbiAgICBjb2xsZWN0OiBib29sZWFuLFxuICApIHtcbiAgICBpZiAoXG4gICAgICAhYm9vbGVhblNldC5oYXMoa2V5KSAmJlxuICAgICAgIXN0cmluZ1NldC5oYXMoa2V5KSAmJlxuICAgICAgIWFsaWFzTWFwLmhhcyhrZXkpICYmXG4gICAgICAhKGFsbEJvb2xzICYmIEZMQUdfTkFNRV9SRUdFWFAudGVzdChhcmcpKSAmJlxuICAgICAgdW5rbm93bkZuPy4oYXJnLCBrZXksIHZhbHVlKSA9PT0gZmFsc2VcbiAgICApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiICYmICFzdHJpbmdTZXQuaGFzKGtleSkpIHtcbiAgICAgIHZhbHVlID0gaXNOdW1iZXIodmFsdWUpID8gTnVtYmVyKHZhbHVlKSA6IHZhbHVlO1xuICAgIH1cblxuICAgIGNvbnN0IGNvbGxlY3RhYmxlID0gY29sbGVjdCAmJiBjb2xsZWN0U2V0LmhhcyhrZXkpO1xuICAgIHNldE5lc3RlZChhcmd2LCBrZXkuc3BsaXQoXCIuXCIpLCB2YWx1ZSwgY29sbGVjdGFibGUpO1xuICAgIGFsaWFzTWFwLmdldChrZXkpPy5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgIHNldE5lc3RlZChhcmd2LCBrZXkuc3BsaXQoXCIuXCIpLCB2YWx1ZSwgY29sbGVjdGFibGUpO1xuICAgIH0pO1xuICB9XG5cbiAgbGV0IG5vdEZsYWdzOiBzdHJpbmdbXSA9IFtdO1xuXG4gIC8vIGFsbCBhcmdzIGFmdGVyIFwiLS1cIiBhcmUgbm90IHBhcnNlZFxuICBjb25zdCBpbmRleCA9IGFyZ3MuaW5kZXhPZihcIi0tXCIpO1xuICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgbm90RmxhZ3MgPSBhcmdzLnNsaWNlKGluZGV4ICsgMSk7XG4gICAgYXJncyA9IGFyZ3Muc2xpY2UoMCwgaW5kZXgpO1xuICB9XG5cbiAgYXJnc0xvb3A6XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgYXJncy5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IGFyZyA9IGFyZ3NbaV0hO1xuXG4gICAgY29uc3QgZ3JvdXBzID0gYXJnLm1hdGNoKEZMQUdfUkVHRVhQKT8uZ3JvdXBzO1xuXG4gICAgaWYgKGdyb3Vwcykge1xuICAgICAgY29uc3QgeyBkb3VibGVEYXNoLCBuZWdhdGVkIH0gPSBncm91cHM7XG4gICAgICBsZXQga2V5ID0gZ3JvdXBzLmtleSE7XG4gICAgICBsZXQgdmFsdWU6IHN0cmluZyB8IG51bWJlciB8IGJvb2xlYW4gfCB1bmRlZmluZWQgPSBncm91cHMudmFsdWU7XG5cbiAgICAgIGlmIChkb3VibGVEYXNoKSB7XG4gICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgIGlmIChib29sZWFuU2V0LmhhcyhrZXkpKSB2YWx1ZSA9IHBhcnNlQm9vbGVhblN0cmluZyh2YWx1ZSk7XG4gICAgICAgICAgc2V0QXJndW1lbnQoa2V5LCB2YWx1ZSwgYXJnLCB0cnVlKTtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChuZWdhdGVkKSB7XG4gICAgICAgICAgaWYgKG5lZ2F0YWJsZVNldC5oYXMoa2V5KSkge1xuICAgICAgICAgICAgc2V0QXJndW1lbnQoa2V5LCBmYWxzZSwgYXJnLCBmYWxzZSk7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG4gICAgICAgICAga2V5ID0gYG5vLSR7a2V5fWA7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBuZXh0ID0gYXJnc1tpICsgMV07XG5cbiAgICAgICAgaWYgKG5leHQpIHtcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAhYm9vbGVhblNldC5oYXMoa2V5KSAmJlxuICAgICAgICAgICAgIWFsbEJvb2xzICYmXG4gICAgICAgICAgICAhbmV4dC5zdGFydHNXaXRoKFwiLVwiKSAmJlxuICAgICAgICAgICAgKCFhbGlhc01hcC5oYXMoa2V5KSB8fCAhYWxpYXNJc0Jvb2xlYW4oYWxpYXNNYXAsIGJvb2xlYW5TZXQsIGtleSkpXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICB2YWx1ZSA9IG5leHQ7XG4gICAgICAgICAgICBpKys7XG4gICAgICAgICAgICBzZXRBcmd1bWVudChrZXksIHZhbHVlLCBhcmcsIHRydWUpO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKGlzQm9vbGVhblN0cmluZyhuZXh0KSkge1xuICAgICAgICAgICAgdmFsdWUgPSBwYXJzZUJvb2xlYW5TdHJpbmcobmV4dCk7XG4gICAgICAgICAgICBpKys7XG4gICAgICAgICAgICBzZXRBcmd1bWVudChrZXksIHZhbHVlLCBhcmcsIHRydWUpO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdmFsdWUgPSBzdHJpbmdTZXQuaGFzKGtleSkgPyBcIlwiIDogdHJ1ZTtcbiAgICAgICAgc2V0QXJndW1lbnQoa2V5LCB2YWx1ZSwgYXJnLCB0cnVlKTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBjb25zdCBsZXR0ZXJzID0gYXJnLnNsaWNlKDEsIC0xKS5zcGxpdChcIlwiKTtcblxuICAgICAgZm9yIChjb25zdCBbaiwgbGV0dGVyXSBvZiBsZXR0ZXJzLmVudHJpZXMoKSkge1xuICAgICAgICBjb25zdCBuZXh0ID0gYXJnLnNsaWNlKGogKyAyKTtcblxuICAgICAgICBpZiAobmV4dCA9PT0gXCItXCIpIHtcbiAgICAgICAgICBzZXRBcmd1bWVudChsZXR0ZXIsIG5leHQsIGFyZywgdHJ1ZSk7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoTEVUVEVSX1JFR0VYUC50ZXN0KGxldHRlcikpIHtcbiAgICAgICAgICBjb25zdCBncm91cHMgPSBWQUxVRV9SRUdFWFAuZXhlYyhuZXh0KT8uZ3JvdXBzO1xuICAgICAgICAgIGlmIChncm91cHMpIHtcbiAgICAgICAgICAgIHNldEFyZ3VtZW50KGxldHRlciwgZ3JvdXBzLnZhbHVlISwgYXJnLCB0cnVlKTtcbiAgICAgICAgICAgIGNvbnRpbnVlIGFyZ3NMb29wO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoTlVNQkVSX1JFR0VYUC50ZXN0KG5leHQpKSB7XG4gICAgICAgICAgICBzZXRBcmd1bWVudChsZXR0ZXIsIG5leHQsIGFyZywgdHJ1ZSk7XG4gICAgICAgICAgICBjb250aW51ZSBhcmdzTG9vcDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobGV0dGVyc1tqICsgMV0/Lm1hdGNoKFNQRUNJQUxfQ0hBUl9SRUdFWFApKSB7XG4gICAgICAgICAgc2V0QXJndW1lbnQobGV0dGVyLCBhcmcuc2xpY2UoaiArIDIpLCBhcmcsIHRydWUpO1xuICAgICAgICAgIGNvbnRpbnVlIGFyZ3NMb29wO1xuICAgICAgICB9XG4gICAgICAgIHNldEFyZ3VtZW50KGxldHRlciwgc3RyaW5nU2V0LmhhcyhsZXR0ZXIpID8gXCJcIiA6IHRydWUsIGFyZywgdHJ1ZSk7XG4gICAgICB9XG5cbiAgICAgIGtleSA9IGFyZy5zbGljZSgtMSk7XG4gICAgICBpZiAoa2V5ID09PSBcIi1cIikgY29udGludWU7XG5cbiAgICAgIGNvbnN0IG5leHRBcmcgPSBhcmdzW2kgKyAxXTtcblxuICAgICAgaWYgKG5leHRBcmcpIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgICFIWVBIRU5fUkVHRVhQLnRlc3QobmV4dEFyZykgJiZcbiAgICAgICAgICAhYm9vbGVhblNldC5oYXMoa2V5KSAmJlxuICAgICAgICAgICghYWxpYXNNYXAuaGFzKGtleSkgfHwgIWFsaWFzSXNCb29sZWFuKGFsaWFzTWFwLCBib29sZWFuU2V0LCBrZXkpKVxuICAgICAgICApIHtcbiAgICAgICAgICBzZXRBcmd1bWVudChrZXksIG5leHRBcmcsIGFyZywgdHJ1ZSk7XG4gICAgICAgICAgaSsrO1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpc0Jvb2xlYW5TdHJpbmcobmV4dEFyZykpIHtcbiAgICAgICAgICBjb25zdCB2YWx1ZSA9IHBhcnNlQm9vbGVhblN0cmluZyhuZXh0QXJnKTtcbiAgICAgICAgICBzZXRBcmd1bWVudChrZXksIHZhbHVlLCBhcmcsIHRydWUpO1xuICAgICAgICAgIGkrKztcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgc2V0QXJndW1lbnQoa2V5LCBzdHJpbmdTZXQuaGFzKGtleSkgPyBcIlwiIDogdHJ1ZSwgYXJnLCB0cnVlKTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIGlmICh1bmtub3duRm4/LihhcmcpICE9PSBmYWxzZSkge1xuICAgICAgYXJndi5fLnB1c2goXG4gICAgICAgIHN0cmluZ1NldC5oYXMoXCJfXCIpIHx8ICFpc051bWJlcihhcmcpID8gYXJnIDogTnVtYmVyKGFyZyksXG4gICAgICApO1xuICAgIH1cblxuICAgIGlmIChzdG9wRWFybHkpIHtcbiAgICAgIGFyZ3YuXy5wdXNoKC4uLmFyZ3Muc2xpY2UoaSArIDEpKTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKGRlZmF1bHRzKSkge1xuICAgIGNvbnN0IGtleXMgPSBrZXkuc3BsaXQoXCIuXCIpO1xuICAgIGlmICghaGFzTmVzdGVkKGFyZ3YsIGtleXMpKSB7XG4gICAgICBzZXROZXN0ZWQoYXJndiwga2V5cywgdmFsdWUpO1xuICAgICAgYWxpYXNNYXAuZ2V0KGtleSk/LmZvckVhY2goKGtleSkgPT5cbiAgICAgICAgc2V0TmVzdGVkKGFyZ3YsIGtleS5zcGxpdChcIi5cIiksIHZhbHVlKVxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBmb3IgKGNvbnN0IGtleSBvZiBib29sZWFuU2V0LmtleXMoKSkge1xuICAgIGNvbnN0IGtleXMgPSBrZXkuc3BsaXQoXCIuXCIpO1xuICAgIGlmICghaGFzTmVzdGVkKGFyZ3YsIGtleXMpKSB7XG4gICAgICBjb25zdCB2YWx1ZSA9IGNvbGxlY3RTZXQuaGFzKGtleSkgPyBbXSA6IGZhbHNlO1xuICAgICAgc2V0TmVzdGVkKGFyZ3YsIGtleXMsIHZhbHVlKTtcbiAgICB9XG4gIH1cblxuICBmb3IgKGNvbnN0IGtleSBvZiBzdHJpbmdTZXQua2V5cygpKSB7XG4gICAgY29uc3Qga2V5cyA9IGtleS5zcGxpdChcIi5cIik7XG4gICAgaWYgKCFoYXNOZXN0ZWQoYXJndiwga2V5cykgJiYgY29sbGVjdFNldC5oYXMoa2V5KSkge1xuICAgICAgc2V0TmVzdGVkKGFyZ3YsIGtleXMsIFtdKTtcbiAgICB9XG4gIH1cblxuICBpZiAoZG91YmxlRGFzaCkge1xuICAgIGFyZ3ZbXCItLVwiXSA9IG5vdEZsYWdzO1xuICB9IGVsc2Uge1xuICAgIGFyZ3YuXy5wdXNoKC4uLm5vdEZsYWdzKTtcbiAgfVxuXG4gIHJldHVybiBhcmd2IGFzIEFyZ3M8VEFyZ3MsIFREb3VibGVEYXNoPjtcbn1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxxREFBcUQ7QUFDckQscUNBQXFDO0FBRXJDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7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
// denoCacheMetadata=10055703832919195456,7335450717902744423