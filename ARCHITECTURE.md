# Architecture

`meta-toolkit` is a pure JavaScript (ESM) library with utilities for meta programming and OOP. **Zero runtime dependencies** — only dev dependencies for testing and type-checking.

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
wiki/                     # GitHub wiki documentation (git submodule)
```

## Core concepts

### Name conversions

The `names.js` module converts between compound name formats. All `from*` functions split a string into `string[]` parts. All `to*` functions join `string[]` into a formatted string. This two-step design allows converting between any pair of naming conventions.

### Property descriptors

The `descriptors.js` module provides factories (`makeGetter`, `makeSetter`, `makeAccessors`) and installers (`addDescriptor`, `addDescriptors`, `addAccessor`, `addAccessors`, `addGetter`, `addGetters`, `addSetter`, `addSetters`, `copyDescriptors`) for working with property descriptors. Names can be specified as comma-separated strings, symbols, or arrays — enabling multiple aliases in a single call. Every installer has a class-prototype-aware `addProto*` twin that targets `Class.prototype` so call sites read `Foo` instead of `Foo.prototype`.

### Aliases

The `aliases.js` module is a thin wrapper around `descriptors.js`. `addAlias` copies a single property's descriptor to new names. `addAliases` copies multiple properties via a dictionary. `addProtoAlias` and `addProtoAliases` are class-prototype-aware sugar.

### Iterators

The `iterators.js` module provides `augmentIterator` and `normalizeIterator` to ensure iterators have `[Symbol.iterator]`, plus lazy `mapIterator` and `filterIterator` that delegate to native iterator helpers when available. Results are single-use and forward `return()` to the source, so early exits run generator cleanup. `normalizeIterator` is the gateway to the rest of the native helper family (`take`, `drop`, `flatMap`, …) — the module deliberately wraps no further helpers.

### Prototypes

The `prototypes.js` module provides a `prototypes()` generator for walking the prototype chain and `getPropertyDescriptor()` for finding descriptors across the chain.

### Path

The `path.js` module provides `get`, `has`, `set`, `forceSet`, and `remove` for deep property access using dot-delimited string paths or arrays of keys. `has` distinguishes a missing path from an `undefined` value. `forceSet` creates intermediate objects as needed.

**Trust boundary**: these functions walk user-supplied keys without sanitizing magic property names (`__proto__`, `constructor`, `prototype`). Callers passing externally-sourced paths are responsible for validation at the application boundary.

### Options

The `options.js` module provides `copyOptions` for merging constructor options: defaults are applied first, then only keys present in defaults are copied from user-supplied sources.

### Comparators

The `comparators.js` module adapts between `less` (`(a,b) => boolean`), `compare` (`(a,b) => number`), and `equal` function styles (`equalFromLess`, `equalFromCompare`), plus reversal utilities. All adapters are generic — a typed comparator propagates its element type.

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
- **Run all**: `npm test` (parallel workers, Node)
- **Run single file**: `node tests/test-<name>.js`
- **Run with Bun**: `npm run test:bun`
- **Run with Deno**: `npm run test:deno`
- **Run sequentially**: `npm run test:seq` (no workers, useful for debugging)
- **TS typing tests**: `npm run ts-test` (tape-six, Node)
- **Type checking**: `npm run ts-check` (runs `tsc --noEmit`)
- **Linting**: `npm run lint` (Prettier check), `npm run lint:fix` (auto-format)
- **Test files**: `tests/test-*.js`, `tests/test-types-*.ts`

## Import paths

The package uses subpath exports in `package.json`:

```js
import {toCamelCase} from 'meta-toolkit/names.js';
import {addAliases} from 'meta-toolkit/aliases.js';
import {get, forceSet} from 'meta-toolkit/path.js';
import {copyOptions} from 'meta-toolkit/options.js';
```

The wildcard export `./*` maps to `./src/*`.
