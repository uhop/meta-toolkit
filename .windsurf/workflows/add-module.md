---
description: Checklist for adding a new public module to meta-toolkit
---

# Add a New Module

Follow these steps when adding a new public module.

## Implementation

1. Create `src/<name>.js` with the implementation.
   - ESM only. Use `.js` extensions in all imports.
   - No runtime dependencies.
2. Create `src/<name>.d.ts` with hand-written TypeScript declarations.
3. Create `tests/test-<name>.js` with automated tests (tape-six).
   // turbo
4. Run the new test: `node tests/test-<name>.js`
5. Create `ts-check/test-<name>.ts` with TypeScript type-checking tests.

## Wiring

6. If the module needs a short import path, verify the wildcard export `./*` → `./src/*` in `package.json` covers it. Add an explicit entry to `exports` only if a special mapping is needed.
7. Create a wiki page `wiki/<Name>.md` following the existing naming conventions.
8. Add a link to the new wiki page in `wiki/Home.md`.

## Documentation updates

9. Update `ARCHITECTURE.md` — add the module to the project layout tree and dependency graph.
10. Update `llms.txt` with a brief description of the new module.
11. Update `llms-full.txt` with the full API reference for the new module.
12. Update `AGENTS.md` if the module changes the architecture quick reference.

## Verification

    // turbo

13. Run the full test suite: `npm test`
    // turbo
14. Run TypeScript type checking: `npm run ts-check`
