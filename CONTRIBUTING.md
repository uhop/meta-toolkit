# Contributing to meta-toolkit

## Prerequisites

- Node.js 20 or later
- npm

## Setup

```bash
git clone --recursive https://github.com/uhop/meta-toolkit.git
cd meta-toolkit
npm install
```

The `--recursive` flag is needed to clone the wiki submodule under `wiki/`.

## Project structure

See [ARCHITECTURE.md](./ARCHITECTURE.md) for the module map and dependency graph.

- `src/` — all source code (ESM, shipped to npm)
- `tests/` — automated tests (`test-*.js`, `test-types-*.ts`)
- `wiki/` — GitHub wiki (git submodule)

## Development workflow

### Running tests

```bash
npm test                          # Run all tests (tape-six, parallel workers, Node)
node tests/test-<name>.js         # Run a single test file directly
npm run test:bun                  # Run with Bun
npm run test:deno                 # Run with Deno
npm run test:seq                  # Run sequentially (no workers)
npm run test:proc                 # Run using subprocesses
```

### TypeScript

```bash
npm run ts-test         # Run TS typing tests (tape-six, Node)
npm run ts-test:bun     # Run TS typing tests with Bun
npm run ts-test:deno    # Run TS typing tests with Deno
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

- Every public `.js` module has a hand-written `.d.ts` file.
- `.d.ts` files are NOT generated — edit them manually.
- When changing a public API, update both the `.js` and `.d.ts` files.

### Adding new features

1. Add implementation in `src/<name>.js`.
2. Add TypeScript declarations in `src/<name>.d.ts`.
3. Add tests to `tests/test-<name>.js`.
4. Add TS typing tests to `tests/test-types-<name>.ts`.
5. Run `npm test`, `npm run ts-test`, and `npm run ts-check` to verify.

## AI agents

AI coding agents: see [AGENTS.md](./AGENTS.md) for project conventions and commands.

## License

This project is distributed under the [BSD-3-Clause license](./LICENSE).
External contributions are accepted only under licenses compatible with
BSD-3-Clause; submissions under fundamentally incompatible licenses cannot
be merged.
