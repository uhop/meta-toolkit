# Contributing to meta-toolkit

## Prerequisites

- Node.js 16 or later
- npm

## Setup

```bash
git clone --recursive git@github.com:uhop/meta-toolkit.git
cd meta-toolkit
npm install
```

The `--recursive` flag is needed to clone the wiki submodule under `wiki/`.

## Project structure

See [ARCHITECTURE.md](./ARCHITECTURE.md) for a detailed module map and dependency graph.

- `src/` — all source code (ESM, shipped to npm)
- `tests/` — automated tests (`test-*.js`)
- `ts-check/` — TypeScript type-checking test files
- `wiki/` — GitHub wiki (git submodule)

## Development workflow

### Running tests

```bash
npm test                          # Run all tests (tape-six, parallel workers)
node tests/test-<name>.js        # Run a single test file directly
npm run test:bun                  # Run with Bun
npm run test:deno                 # Run with Deno
npm run test:seq                  # Run sequentially (no workers)
npm run test:proc                 # Run using subprocesses
```

### Type checking

```bash
npm run ts-check        # tsc --noEmit
```

### Linting and formatting

```bash
npm run lint            # Check formatting (Prettier)
npm run lint:fix        # Auto-format
```

## Coding conventions

### General

- **ESM-only**: use `import`/`export` syntax.
- **No runtime dependencies**: do not add any packages to `dependencies`.
- **Formatting**: Prettier — 100 char width, single quotes, no bracket spacing, no trailing commas, arrow parens "avoid".
- **Indentation**: 2 spaces.

### Documentation

- Every public `.js` module has a hand-written `.d.ts` file alongside it.
- `.d.ts` files are NOT generated — edit them manually.
- When changing a public API, always update both the `.js` and `.d.ts` files.

### Adding new features

1. Add implementation in `src/<name>.js`.
2. Add TypeScript declarations in `src/<name>.d.ts`.
3. Add tests to `tests/test-<name>.js`.
4. Add TS type-check tests to `ts-check/test-<name>.ts`.
5. Run `npm test` and `npm run ts-check` to verify.

## AI agents

If you are an AI coding agent, see [AGENTS.md](./AGENTS.md) for detailed project conventions, commands, and architecture.
