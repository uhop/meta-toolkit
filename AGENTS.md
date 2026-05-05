# AGENTS.md — meta-toolkit

> `meta-toolkit` is a zero-dependency ESM JavaScript library for meta programming and OOP: name-casing conversions, property descriptors, aliases, prototype traversal, iterators, deep path access, option merging, and comparator adapters. Works in Node.js, Bun, Deno, and browsers.

For project structure, core concepts, and the module dependency graph see [ARCHITECTURE.md](./ARCHITECTURE.md). For API references see the [wiki](https://github.com/uhop/meta-toolkit/wiki).

## Setup

```bash
git clone --recursive git@github.com:uhop/meta-toolkit.git
cd meta-toolkit
npm install
```

## Verification commands

- `npm test` — run the full test suite (tape-six, Node)
- `node tests/test-<name>.js` — run a single test file directly
- `npm run test:bun` — run with Bun
- `npm run test:deno` — run with Deno
- `npm run test:seq` — run sequentially (no workers, useful for debugging)
- `npm run ts-test` — run TypeScript typing tests (tape-six, Node)
- `npm run ts-test:bun` — run TS typing tests with Bun
- `npm run ts-test:deno` — run TS typing tests with Deno
- `npm run ts-check` — TypeScript type checking (tsc --noEmit)
- `npm run lint` — Prettier format check
- `npm run lint:fix` — Prettier auto-format

## Critical rules

- **ESM-only.** The project is `"type": "module"`.
- **No runtime dependencies.** Never add packages to `dependencies`. Only `devDependencies` are allowed.
- **Hand-written `.d.ts` files.** They are NOT generated. When modifying a public API, update both the `.js` and `.d.ts` files.
- **Do not modify or delete test expectations** without understanding why they changed.
- **Do not add comments or remove comments** unless explicitly asked.
- **Trust boundary is the caller.** `path.js` (`get`/`set`/`forceSet`/`remove`) walks user-supplied keys without sanitizing magic property names (`__proto__`, `constructor`, `prototype`). Callers passing externally-sourced paths must validate them — the library does not.

## Code style

- Prettier: 100 char width, single quotes, no bracket spacing, no trailing commas, arrow parens "avoid" (see `.prettierrc`).
- 2-space indentation (`.editorconfig`).
- Imports at top of file. No dynamic imports unless necessary.

## Architecture quick reference

- **names.js** — name-casing conversions. `from*` splits strings into `string[]`; `to*` joins `string[]` into formatted strings.
- **descriptors.js** — property descriptor factories and installers. Names can be comma-separated strings, symbols, or arrays.
- **aliases.js** — property aliasing built on `descriptors.js`. Only internal dependency in the project.
- **iterators.js** — `augmentIterator`, `normalizeIterator`, lazy `mapIterator`, `filterIterator`.
- **prototypes.js** — `prototypes()` generator and `getPropertyDescriptor()` for prototype chain traversal.
- **path.js** — deep property access: `get`, `set`, `forceSet`, `remove` with dot-delimited paths.
- **options.js** — `copyOptions` for merging constructor options with defaults.
- **comparators.js** — adapters between `less`, `compare`, and `equal` function styles.

## File layout

- Source: `src/<name>.js` + `src/<name>.d.ts`
- Tests: `tests/test-<name>.js`
- TS typing tests: `tests/test-types-<name>.ts`
- Wiki docs: `wiki/` (git submodule)

## When reading the codebase

- Start with [ARCHITECTURE.md](./ARCHITECTURE.md) for the module map and dependency graph.
- `.d.ts` files are the best API reference for each module.
- Wiki markdown files in `wiki/` contain detailed usage docs.
- `descriptors.js` is the foundational module — `aliases.js` depends on it.
