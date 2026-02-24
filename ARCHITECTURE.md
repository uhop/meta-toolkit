# Architecture

`meta-toolkit` is a pure JavaScript (ESM) library providing utilities for meta programming and OOP. It has **zero runtime dependencies** — only dev dependencies for testing and type-checking.

## Project layout

```
src/                      # All source code (ESM, shipped via npm)
├── names.js / .d.ts      # Name-casing conversions (camel, pascal, snake, kebab)
├── descriptors.js / .d.ts # Property descriptor creation and manipulation
├── aliases.js / .d.ts    # Property aliasing (built on descriptors)
├── iterators.js / .d.ts  # Iterator augmentation and lazy map/filter
├── prototypes.js / .d.ts # Prototype chain traversal
├── path.js / .d.ts       # Deep property access by dot-path
├── options.js / .d.ts    # Constructor option merging
└── comparators.js / .d.ts # Comparator function adapters (less ↔ compare ↔ equal)
# Every .js module has a co-located .d.ts file providing TypeScript declarations.
tests/                    # Automated tests (tape-six framework)
ts-check/                 # TypeScript type-checking test files
wiki/                     # GitHub wiki documentation (git submodule)
```

## Core concepts

### Name conversions

The `names.js` module converts between compound name formats. All `from*` functions split a string into `string[]` parts. All `to*` functions join `string[]` into a formatted string. This two-step design allows converting between any pair of naming conventions.

### Property descriptors

The `descriptors.js` module provides factories (`makeGetter`, `makeSetter`, `makeAccessors`) and installers (`addDescriptor`, `addDescriptors`, `addAccessor`, `addGetters`, `copyDescriptors`) for working with property descriptors. Names can be specified as comma-separated strings, symbols, or arrays — enabling multiple aliases in a single call.

### Aliases

The `aliases.js` module is a thin wrapper around `descriptors.js`. `addAlias` copies a single property's descriptor to new names. `addAliases` copies multiple properties via a dictionary.

### Iterators

The `iterators.js` module provides `augmentIterator` and `normalizeIterator` to ensure iterators have `[Symbol.iterator]`, plus lazy `mapIterator` and `filterIterator` that delegate to native iterator helpers when available.

### Prototypes

The `prototypes.js` module provides a `prototypes()` generator for walking the prototype chain and `getPropertyDescriptor()` for finding descriptors across the chain.

### Path

The `path.js` module provides `get`, `set`, `forceSet`, and `remove` for deep property access using dot-delimited string paths or arrays of keys. `forceSet` creates intermediate objects as needed.

### Options

The `options.js` module provides `copyOptions` for merging constructor options: defaults are applied first, then only keys present in defaults are copied from user-supplied sources.

### Comparators

The `comparators.js` module adapts between `less` (`(a,b) => boolean`), `compare` (`(a,b) => number`), and `equal` function styles, plus reversal utilities.

## Module dependency graph

```
descriptors.js ← aliases.js
prototypes.js  (standalone)
names.js       (standalone)
iterators.js   (standalone)
path.js        (standalone)
options.js     (standalone)
comparators.js (standalone)
```

Most modules are independent. The only internal dependency is `aliases.js` → `descriptors.js`.

## Testing

- **Framework**: [tape-six](https://github.com/uhop/tape-six)
- **Run all**: `npm test` (parallel workers)
- **Run single file**: `node tests/test-<name>.js`
- **Run with Bun**: `npm run test:bun`
- **Run with Deno**: `npm run test:deno`
- **Type checking**: `npm run ts-check` (runs `tsc --noEmit`)
- **Linting**: `npm run lint` (Prettier check), `npm run lint:fix` (auto-format)
- **Test files**: `tests/test-*.js`

## Import paths

The package uses subpath exports in `package.json`:

```js
import {toCamelCase} from 'meta-toolkit/names.js';
import {addAliases} from 'meta-toolkit/aliases.js';
import {get, forceSet} from 'meta-toolkit/path.js';
import {copyOptions} from 'meta-toolkit/options.js';
```

The wildcard export `./*` maps to `./src/*`.
